import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, Award, Clock, AlertCircle } from 'lucide-react';
import { Competition } from '../types';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Competitions = () => {
    const [competitions, setCompetitions] = useState<Competition[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCompetitions = async () => {
            try {
                // Fetch only active/upcoming competitions from the specialized endpoint
                const response = await api.get<Competition[]>('Competition/active');
                setCompetitions(response.data);
            } catch (err) {
                console.error('Failed to fetch competitions:', err);
                setError('Failed to load competitions. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchCompetitions();
    }, []);

    const handleRegister = (competitionId: number) => {
        navigate('/apply', { state: { competitionId } });
    };

    // Since the API returns active competitions sorted by date, use data directly.
    const activeCompetition = competitions.length > 0 ? competitions[0] : null;
    const otherCompetitions = competitions.length > 1 ? competitions.slice(1) : [];

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex justify-center items-center">
                <div className="text-center text-red-500">
                    <AlertCircle className="mx-auto h-12 w-12 mb-4" />
                    <p className="text-lg">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                        <span className="block">World Class</span>
                        <span className="block text-orange-600">Competitions</span>
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                        Join the most prestigious events in the dog showing world.
                    </p>
                </div>

                {/* Active Competition Hero Card */}
                {activeCompetition ? (
                    <div className="mb-16">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <Award className="text-orange-600 h-6 w-6" />
                            Next Main Event
                        </h2>
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden md:flex">
                            <div className="md:flex-shrink-0 md:w-1/2">
                                <img
                                    className="h-48 w-full object-cover md:h-full"
                                    src="https://images.unsplash.com/photo-1534361960057-19889db9621e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                                    alt={activeCompetition.title}
                                />
                            </div>
                            <div className="p-8 md:p-12 flex flex-col justify-center w-full">
                                <div className="uppercase tracking-wide text-sm text-orange-600 font-semibold mb-2">
                                    Upcoming - Registration Open
                                </div>
                                <h3 className="block text-3xl leading-tight font-bold text-gray-900 mb-4">
                                    {activeCompetition.title}
                                </h3>
                                <div className="space-y-4 text-gray-600 mb-8">
                                    <div className="flex items-center gap-3">
                                        <Calendar className="h-5 w-5 text-gray-400" />
                                        <span>{activeCompetition.acquisitionDate}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Clock className="h-5 w-5 text-gray-400" />
                                        <span>{activeCompetition.acquisitionTime}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <MapPin className="h-5 w-5 text-gray-400" />
                                        <span>{activeCompetition.acquisitionPlace}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleRegister(activeCompetition.id)}
                                    className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors w-fit"
                                >
                                    Register Now
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12 text-gray-500">
                        <p>No upcoming competitions scheduled.</p>
                    </div>
                )}

                {/* All Competitions Grid */}
                {otherCompetitions.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Schedule</h2>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {otherCompetitions.map((comp) => (
                                <div key={comp.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">{comp.title}</h3>
                                        <div className="space-y-3 text-sm text-gray-500">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-orange-500" />
                                                <span>{comp.acquisitionDate}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4 text-orange-500" />
                                                <span>{comp.acquisitionPlace}</span>
                                            </div>
                                        </div>
                                        <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                                            <span className="text-sm font-medium text-green-600">Registration Open</span>
                                            <button
                                                onClick={() => handleRegister(comp.id)}
                                                className="text-orange-600 hover:text-orange-700 font-medium text-sm"
                                            >
                                                Register &rarr;
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Competitions;
