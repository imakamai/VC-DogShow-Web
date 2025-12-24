import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Dog } from '../types';
import { Dog as DogIcon, Ruler, Weight, Calendar, Activity, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dogs = () => {
    const [dogs, setDogs] = useState<Dog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDogs = async () => {
            try {
                const response = await api.get<Dog[]>('/Dog');
                setDogs(response.data);
            } catch (err) {
                console.error("Error fetching dogs", err);
                // If 401, they might need to login.
                setError('Could not load dogs. Please make sure you are logged in.');
            } finally {
                setLoading(false);
            }
        };

        fetchDogs();
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900">Registered Champions</h1>
                    <p className="mt-2 text-gray-600">Meet the amazing dogs competing in our show</p>
                </div>
                <Link to="/add-dog" className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all font-semibold flex items-center gap-2">
                    <DogIcon className="w-5 h-5" /> Add New Dog
                </Link>
            </div>

            {error ? (
                <div className="text-center py-20 bg-red-50 rounded-2xl">
                    <p className="text-red-500 text-lg mb-4">{error}</p>
                    <Link to="/login" className="text-orange-600 font-semibold hover:underline">Log in to view dogs</Link>
                </div>
            ) : dogs.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-2xl">
                    <DogIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-gray-900">No dogs registered yet</h3>
                    <p className="mt-2 text-gray-500">Be the first to register a champion!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {dogs.map((dog) => (
                        <div key={dog.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden border border-gray-100 group">
                            <div className="h-48 bg-gradient-to-br from-orange-100 to-red-50 flex items-center justify-center relative overflow-hidden">
                                <DogIcon className="h-24 w-24 text-orange-200 group-hover:scale-110 transition-transform duration-300" />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                                    <h3 className="text-white text-xl font-bold truncate">{dog.name}</h3>
                                    <p className="text-orange-100 text-sm">{dog.breed}</p>
                                </div>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-orange-500" />
                                        <span>{dog.age} years</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Activity className="w-4 h-4 text-orange-500" />
                                        <span>{dog.gender}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Weight className="w-4 h-4 text-orange-500" />
                                        <span>{dog.weight} kg</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Ruler className="w-4 h-4 text-orange-500" />
                                        <span>{dog.size} cm</span>
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-gray-100 flex gap-3">
                                    <div className="flex-1">
                                        <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-1">Pedigree</p>
                                        <p className="text-sm text-gray-700 truncate">{dog.pedigree}</p>
                                    </div>
                                    <Link
                                        to="/apply"
                                        state={{ dogId: dog.id }}
                                        className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors text-sm font-semibold flex items-center gap-2"
                                    >
                                        <Trophy className="w-4 h-4" /> Apply
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dogs;
