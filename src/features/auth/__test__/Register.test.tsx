import { renderWithProviders } from "@/utils/test-utils"
import { MemoryRouter } from "react-router-dom"
import Register from "../Register"
import { screen, waitFor } from "@testing-library/dom"
import userEvent from "@testing-library/user-event"

describe('Register Component', () => {
  it('should handle the register form correctly', async () => {
    renderWithProviders(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    )

    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInput = screen.getByPlaceholderText('Password')
    const passwordConfirmInput = screen.getByPlaceholderText('Confirm Password')

    await userEvent.type(emailInput, 'test@gmail.com')
    await userEvent.type(passwordInput, 'password')
    await userEvent.type(passwordConfirmInput, 'password')


    expect(emailInput).toHaveValue('test@gmail.com')
    expect(passwordInput).toHaveValue('password')
    expect(passwordConfirmInput).toHaveValue('password')

  })

  it.skip('should show error message if password not match', async() => {
    // arrange
    renderWithProviders(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    )

    const passwordInput = screen.getByPlaceholderText('Password')
    const passwordConfirmInput = screen.getByPlaceholderText('Confirm Password')

    userEvent.type(passwordInput, 'password')
    userEvent.type(passwordConfirmInput, 'password')

    const submitButton = screen.getByRole('button', { name: 'Sign Up' })

    // act
    userEvent.click(submitButton)

    // assert
    // expect(screen.getByText('Password not match')).toBeInTheDocument()
    // expect(submitButton).toHaveProperty('disabled', true)
    // expect(submitButton).toBeDisabled()
    const errorMessage = await waitFor(() => screen.getByText('Password not match'))
    expect(errorMessage).toBeInTheDocument()

  })
  it('should redirect to login page after register', () => {

  })
})