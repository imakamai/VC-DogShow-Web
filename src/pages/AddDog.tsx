import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { DogDTO } from '../types';
import { Button, Input } from '../components/ui';
import { Dog as DogIcon } from 'lucide-react';

const AddDog = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<DogDTO>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: DogDTO) => {
        setLoading(true);
        try {
            // Ensure numeric values are numbers
            const payload = {
                ...data,
                age: Number(data.age),
                weight: data.weight ? Number(data.weight) : null,
                size: data.size ? Number(data.size) : null
            };

            await api.post('/Dog', payload);
            navigate('/dogs');
        } catch (error: any) {
            console.error('Failed to register dog', error);
            const message = error.response?.data?.message || error.response?.data || error.message || 'Failed to register dog. Please try again.';
            alert(`Error: ${typeof message === 'object' ? JSON.stringify(message) : message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-12">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-colors duration-300">
                <div className="bg-gray-900 px-8 py-6 text-white text-center">
                    <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
                        <DogIcon className="h-8 w-8 text-orange-500" />
                        Register New Dog
                    </h1>
                    <p className="text-gray-400 mt-1">Add a new champion to your profile</p>
                </div>

                <div className="p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Full Name"
                                placeholder="e.g. Max"
                                {...register('name', { required: 'Name is required' })}
                                error={errors.name?.message}
                            />
                            <Input
                                label="Breed"
                                placeholder="e.g. Golden Retriever"
                                {...register('breed', { required: 'Breed is required' })}
                                error={errors.breed?.message}
                            />
                            <Input
                                label="Date of Birth"
                                type="date"
                                {...register('birth', { required: 'Birth date is required' })}
                                error={errors.birth?.message}
                            />

                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Gender</label>
                                <select
                                    {...register('gender', { required: 'Gender is required' })}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                                {errors.gender && <span className="text-red-500 text-sm">{errors.gender.message}</span>}
                            </div>

                            <Input
                                label="Age (years)"
                                type="number"
                                placeholder="e.g. 2"
                                {...register('age', { required: 'Age is required', min: 0 })}
                                error={errors.age?.message}
                            />

                            <Input
                                label="Weight (kg)"
                                type="number"
                                step="0.1"
                                placeholder="e.g. 25.5"
                                {...register('weight', { min: 0 })}
                                error={errors.weight?.message}
                            />

                            <Input
                                label="Size/Height (cm)"
                                type="number"
                                placeholder="e.g. 60"
                                {...register('size', { min: 0 })}
                                error={errors.size?.message}
                            />

                            <div className="md:col-span-2">
                                <Input
                                    label="Pedigree Number"
                                    placeholder="e.g. P-12345-X"
                                    {...register('pedigree', { required: 'Pedigree is required' })}
                                    error={errors.pedigree?.message}
                                />
                            </div>
                        </div>

                        <div className="pt-4 flex gap-4">
                            <Button
                                type="button"
                                variant="ghost"
                                className="flex-1"
                                onClick={() => navigate('/dogs')}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="flex-1"
                                disabled={loading}
                            >
                                {loading ? 'Registering...' : 'Complete Registration'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddDog;
