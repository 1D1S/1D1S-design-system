import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from './Dialog'

describe('Dialog', () => {
  it('renders trigger element', () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogTitle>Title</DialogTitle>
        </DialogContent>
      </Dialog>
    )
    expect(screen.getByText('Open Dialog')).toBeInTheDocument()
  })

  it('opens dialog when trigger is clicked', async () => {
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>My Dialog</DialogTitle>
        </DialogContent>
      </Dialog>
    )
    fireEvent.click(screen.getByText('Open'))
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
  })

  it('renders title when defaultOpen is true', () => {
    render(
      <Dialog defaultOpen>
        <DialogContent>
          <DialogTitle>Dialog Title</DialogTitle>
        </DialogContent>
      </Dialog>
    )
    expect(screen.getByText('Dialog Title')).toBeInTheDocument()
  })

  it('renders description when defaultOpen is true', () => {
    render(
      <Dialog defaultOpen>
        <DialogContent>
          <DialogTitle>Title</DialogTitle>
          <DialogDescription>Dialog description text</DialogDescription>
        </DialogContent>
      </Dialog>
    )
    expect(screen.getByText('Dialog description text')).toBeInTheDocument()
  })

  it('has a close button with accessible label', () => {
    render(
      <Dialog defaultOpen>
        <DialogContent>
          <DialogTitle>Dialog</DialogTitle>
        </DialogContent>
      </Dialog>
    )
    expect(screen.getByRole('button', { name: '닫기' })).toBeInTheDocument()
  })

  it('renders header and footer children', () => {
    render(
      <Dialog defaultOpen>
        <DialogContent>
          <DialogTitle>Title</DialogTitle>
          <DialogHeader>
            <span>Header content</span>
          </DialogHeader>
          <DialogFooter>
            <span>Footer content</span>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
    expect(screen.getByText('Header content')).toBeInTheDocument()
    expect(screen.getByText('Footer content')).toBeInTheDocument()
  })
})
