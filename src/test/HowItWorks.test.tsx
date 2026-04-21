import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { HowItWorks } from '../components/HowItWorks';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Note: Framer motion sometimes has difficulties in raw Jest, but basic render works.
describe('HowItWorks Component', () => {
  it('renders correctly', () => {
    render(<HowItWorks onBack={() => {}} onStart={() => {}} />);
    expect(screen.getByText('How It Works')).toBeInTheDocument();
  });

  it('calls onBack prop when back button is clicked', () => {
    const handleBack = vi.fn();
    render(<HowItWorks onBack={handleBack} onStart={() => {}} />);
    
    const backButton = screen.getByText('Back');
    fireEvent.click(backButton);
    
    expect(handleBack).toHaveBeenCalledTimes(1);
  });

  it('calls onStart prop when get started button is clicked', () => {
    const handleStart = vi.fn();
    render(<HowItWorks onBack={() => {}} onStart={handleStart} />);
    
    const startButton = screen.getByText('Get Started');
    fireEvent.click(startButton);
    
    expect(handleStart).toHaveBeenCalledTimes(1);
  });
});
