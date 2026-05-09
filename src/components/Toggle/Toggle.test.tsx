import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Toggle } from './Toggle'

describe('Toggle', () => {
  it('renders with text content', () => {
    render(<Toggle>Technology</Toggle>)
    expect(screen.getByText('Technology')).toBeInTheDocument()
  })

  it('renders as a button element', () => {
    render(<Toggle>Category</Toggle>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('starts in off state by default', () => {
    render(<Toggle>Item</Toggle>)
    expect(screen.getByRole('button')).toHaveAttribute('data-state', 'off')
  })

  it('toggles to on state when clicked', () => {
    render(<Toggle>Item</Toggle>)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(button).toHaveAttribute('data-state', 'on')
  })

  it('renders icon when icon prop is provided', () => {
    render(<Toggle icon={<span data-testid="icon">🔥</span>}>Hot</Toggle>)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('calls onPressedChange when pressed', () => {
    const handleChange = vi.fn()
    render(<Toggle onPressedChange={handleChange}>Item</Toggle>)
    fireEvent.click(screen.getByRole('button'))
    expect(handleChange).toHaveBeenCalledWith(true)
  })

  it('is disabled when disabled prop is true', () => {
    render(<Toggle disabled>Disabled</Toggle>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
