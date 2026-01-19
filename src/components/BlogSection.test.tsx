import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BlogSection from './BlogSection';

test('renders blog section header', () => {
    render(
        <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <BlogSection />
        </MemoryRouter>
    );
    const titleElement = screen.getByText(/News & Updates/i);
    expect(titleElement).toBeInTheDocument();
});

test('renders all blog posts', () => {
    render(
        <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <BlogSection />
        </MemoryRouter>
    );
    const readMoreLinks = screen.getAllByText(/Read full article/i);
    expect(readMoreLinks).toHaveLength(3);
});
