import { render, screen, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from './Tooltip'

describe('TooltipProvider', () => {
  it('renders children', () => {
    render(
      <TooltipProvider>
        <div>Content</div>
      </TooltipProvider>
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
  })
})

describe('Tooltip', () => {
  it('renders trigger element', () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tooltip text</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
    expect(screen.getByText('Hover me')).toBeInTheDocument()
  })

  it('shows tooltip content when open prop is true', () => {
    render(
      <TooltipProvider>
        <Tooltip open>
          <TooltipTrigger>Trigger</TooltipTrigger>
          <TooltipContent>Tooltip text</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
    expect(screen.getByRole('tooltip')).toHaveTextContent('Tooltip text')
  })

  it('does not show tooltip content when closed', () => {
    render(
      <TooltipProvider>
        <Tooltip open={false}>
          <TooltipTrigger>Trigger</TooltipTrigger>
          <TooltipContent>Hidden tooltip</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('shows tooltip on focus', async () => {
    render(
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger>Focus me</TooltipTrigger>
          <TooltipContent>Focus tooltip</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
    await act(async () => {
      screen.getByText('Focus me').focus()
    })
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
  })

  it('trigger has correct accessible role', () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button>Info</button>
          </TooltipTrigger>
          <TooltipContent>Details</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
    expect(screen.getByRole('button', { name: 'Info' })).toBeInTheDocument()
  })
})
