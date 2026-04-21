import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Navbar } from '../components/Navbar';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

describe('Navbar Component', () => {
  it('renders correctly', () => {
    render(<Navbar />);
    expect(screen.getByText('QuoteCraft')).toBeInTheDocument();
    expect(screen.getByText('How it works')).toBeInTheDocument();
  });

  it('calls onHowItWorks prop when How it works button is clicked', () => {
    const handleHowItWorks = vi.fn();
    render(<Navbar onHowItWorks={handleHowItWorks} />);
    
    const howItWorksButton = screen.getByText('How it works');
    fireEvent.click(howItWorksButton);
    
    expect(handleHowItWorks).toHaveBeenCalledTimes(1);
  });
});
