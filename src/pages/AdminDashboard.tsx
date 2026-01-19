import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { User, Dog, Competition } from '../types';
import { Users, Dog as DogIcon, Trophy } from 'lucide-react';

const AdminDashboard = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [dogs, setDogs] = useState<any[]>([]); // Using any for display DTO
    const [competitions, setCompetitions] = useState<any[]>([]); // Using any for Form/Application DTO if needed or just Competition
    const [activeTab, setActiveTab] = useState<'users' | 'dogs' | 'competitions'>('users');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [usersRes, dogsRes, appsRes] = await Promise.all([
                    api.get<User[]>('/User'),
                    api.get<any[]>('/Dog'), // Admin gets all dogs
                    api.get<any[]>('/Application') // Admin gets all applications
                ]);
                setUsers(usersRes.data);
                setDogs(dogsRes.data);
                setCompetitions(appsRes.data);
            } catch (error) {
                console.error("Failed to fetch admin data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="p-8 text-center">Loading Admin Dashboard...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Admin Dashboard</h1>

            <div className="flex gap-4 mb-8">
                <button
                    onClick={() => setActiveTab('users')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'users'
                        ? 'bg-orange-500 text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                >
                    <Users className="w-5 h-5" /> Users
                </button>
                <button
                    onClick={() => setActiveTab('dogs')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'dogs'
                        ? 'bg-orange-500 text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                >
                    <DogIcon className="w-5 h-5" /> All Dogs
                </button>
                <button
                    onClick={() => setActiveTab('competitions')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'competitions'
                        ? 'bg-orange-500 text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                >
                    <Trophy className="w-5 h-5" /> Applications
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
                {activeTab === 'users' && (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300">
                                <tr>
                                    <th className="p-4">Name</th>
                                    <th className="p-4">Username</th>
                                    <th className="p-4">Email</th>
                                    <th className="p-4">Role</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                {users.map(user => (
                                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                        <td className="p-4 font-medium">{user.name} {user.lastName}</td>
                                        <td className="p-4">{user.username}</td>
                                        <td className="p-4">{user.email}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded-full text-xs ${user.role === 'Admin' ? 'bg-red-100 text-red-700' :
                                                user.role === 'Manager' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-green-100 text-green-700'
                                                }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'dogs' && (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300">
                                <tr>
                                    <th className="p-4">Name</th>
                                    <th className="p-4">Breed</th>
                                    <th className="p-4">Age</th>
                                    <th className="p-4">Gender</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                {dogs.map(dog => (
                                    <tr key={dog.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                        <td className="p-4 font-medium">{dog.name}</td>
                                        <td className="p-4">{dog.breed}</td>
                                        <td className="p-4">{dog.age}</td>
                                        <td className="p-4">{dog.gender}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'competitions' && (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300">
                                <tr>
                                    <th className="p-4">App ID</th>
                                    <th className="p-4">Dog Details</th>
                                    <th className="p-4">Owner</th>
                                    <th className="p-4">Competition</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                {competitions.map((app: any) => (
                                    <tr key={app.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 align-top">
                                        <td className="p-4 text-sm text-gray-500">#{app.id}</td>
                                        <td className="p-4">
                                            <div className="font-medium">{app.dogName}</div>
                                            <div className="text-xs text-gray-500">{app.dogBreed}</div>
                                        </td>
                                        <td className="p-4">
                                            <div className="font-medium text-sm">{app.ownerName}</div>
                                            <div className="text-xs text-gray-400">@{app.ownerUsername}</div>
                                        </td>
                                        <td className="p-4 text-sm">{app.competitionName}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
