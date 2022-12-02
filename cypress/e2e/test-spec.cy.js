/// <reference types = "cypress"/>

beforeEach(() => {
  cy.visit('/');
})

describe('API tests', ()=>{
    it('the site is opening with status 200', () =>{
      cy.request("https://vuejs-shopping-cart.coddeine.com/").then((result) => {
        expect(result).to.have.property("status", 200)
      })
    })

describe('Registration', () => {
  it("tests duplicated email can't be registered", () => {
    onLoginPage.registerNewUser();
    cy.contains('The email address is already in use by another account.')
      .should('be.visible');
    })
  })  

describe('Login', () => {
  it('tests that user can login with valid credentials', () => {
    onLoginPage.login();
    cy.contains('Logout').should('be.visible');
    })
  })  

describe('Registration', () => {
  it("Tests duplicated email can't be registered", () => {
    onLoginPage.logout();
    onLoginPage.registerNewUser();
    cy.contains('The email address is already in use by another account.')
      .should('be.visible');
    })
  })
})
