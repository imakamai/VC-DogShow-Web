export interface User {
    id: string;
    username: string;
    name: string;
    lastName: string;
    email: string;
    phone?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    state?: string;
    role: 'User' | 'Manager' | 'Admin';
}

export interface Dog {
    id: number;
    name: string;
    breed: string;
    birth: string; // DateOnly as string
    age: number;
    gender: 'Male' | 'Female';
    weight: number;
    size: number;
    pedigree: string;
}

export interface DogDTO {
    name: string;
    breed: string;
    birth: string;
    age: number;
    gender: 'Male' | 'Female';
    weight: number;
    size: number;
    pedigree: string;
}

export interface Competition {
    id: number;
    title: string;
    acquisitionDate: string;
    acquisitionTime: string;
    acquisitionPlace: string;
    applicationDeadline: string;
    judges: Judge[];
}

export interface Judge {
    id: string; // Guid
    name: string;
    lastName: string;
    age: number;
    yearsOfExperience: number;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    role?: string;
}

export interface PaymentRequest {
    amount: number;
    description: string;
    successUrl: string;
    cancelUrl: string;
}

export interface AuthResponse {
    token: string;
}

export interface PaymentMethod {
    id: string;
    brand: 'visa' | 'mastercard' | 'amex' | 'default';
    last4: string;
    expiryMonth: number;
    expiryYear: number;
}
