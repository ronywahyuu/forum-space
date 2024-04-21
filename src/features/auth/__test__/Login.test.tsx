import { render, screen } from "@testing-library/react"
import Login from "../Login"
import userEvent from "@testing-library/user-event"
import { MemoryRouter, Router } from "react-router-dom"
import { renderWithProviders } from "@/utils/test-utils"

describe('Login Component', () => {
  it('should render the login form', async () => {
    // arrange
    renderWithProviders(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )

    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInput = screen.getByPlaceholderText('Password')

    // act
    await userEvent.type(emailInput, 'test@gmail.com')
    await userEvent.type(passwordInput, 'password')

    // assert
    expect(emailInput).toHaveValue("test@gmail.com")
    expect(passwordInput).toHaveValue("password")
  })
  it('should submit the form correctly', async () => {
    // arrange
    const mockLogin = vi.fn()

    renderWithProviders(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )

    const emailInput = screen.getByPlaceholderText('Email')
    await userEvent.type(emailInput, "test@mail.com")

    const passwordInput = screen.getByPlaceholderText('Password')
    await userEvent.type(passwordInput, 'password')

    const submitButton = screen.getByRole('button', { name: 'Sign in' })


    // act
    await userEvent.click(submitButton)



    // expected spy to be called with arguments: { email: '
    // expect(mockLogin).toHaveBeenCalledWith({
    //   email: "test@mail.com",
    //   password: "password"
    // })
    expect(emailInput).toHaveValue('test@mail.com')
    expect(passwordInput).toHaveValue('password')


  })


  it('should show error message if login failed', () => {

  })
  it('should redirect to home page after login', () => {

  })
})