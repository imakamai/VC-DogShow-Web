import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LoginRequest } from '../types';
import { Button, Input } from '../components/ui';
import { Dog } from 'lucide-react';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginRequest>();
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: LoginRequest) => {
        setLoading(true);
        setError(null);
        try {
            await login(data);
            navigate('/');
        } catch (err: any) {
            console.error('Login error detail:', err);
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                setError(typeof err.response.data === 'string' ? err.response.data : 'Invalid username or password');
            } else if (err.request) {
                // The request was made but no response was received
                setError('Unable to reach the server. Please check if the backend is running and accepting connections (CORS/SSL).');
            } else {
                // Something happened in setting up the request that triggered an Error
                setError(err.message || 'An unexpected error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl transition-colors duration-300">
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                        <Dog className="h-8 w-8 text-orange-600" />
                    </div>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">Welcome back</h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Sign in to manage your dogs and competitions
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <Input
                            label="Username"
                            type="text"
                            placeholder="Enter your username"
                            {...register('username', { required: 'Username is required' })}
                            error={errors.username?.message}
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            {...register('password', { required: 'Password is required' })}
                            error={errors.password?.message}
                        />
                    </div>

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
                        {loading ? 'Signing in...' : 'Sign in'}
                    </Button>

                    <div className="text-center text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Don't have an account? </span>
                        <Link to="/register" className="font-medium text-orange-600 hover:text-orange-500 transition-colors">
                            Sign up
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
