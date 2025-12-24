import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { loadStripe } from '@stripe/stripe-js';
import api from '../services/api';
import { DogDTO, Competition } from '../types';
import { Button, Input } from '../components/ui';
import { CreditCard, Dog as DogIcon, Trophy, MapPin, Calendar, Clock } from 'lucide-react';
import { useLocation } from 'react-router-dom';

// Replace with your actual publishable key or env variable
const stripePromise = loadStripe('pk_test_51Mz...');

// Extended DTO to include competition details form fields
// Extended DTO to include competition details form fields
interface ApplicationDTO extends Partial<DogDTO> {
    competitionId: number;
    competitionClass: string;
    dogId?: number;
}

const COMPETITION_CLASSES = [
    "Baby (3-6 months)",
    "Puppy (6-9 months)",
    "Junior (9-18 months)",
    "Intermediate (15-24 months)",
    "Open (15 months +)",
    "Champion (Certificate required)",
    "Veteran (8 years +)"
];



const Apply = () => {
    const { register, handleSubmit, watch, setValue, formState: { errors }, reset, trigger } = useForm<ApplicationDTO>();
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState<'info' | 'payment'>('info');
    const [applicationData, setApplicationData] = useState<ApplicationDTO | null>(null);
    const [competitions, setCompetitions] = useState<Competition[]>([]);
    const location = useLocation();

    // New state for registration mode
    const [registrationMode, setRegistrationMode] = useState<'existing' | 'new'>('existing');
    const [userDogs, setUserDogs] = useState<DogDTO[]>([]); // Assuming DogDTO includes id, if not we need 'Dog' type which has id

    const selectedCompetitionId = watch('competitionId');
    const selectedCompetition = competitions.find(c => c.id == selectedCompetitionId);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [compRes, dogsRes] = await Promise.all([
                    api.get<Competition[]>('Competition/active'),
                    api.get<any[]>('/Dog') // fetch dogs
                ]);
                setCompetitions(compRes.data);
                setUserDogs(dogsRes.data);

                // Default to 'new' if no dogs exist
                if (dogsRes.data.length === 0) {
                    setRegistrationMode('new');
                }

                // Pre-select competition if passed in state
                if (location.state?.competitionId) {
                    setValue('competitionId', location.state.competitionId);
                }

                // Pre-select dog if passed in state
                if (location.state?.dogId) {
                    setRegistrationMode('existing');
                    // We need to wait for userDogs to be populated, but since we are in the same effect processing result...
                    // The setValue might need to happen after render or we rely on hook form.
                    // Actually, setValue works even if options aren't there yet for standard selects usually, 
                    // but let's make sure we set it.
                    setValue('dogId', location.state.dogId);
                }
            } catch (error) {
                console.error("Failed to fetch data", error);
            }
        };
        fetchData();
    }, [location.state, setValue]);

    // Reset form errors when mode changes
    useEffect(() => {
        reset(undefined, { keepValues: true, keepDefaultValues: true });
    }, [registrationMode, reset]);

    const onInfoSubmit = (data: ApplicationDTO) => {
        setApplicationData(data);
        setStep('payment');
    };

    const onPayment = async () => {
        if (!applicationData) return;
        setLoading(true);
        try {
            const payload = {
                competitionId: Number(applicationData.competitionId),
                competitionClass: applicationData.competitionClass,
                ...(registrationMode === 'existing'
                    ? { dogId: Number(applicationData.dogId) }
                    : {
                        name: applicationData.name,
                        breed: applicationData.breed,
                        birth: applicationData.birth,
                        age: applicationData.age,
                        gender: applicationData.gender,
                        weight: applicationData.weight ? Number(applicationData.weight) : null,
                        size: applicationData.size ? Number(applicationData.size) : null,
                        pedigree: applicationData.pedigree,
                    }
                )
            };

            await api.post('/Application', payload);

            // 2. Create Payment Session
            const stripe = await stripePromise;
            if (!stripe) throw new Error("Stripe failed to load");

            // Use dog name for description. If existing, find it in userDogs.
            let dogName = applicationData.name;
            if (registrationMode === 'existing') {
                const selectedDog = userDogs.find(d => (d as any).id == applicationData.dogId);
                if (selectedDog) dogName = selectedDog.name;
            }

            const response = await api.post('/Payment/create-checkout-session', {
                amount: 5000,
                description: `Entry Fee for ${dogName} - ${applicationData.competitionClass}`,
                successUrl: `${window.location.origin}/dogs`,
                cancelUrl: `${window.location.origin}/apply`,
            });

            const { sessionId } = response.data;
            const result = await (stripe as any).redirectToCheckout({ sessionId });

            if (result.error) {
                alert(result.error.message);
            }

        } catch (error) {
            console.error('Application failed', error);
            alert('Failed to process application. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gray-900 px-8 py-6 text-white text-center">
                    <h1 className="text-2xl font-bold">Competition Application</h1>
                    <p className="text-gray-400 mt-1">Register your dog for the upcoming show</p>
                </div>

                <div className="p-8">
                    {step === 'info' ? (
                        <form onSubmit={handleSubmit(onInfoSubmit)} className="space-y-8">

                            {/* Registration Mode Toggle */}
                            <div className="flex bg-gray-100 p-1 rounded-lg">
                                <button
                                    type="button"
                                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${registrationMode === 'existing'
                                        ? 'bg-white text-gray-900 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                    onClick={() => setRegistrationMode('existing')}
                                >
                                    Select Existing Dog
                                </button>
                                <button
                                    type="button"
                                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${registrationMode === 'new'
                                        ? 'bg-white text-gray-900 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                    onClick={() => setRegistrationMode('new')}
                                >
                                    Register New Dog
                                </button>
                            </div>

                            {/* Dog Information Section */}
                            <div>
                                <h3 className="text-lg font-semibold flex items-center gap-2 mb-4 text-gray-900 border-b pb-2">
                                    <DogIcon className="text-orange-500" /> Dog Information
                                </h3>

                                {registrationMode === 'existing' ? (
                                    <div className="space-y-4">
                                        <label className="block text-sm font-medium text-gray-700">Select Your Dog</label>
                                        <select
                                            {...register('dogId', { required: registrationMode === 'existing' ? 'Please select a dog' : false })}
                                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none bg-white border-gray-300"
                                        >
                                            <option value="">-- Choose from your dogs --</option>
                                            {userDogs.map((dog: any) => (
                                                <option key={dog.id} value={dog.id}>{dog.name} ({dog.breed})</option>
                                            ))}
                                        </select>
                                        {errors.dogId && <p className="text-red-500 text-sm mt-1">{errors.dogId.message}</p>}

                                        {userDogs.length === 0 && (
                                            <p className="text-sm text-yellow-600 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                                                You don't have any registered dogs yet. Please switch to "Register New Dog".
                                            </p>
                                        )}
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Input label="Full Name" {...register('name', { required: registrationMode === 'new' && 'Name is required' })} error={errors.name?.message} />
                                        <Input label="Breed" {...register('breed', { required: registrationMode === 'new' && 'Breed is required' })} error={errors.breed?.message} />
                                        <Input label="Date of Birth" type="date" {...register('birth', { required: registrationMode === 'new' && 'Birth date is required' })} error={errors.birth?.message} />
                                        <Input label="Age (years)" type="number" {...register('age', { required: registrationMode === 'new' && 'Age is required', min: 0 })} error={errors.age?.message} />
                                        <Input label="Weight (kg)" type="number" step="0.1" {...register('weight', { min: 0 })} error={errors.weight?.message} />
                                        <Input label="Size/Height (cm)" type="number" {...register('size', { min: 0 })} error={errors.size?.message} />

                                        <div className="space-y-1">
                                            <label className="block text-sm font-medium text-gray-700">Gender</label>
                                            <select {...register('gender', { required: registrationMode === 'new' && 'Gender is required' })} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none bg-white border-gray-300">
                                                <option value="">Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                            {errors.gender && <span className="text-red-500 text-sm">{errors.gender.message}</span>}
                                        </div>

                                        <div className="md:col-span-2">
                                            <Input label="Pedigree Number" {...register('pedigree', { required: registrationMode === 'new' && 'Pedigree is required' })} error={errors.pedigree?.message} />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Competition Section */}
                            <div>
                                <h3 className="text-lg font-semibold flex items-center gap-2 mb-4 text-gray-900 border-b pb-2">
                                    <Trophy className="text-orange-500" /> Competition Details
                                </h3>
                                <div className="space-y-6">

                                    {/* Select Competition */}
                                    <div className="space-y-1">
                                        <label className="block text-sm font-medium text-gray-700">Choose Competition</label>
                                        <select
                                            {...register('competitionId', { required: 'Please select a competition' })}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none bg-white border-gray-300"
                                        >
                                            <option value="">-- Select Active Competition --</option>
                                            {competitions.map(comp => (
                                                <option key={comp.id} value={comp.id}>
                                                    {comp.title}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.competitionId && <span className="text-red-500 text-sm">{errors.competitionId.message}</span>}
                                    </div>

                                    {/* Dynamic Info Display */}
                                    {selectedCompetition && (
                                        <div className="bg-orange-50 border border-orange-100 rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-orange-600" />
                                                <span className="font-medium">Starts At:</span>
                                                <span>{selectedCompetition.acquisitionDate} {selectedCompetition.acquisitionTime}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4 text-orange-600" />
                                                <span className="font-medium">Place:</span>
                                                <span>{selectedCompetition.acquisitionPlace}</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Competition Class */}
                                    <div className="space-y-1">
                                        <label className="block text-sm font-medium text-gray-700">Competition Class</label>
                                        <select
                                            {...register('competitionClass', { required: 'Please select a class' })}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none bg-white border-gray-300"
                                        >
                                            <option value="">-- Select Class --</option>
                                            {COMPETITION_CLASSES.map(cls => (
                                                <option key={cls} value={cls}>{cls}</option>
                                            ))}
                                        </select>
                                        {errors.competitionClass && <span className="text-red-500 text-sm">{errors.competitionClass.message}</span>}
                                    </div>

                                </div>
                            </div>

                            <Button type="submit" className="w-full py-3 text-lg">
                                Continue to Payment
                            </Button>
                        </form>
                    ) : (
                        <div className="text-center space-y-8 py-4">
                            <div className="bg-green-50 p-6 rounded-xl border border-green-100 inline-block w-full">
                                <h3 className="text-xl font-bold text-green-800">Application Ready</h3>
                                <p className="text-green-600 mt-2">Please complete the entry fee payment to finalize registration.</p>
                                <div className="mt-4 text-3xl font-extrabold text-gray-900">$50.00</div>
                            </div>

                            <div className="space-y-4">
                                <Button onClick={onPayment} disabled={loading} className="w-full text-lg py-4">
                                    {loading ? 'Processing...' : (
                                        <>
                                            <CreditCard className="mr-2 h-5 w-5" /> Pay Now
                                        </>
                                    )}
                                </Button>
                                <button onClick={() => setStep('info')} className="text-gray-500 hover:text-gray-700 text-sm font-medium">
                                    Back to details
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Apply;
