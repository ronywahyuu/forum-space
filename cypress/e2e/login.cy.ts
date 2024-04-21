/**
 * - Login spec
 *   - should display login page correctly
 *   - should display disabled submit button when email is empty
 *   - should display disabled submit button when password is empty
 *   - should display homepage when username and password are correct
 */


describe('Login spec', () => {
  it('should display login page correctly', () => {
    cy.visit('http://localhost:5173/login')

    cy.get('h3').should('have.text', 'Sign in')
    cy.get('form').should('be.visible')
    cy.get('input[name="email"]').should('be.visible')
    cy.get('input[name="password"]').should('be.visible')
    cy.get('button[type="submit"]').contains(/^Sign in$/).should('be.visible')
  })

  it('should display disabled submit button when email is empty', () => {
    cy.visit('http://localhost:5173/login')

    cy.get('button[type="submit"]').should('be.disabled')
  })

  it('should display disabled submit button when password is empty', () => {
    cy.visit('http://localhost:5173/login')

    cy.get('button[type="submit"]').should('be.disabled')
  })

  it('should display homepage when username and password are correct', () => {
    cy.visit('http://localhost:5173/login')

    cy.get('input[name="email"]').type('initest@gmail.com')
    cy.get('input[name="password"]').type('123456')

    cy.get('button[type="submit"]').click()

    cy.url().should('eq', 'http://localhost:5173/')

    cy.get('h1').should('have.text', 'Threads')

  })
})