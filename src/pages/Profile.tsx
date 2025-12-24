import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import api from '../services/api';
import { User } from '../types';
import { Button, Input } from '../components/ui';
import { User as UserIcon, MapPin, Phone, Mail, Trash2, Save, X, CreditCard, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, logout } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const { register, handleSubmit, reset } = useForm<User>({
        defaultValues: user || {}
    });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Payment Methods State
    const [paymentMethods, setPaymentMethods] = useState<any[]>([
        { id: '1', brand: 'visa', last4: '4242', expiryMonth: 12, expiryYear: 2025 },
        { id: '2', brand: 'mastercard', last4: '8888', expiryMonth: 9, expiryYear: 2026 }
    ]);
    const [showAddCard, setShowAddCard] = useState(false);
    const [newCard, setNewCard] = useState({ number: '', expiry: '', cvc: '' });

    const onSubmit = async (data: User) => {
        if (!user) return;
        setLoading(true);
        try {
            // Ensure ID matches
            const updatedUser = { ...data, id: user.id };
            await api.put(`/User/${user.id}`, updatedUser);
            // Refresh page or context would be ideal, for now just reload window to get fresh context
            window.location.reload();
        } catch (error) {
            console.error('Failed to update profile', error);
            alert('Failed to update profile');
        } finally {
            setLoading(false);
            setIsEditing(false);
        }
    };

    const handleDelete = async () => {
        if (!user) return;
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            try {
                await api.delete(`/User/${user.id}`);
                logout();
                navigate('/');
            } catch (error) {
                console.error('Failed to delete account', error);
                alert('Failed to delete account');
            }
        }
    };

    const handleAddCard = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate adding card
        const last4 = newCard.number.slice(-4) || '0000';
        const brand = newCard.number.startsWith('4') ? 'visa' : 'mastercard';
        const method = {
            id: Date.now().toString(),
            brand,
            last4,
            expiryMonth: 12,
            expiryYear: 2028
        };
        setPaymentMethods([...paymentMethods, method]);
        setShowAddCard(false);
        setNewCard({ number: '', expiry: '', cvc: '' });
    };

    const handleDeleteCard = (id: string) => {
        if (window.confirm('Remove this card?')) {
            setPaymentMethods(paymentMethods.filter(pm => pm.id !== id));
        }
    };

    if (!user) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-orange-400 to-red-500 px-8 py-10 text-white">
                    <div className="flex items-center gap-6">
                        <div className="h-24 w-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/30">
                            <UserIcon className="h-12 w-12 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">{user.name} {user.lastName}</h1>
                            <p className="text-orange-100 flex items-center gap-2 mt-1">
                                <Mail className="w-4 h-4" /> {user.email}
                            </p>
                        </div>
                        <div className="ml-auto">
                            {!isEditing && (
                                <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-none" onClick={() => setIsEditing(true)}>
                                    Edit Profile
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="p-8">
                    {isEditing ? (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input label="First Name" {...register('name')} />
                                <Input label="Last Name" {...register('lastName')} />
                                <Input label="Phone" {...register('phone')} />
                                <Input label="Address" {...register('address')} />
                                <Input label="City" {...register('city')} />
                                <Input label="State" {...register('state')} />
                                <Input label="Postal Code" {...register('postalCode')} />
                            </div>
                            <div className="flex items-center justify-end gap-4 pt-6 border-t">
                                <Button type="button" variant="ghost" onClick={() => { setIsEditing(false); reset(); }}>
                                    <X className="w-4 h-4 mr-2" /> Cancel
                                </Button>
                                <Button type="submit" disabled={loading}>
                                    <Save className="w-4 h-4 mr-2" /> {loading ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </div>
                        </form>
                    ) : (
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-gray-50 p-6 rounded-xl">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        <UserIcon className="w-5 h-5 text-orange-500" /> Personal Info
                                    </h3>
                                    <div className="space-y-3 text-gray-600">
                                        <p><span className="font-medium text-gray-900">Username:</span> {user.username}</p>
                                        <p><span className="font-medium text-gray-900">Phone:</span> {user.phone || 'Not provided'}</p>
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-6 rounded-xl">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        <MapPin className="w-5 h-5 text-orange-500" /> Address
                                    </h3>
                                    <div className="space-y-3 text-gray-600">
                                        <p>{user.address || 'No address'}</p>
                                        <p>{user.city ? `${user.city}, ` : ''}{user.state} {user.postalCode}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Methods Section */}
                            <div className="bg-white border rounded-xl overflow-hidden">
                                <div className="p-6 bg-gray-50 border-b flex justify-between items-center">
                                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                        <CreditCard className="w-5 h-5 text-orange-500" /> Payment Methods
                                    </h3>
                                    <Button size="sm" onClick={() => setShowAddCard(true)}>
                                        <Plus className="w-4 h-4 mr-2" /> Add Card
                                    </Button>
                                </div>
                                <div className="divide-y">
                                    {paymentMethods.map((pm) => (
                                        <div key={pm.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-8 bg-gray-100 rounded border flex items-center justify-center text-xs font-bold text-gray-500 uppercase">
                                                    {pm.brand}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">•••• •••• •••• {pm.last4}</p>
                                                    <p className="text-sm text-gray-500">Expires {pm.expiryMonth}/{pm.expiryYear}</p>
                                                </div>
                                            </div>
                                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700" onClick={() => handleDeleteCard(pm.id)}>
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ))}
                                    {paymentMethods.length === 0 && (
                                        <div className="p-8 text-center text-gray-500">
                                            No payment methods added.
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="pt-6 border-t flex justify-between items-center bg-red-50 p-6 rounded-xl">
                                <div>
                                    <h4 className="text-red-800 font-semibold">Danger Zone</h4>
                                    <p className="text-red-600 text-sm">Delete your account and all associated data.</p>
                                </div>
                                <Button variant="outline" className="border-red-500 text-red-600 hover:bg-red-100" onClick={handleDelete}>
                                    <Trash2 className="w-4 h-4 mr-2" /> Delete Account
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Add Card Modal */}
            {showAddCard && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900">Add New Card</h3>
                            <button onClick={() => setShowAddCard(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <form onSubmit={handleAddCard} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="0000 0000 0000 0000"
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                                    value={newCard.number}
                                    onChange={e => setNewCard({ ...newCard, number: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="MM/YY"
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                                        value={newCard.expiry}
                                        onChange={e => setNewCard({ ...newCard, expiry: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="123"
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                                        value={newCard.cvc}
                                        onChange={e => setNewCard({ ...newCard, cvc: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="pt-4 flex gap-3">
                                <Button type="button" variant="ghost" className="flex-1" onClick={() => setShowAddCard(false)}>Cancel</Button>
                                <Button type="submit" className="flex-1">Add Card</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
