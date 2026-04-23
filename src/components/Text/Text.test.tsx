import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Text } from './Text'

describe('Text', () => {
  it('renders children content', () => {
    render(<Text>Hello world</Text>)
    expect(screen.getByText('Hello world')).toBeInTheDocument()
  })

  it('renders as span by default', () => {
    render(<Text>Default tag</Text>)
    expect(screen.getByText('Default tag').tagName).toBe('SPAN')
  })

  it('renders as custom tag when as prop is provided', () => {
    render(<Text as="h1">Heading</Text>)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders as paragraph when as="p"', () => {
    render(<Text as="p">Paragraph</Text>)
    expect(screen.getByText('Paragraph').tagName).toBe('P')
  })

  it('applies font-bold class for bold weight', () => {
    render(<Text weight="bold">Bold text</Text>)
    expect(screen.getByText('Bold text')).toHaveClass('font-bold')
  })

  it('applies text-5xl class for display1 size', () => {
    render(<Text size="display1">Large text</Text>)
    expect(screen.getByText('Large text')).toHaveClass('text-5xl')
  })

  it('applies text-xs class for caption3 size', () => {
    render(<Text size="caption3">Small text</Text>)
    expect(screen.getByText('Small text')).toHaveClass('text-xs')
  })

  it('merges custom className', () => {
    render(<Text className="custom-class">Styled</Text>)
    expect(screen.getByText('Styled')).toHaveClass('custom-class')
  })
})
