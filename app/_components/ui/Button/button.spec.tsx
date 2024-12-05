import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import { ButtonVariant } from '@enums';

import { Button } from '.';

describe('Button', () => {
  it('renders the button', () => {
    render(<Button />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('renders with default variant (Primary)', () => {
    render(<Button />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('button--primary');
  });

  it('applies custom className', () => {
    render(<Button className='custom-class' />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('applies the correct variant class for Secondary', () => {
    render(<Button variant={ButtonVariant.Secondary} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('button--secondary');
  });

  it('calls onClick handler when clicked', () => {
    const onClickMock = jest.fn();
    render(<Button onClick={onClickMock}>Click me</Button>);
    const button = screen.getByRole('button', { name: 'Click me' });
    button.click();
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('renders children correctly', () => {
    render(<Button>Test Button</Button>);
    const button = screen.getByRole('button', { name: 'Test Button' });
    expect(button).toBeInTheDocument();
  });
});
