import { render, screen, fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom';
import { Input } from '.';

describe('Input Component', () => {
  it('renders the input with label and placeholder', () => {
    render(
      <Input
        id='test-input'
        label='Test Label'
        placeholder='Test Placeholder'
      />
    );

    const label = screen.getByLabelText('Test Label');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('placeholder', 'Test Placeholder');
  });

  it('applies default value correctly', () => {
    render(
      <Input
        id='test-input'
        label='Test Label'
        placeholder='Test Placeholder'
        defaultValue='Default Value'
      />
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveValue('Default Value');
  });

  it('applies custom classNames', () => {
    render(
      <Input
        id='test-input'
        label='Test Label'
        placeholder='Test Placeholder'
        classNames='custom-class'
      />
    );

    const container = screen.getByLabelText('Test Label').parentElement;
    expect(container).toHaveClass('custom-class');
  });

  it('renders an icon when provided', () => {
    const TestIcon = <span data-testid='test-icon'>Icon</span>;
    render(
      <Input
        id='test-input'
        label='Test Label'
        placeholder='Test Placeholder'
        icon={TestIcon}
      />
    );

    const icon = screen.getByTestId('test-icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveTextContent('Icon');
  });

  it('handles onChange events', () => {
    const onChangeMock = jest.fn();
    render(
      <Input
        id='test-input'
        label='Test Label'
        placeholder='Test Placeholder'
        onChange={onChangeMock}
      />
    );

    const input = screen.getByLabelText('Test Label');
    fireEvent.change(input, { target: { value: 'New Value' } });
    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });

  it('adds padding when an icon is present', () => {
    const TestIcon = <span data-testid='test-icon'>Icon</span>;
    render(
      <Input
        id='test-input'
        label='Test Label'
        placeholder='Test Placeholder'
        icon={TestIcon}
      />
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveClass('pl-10');
  });

  it('renders without crashing when no optional props are passed', () => {
    render(
      <Input
        id='test-input'
        label='Test Label'
        placeholder='Test Placeholder'
      />
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toBeInTheDocument();
  });
});
