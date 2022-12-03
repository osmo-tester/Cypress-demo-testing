const username = Cypress.env('username')
const password = Cypress.env('password')

export class LoginPage {
  
  login() {
    cy.contains('Login').click();
    cy.get('#email').type(username);
    cy.get('#password').type(password);
    cy.get('[type="submit"]').click();
  };

  registerNewUser() {
    cy.contains('Login').click();
    cy.contains('Register').click();
    cy.get('#email').type(username);
    cy.get('#password').type(password);
    cy.get('[type="submit"]').click();
  };

  logout() {
    cy.get('#navbarTop').then(navbarTop =>{
      if(navbarTop){
        cy.contains('Logout '+(username))
          .click()
      }else{
        cy.contains('Login') .and('be.visible', 'Login')
      }
    })
  };

  loginPageIsOpened() {
    cy.contains('Logout').should('be.visible')
  };

  duplicatedAdderessNotification() {
    cy.contains('The email address is already in use by another account.')
      .should('be.visible')
  };

  confirmRegistration() {
    cy.contains('The email address is already in use by another account.')
      .should('be.visible');
  };
};
export const onLoginPage = new LoginPage();