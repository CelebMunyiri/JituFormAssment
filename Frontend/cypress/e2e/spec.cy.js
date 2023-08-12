/// <reference types="Cypress"/>
describe('Visits index page with register', () => {
  it('Should visit index page with register form', () => {
    cy.visit('http://127.0.0.1:5500/Frontend/index.html')
    cy.get('[data-cy="register"]').contains('Register')
    cy.get('button').contains('Register')
  })

  it('should not have forgot password on the index page', ()=>{
    cy.visit('http://127.0.0.1:5500/Frontend/index.html')
    cy.get('button').should('not.contain', 'Forgot')
})

it ('simulates user interaction', ()=>{
  cy.visit('http://127.0.0.1:5500/Frontend/index.html')

  cy.get('#firstName').type('david')
  cy.get('#lastName').type('mwangi')
  cy.get('#jituEmail').type('david.mwangi@thejitu.com')
  cy.get('#userCohort').type('12')
  cy.get('#password').type('Mahu#123')
  cy.get('.register').click()
  
  cy.go('forward')
  
})
it('Simulates user login and',()=>{
  cy.visit('http://127.0.0.1:5500/Frontend/login.html')

  //cy.get('#loginjituEmail').type('david.mwangi@thejitu.com')
  //cy.get('#loginjitupassword').type('Mahu#123')
  //cy.get("#submit").click()
 // cy.go('forward')
 
})
})