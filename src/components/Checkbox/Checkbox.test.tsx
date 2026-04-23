import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  it('renders checkbox element', () => {
    render(<Checkbox />)
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })

  it('renders label when label prop is provided', () => {
    render(<Checkbox label="Accept terms" />)
    expect(screen.getByText('Accept terms')).toBeInTheDocument()
  })

  it('associates label with checkbox via htmlFor', () => {
    render(<Checkbox label="Subscribe" id="subscribe" />)
    const label = screen.getByText('Subscribe').closest('label')
    expect(label).toHaveAttribute('for', 'subscribe')
  })

  it('is unchecked by default', () => {
    render(<Checkbox />)
    expect(screen.getByRole('checkbox')).toHaveAttribute('data-state', 'unchecked')
  })

  it('is checked when defaultChecked is true', () => {
    render(<Checkbox defaultChecked />)
    expect(screen.getByRole('checkbox')).toHaveAttribute('data-state', 'checked')
  })

  it('calls onCheckedChange when clicked', () => {
    const handleChange = vi.fn()
    render(<Checkbox onCheckedChange={handleChange} />)
    fireEvent.click(screen.getByRole('checkbox'))
    expect(handleChange).toHaveBeenCalledWith(true)
  })

  it('is disabled when disabled prop is true', () => {
    render(<Checkbox disabled />)
    expect(screen.getByRole('checkbox')).toBeDisabled()
  })

  it('applies pointer-events-none when readOnly is true', () => {
    const { container } = render(<Checkbox readOnly label="Read only" />)
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveClass('pointer-events-none')
  })
})
