import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Button } from '../components/ui';
import { Plus, Trophy, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const ManagerDashboard = () => {
    const [applications, setApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApps = async () => {
            try {
                const response = await api.get<any[]>('/Application');
                setApplications(response.data);
            } catch (error) {
                console.error("Failed to fetch applications", error);
            } finally {
                setLoading(false);
            }
        };

        fetchApps();
    }, []);

    if (loading) return <div className="p-8 text-center animate-pulse">Loading Manager Dashboard...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Manager Dashboard</h1>
                <Link to="/create-competition">
                    <Button>
                        <Plus className="w-4 h-4 mr-2" /> Create Competition
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Competition Management Block could go here */}

                {/* Applications List */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
                    <div className="p-6 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <FileText className="w-5 h-5 text-orange-500" /> Recent Applications
                        </h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300">
                                <tr>
                                    <th className="p-4">App ID</th>
                                    <th className="p-4">Dog Details</th>
                                    <th className="p-4">Owner Info</th>
                                    <th className="p-4">Competition</th>
                                    <th className="p-4">Class</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                {applications.length > 0 ? (
                                    applications.map((app: any) => (
                                        <tr key={app.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 align-top">
                                            <td className="p-4 font-mono text-sm">#{app.id}</td>
                                            <td className="p-4">
                                                <div className="font-medium">{app.dogName}</div>
                                                <div className="text-sm text-gray-500">{app.dogBreed}</div>
                                                <div className="text-xs text-gray-400">Age: {app.dogAge} | Pedigree: {app.dogPedigree}</div>
                                            </td>
                                            <td className="p-4">
                                                <div className="font-medium">{app.ownerName}</div>
                                                <div className="text-sm text-gray-500">@{app.ownerUsername}</div>
                                                <div className="text-xs text-gray-400">{app.ownerEmail}</div>
                                                <div className="text-xs text-gray-400">{app.ownerPhone}</div>
                                            </td>
                                            <td className="p-4">
                                                <div className="font-medium">{app.competitionName}</div>
                                            </td>
                                            <td className="p-4 text-sm text-gray-500">
                                                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                                    {app.competitionClass || 'Standard'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="p-8 text-center text-gray-500">
                                            No applications found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagerDashboard;
