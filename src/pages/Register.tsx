import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { RegisterRequest } from '../types';
import { Button, Input } from '../components/ui';
import { UserPlus } from 'lucide-react';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterRequest>();
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: RegisterRequest) => {
        setLoading(true);
        setError(null);
        try {
            await api.post('/User', data);
            navigate('/login');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl transition-colors duration-300">
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 bg-gradient-to-tr from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-md">
                        <UserPlus className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">Create Account</h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Join the community of dog lovers
                    </p>
                </div>

                <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="First Name"
                            placeholder="John"
                            {...register('name', { required: 'Name is required' })}
                            error={errors.name?.message}
                        />
                        <Input
                            label="Last Name"
                            placeholder="Doe"
                            {...register('lastName', { required: 'Last name is required' })}
                            error={errors.lastName?.message}
                        />
                    </div>

                    <Input
                        label="Email"
                        type="email"
                        placeholder="john@example.com"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                            }
                        })}
                        error={errors.email?.message}
                    />

                    <Input
                        label="Username"
                        type="text"
                        placeholder="johndoe"
                        {...register('username', { required: 'Username is required' })}
                        error={errors.username?.message}
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters"
                            }
                        })}
                        error={errors.password?.message}
                    />

                    {error && (
                        <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg">
                            {error}
                        </div>
                    )}

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={loading}
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </Button>

                    <div className="text-center text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Already have an account? </span>
                        <Link to="/login" className="font-medium text-orange-600 hover:text-orange-500 transition-colors">
                            Sign in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
