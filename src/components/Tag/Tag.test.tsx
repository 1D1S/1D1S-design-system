import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Tag } from './Tag'

describe('Tag', () => {
  it('renders children content', () => {
    render(<Tag>New</Tag>)
    expect(screen.getByText('New')).toBeInTheDocument()
  })

  it('renders as a span element', () => {
    const { container } = render(<Tag>Badge</Tag>)
    expect(container.firstChild?.nodeName).toBe('SPAN')
  })

  it('renders icon when icon prop is provided', () => {
    render(<Tag icon="🔥">Hot</Tag>)
    expect(screen.getByText('🔥')).toBeInTheDocument()
    expect(screen.getByText('Hot')).toBeInTheDocument()
  })

  it('applies gap class when icon is provided', () => {
    const { container } = render(<Tag icon="⭐">Star</Tag>)
    expect(container.firstChild).toHaveClass('gap-1.5')
  })

  it('does not apply gap class when icon is not provided', () => {
    const { container } = render(<Tag>No Icon</Tag>)
    expect(container.firstChild).not.toHaveClass('gap-1.5')
  })

  it('applies text-xl class for body1 size', () => {
    render(<Tag size="body1">Large Tag</Tag>)
    expect(screen.getByText('Large Tag')).toHaveClass('text-xl')
  })

  it('merges custom className', () => {
    const { container } = render(<Tag className="my-tag">Custom</Tag>)
    expect(container.firstChild).toHaveClass('my-tag')
  })
})
