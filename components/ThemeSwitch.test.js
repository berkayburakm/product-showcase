import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ThemeSwitch from '@/components/ThemeSwitch'
import { useTheme } from 'next-themes'

jest.mock('next-themes', () => ({
  useTheme: jest.fn(),
}))

jest.mock('react-icons/fi', () => ({
  FiSun: ({ className }) => (
    <svg className={className} data-testid="sun-icon" />
  ),
  FiMoon: ({ className }) => (
    <svg className={className} data-testid="moon-icon" />
  ),
}))

describe('ThemeSwitch', () => {
  const mockSetTheme = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders correctly when mounted with light theme', async () => {
    useTheme.mockReturnValue({
      setTheme: mockSetTheme,
      resolvedTheme: 'light',
    })

    render(<ThemeSwitch />)

    await waitFor(() => {
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    expect(screen.getByTestId('moon-icon')).toBeInTheDocument()
    expect(screen.queryByTestId('sun-icon')).not.toBeInTheDocument()
  })

  it('renders correctly when mounted with dark theme', async () => {
    useTheme.mockReturnValue({
      setTheme: mockSetTheme,
      resolvedTheme: 'dark',
    })

    render(<ThemeSwitch />)

    await waitFor(() => {
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    expect(screen.getByTestId('sun-icon')).toBeInTheDocument()
    expect(screen.queryByTestId('moon-icon')).not.toBeInTheDocument()
  })

  it('switches from light to dark theme when clicked', async () => {
    useTheme.mockReturnValue({
      setTheme: mockSetTheme,
      resolvedTheme: 'light',
    })

    render(<ThemeSwitch />)

    await waitFor(() => {
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(mockSetTheme).toHaveBeenCalledWith('dark')
  })

  it('switches from dark to light theme when clicked', async () => {
    useTheme.mockReturnValue({
      setTheme: mockSetTheme,
      resolvedTheme: 'dark',
    })

    render(<ThemeSwitch />)

    await waitFor(() => {
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(mockSetTheme).toHaveBeenCalledWith('light')
  })

  it('has correct CSS classes', async () => {
    useTheme.mockReturnValue({
      setTheme: mockSetTheme,
      resolvedTheme: 'light',
    })

    render(<ThemeSwitch />)

    await waitFor(() => {
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    const button = screen.getByRole('button')
    expect(button).toHaveClass(
      'p-2',
      'text-gray-700',
      'transition-all',
      'duration-200',
      'bg-gray-100',
      'rounded-full',
      'cursor-pointer'
    )
  })
})
