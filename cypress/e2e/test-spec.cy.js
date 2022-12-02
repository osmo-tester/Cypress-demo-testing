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
  });