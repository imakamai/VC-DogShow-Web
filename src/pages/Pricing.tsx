import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Check, FileText, Award, Users, Crown, Dog } from 'lucide-react';

interface PricingItem {
    name: string;
    price: string;
    note?: string;
}

interface PricingCategory {
    title: string;
    icon: React.ReactNode;
    items: PricingItem[];
}

const Pricing = () => {
    const { user } = useAuth();

    if (user && (user.role === 'Manager' || user.role === 'Admin')) {
        return <Navigate to="/" replace />;
    }

    const pricingData: PricingCategory[] = [
        {
            title: 'Pedigrees & Documents',
            icon: <FileText className="w-6 h-6 text-orange-500" />,
            items: [
                { name: 'Pedigree (with working booklet)', price: '3,500 RSD', note: '1,000 to association, 2,500 to KSRS' },
                { name: 'Duplicate Pedigree', price: '3,500 RSD' },
                { name: 'Export Pedigree / Duplicate', price: '8,000 RSD' },
                { name: 'Nostrification of Pedigree (JR number)', price: '3,000 RSD' },
                { name: 'Pedigree for Indigenous Scent Hounds', price: '700 RSD' },
                { name: 'Issuance of Identification Hunting Card', price: '300 RSD' }
            ]
        },
        {
            title: 'Shows & Exhibitions',
            icon: <Award className="w-6 h-6 text-orange-500" />,
            items: [
                { name: 'CAC - per dog entered in catalog', price: '250 RSD' },
                { name: 'CACIB - per dog entered in catalog', price: '500 RSD' },
                { name: 'Championship of KSRS', price: '8,000 RSD', note: 'Youth, Adult, Beauty, Working, Grand, Veteran' },
                { name: 'Domestic Exhibitor Entry (1st Dog)', price: '2,000 RSD' },
                { name: 'Domestic Exhibitor Entry (Subsequent)', price: '1,500 RSD' },
                { name: 'Foreign Exhibitor Entry', price: '30 EUR' }
            ]
        },
        {
            title: 'Kennels & Breeding',
            icon: <Dog className="w-6 h-6 text-orange-500" />,
            items: [
                { name: 'Kennel Name Protection', price: '20,000 RSD' }
            ]
        },
        {
            title: 'Judges & Officials',
            icon: <Users className="w-6 h-6 text-orange-500" />,
            items: [
                { name: 'Judges\' Exam', price: '15,000 RSD' },
                { name: 'Judge\'s Membership Fee', price: '5,000 RSD' },
                { name: 'Judge/Delegate Daily Allowance', price: '7,000 RSD', note: '+ Travel Expenses' }
            ]
        },
        {
            title: 'Associations & Clubs',
            icon: <Crown className="w-6 h-6 text-orange-500" />,
            items: [
                { name: 'Membership Fee (Member Associations)', price: '10,000 RSD' },
                { name: 'New Association Registration', price: '100,000 RSD' },
                { name: 'Specialized Exhibitions (One Breed)', price: '10,000 RSD' }
            ]
        }
    ];

    return (
        <div className="bg-gray-50 dark:bg-gray-900 py-12 sm:py-16 lg:py-20 min-h-screen transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                        Official Price List 2025
                    </h2>
                    <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
                        Kinološki Savez Republike Srbije (KSRS)
                    </p>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
                        Effective from January 1, 2025
                    </p>
                </div>

                <div className="mt-16 space-y-12">
                    {pricingData.map((category) => (
                        <div key={category.title} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                            <div className="p-6 bg-orange-50 dark:bg-orange-900/20 border-b border-orange-100 dark:border-orange-900/30 flex items-center">
                                <div className="p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm mr-4">
                                    {category.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{category.title}</h3>
                            </div>
                            <div className="divide-y divide-gray-100 dark:divide-gray-700">
                                {category.items.map((item, index) => (
                                    <div key={index} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150">
                                        <div className="flex-1 pr-4">
                                            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.name}</h4>
                                            {item.note && (
                                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{item.note}</p>
                                            )}
                                        </div>
                                        <div className="mt-4 sm:mt-0 flex-shrink-0">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-200">
                                                {item.price}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center text-sm text-gray-500">
                    <p>
                        Payment Account: 105-3520-42 Aik Banka
                    </p>
                    <p className="mt-2">
                        Note: Dogs with cropped ears/tails (where not standard) are not allowed at FCI events starting Jan 1, 2025.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
