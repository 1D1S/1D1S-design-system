import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { TextField, TextArea } from './TextField'

describe('TextField', () => {
  it('renders an input element by default', () => {
    render(<TextField />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByRole('textbox').tagName).toBe('INPUT')
  })

  it('renders label when label prop is provided', () => {
    render(<TextField label="Username" id="username" />)
    expect(screen.getByText('Username')).toBeInTheDocument()
  })

  it('associates label with input via htmlFor', () => {
    render(<TextField label="Email" id="email" />)
    const input = screen.getByRole('textbox')
    const label = screen.getByText('Email').closest('label')
    expect(label).toHaveAttribute('for', 'email')
    expect(input).toHaveAttribute('id', 'email')
  })

  it('shows asterisk when required is true', () => {
    render(<TextField label="Name" required />)
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('shows error message when error prop is provided', () => {
    render(<TextField error="This field is required" />)
    expect(screen.getByText('This field is required')).toBeInTheDocument()
  })

  it('renders textarea when multiline is true', () => {
    render(<TextField multiline />)
    expect(screen.getByRole('textbox').tagName).toBe('TEXTAREA')
  })

  it('calls onChange when value changes', () => {
    const handleChange = vi.fn()
    render(<TextField onChange={handleChange} />)
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'hello' } })
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('shows labelHint when provided', () => {
    render(<TextField label="Age" labelHint="(optional)" />)
    expect(screen.getByText('(optional)')).toBeInTheDocument()
  })
})

describe('TextArea', () => {
  it('renders textarea element', () => {
    render(<TextArea />)
    expect(screen.getByRole('textbox').tagName).toBe('TEXTAREA')
  })
})
