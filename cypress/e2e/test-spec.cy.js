/// <reference types = "cypress"/>

import { onLoginPage } from "../support/page_objects/loginPage"
import { onMainPage } from "../support/page_objects/mainPage"
import { onCheckoutPage } from "../support/page_objects/checkoutPage"

beforeEach(() => {
  cy.visit('/');
})

describe('API tests', ()=>{
  it(`#1 the site is opening with status 200`, () =>{
    cy.request("https://vuejs-shopping-cart.coddeine.com/").then((result) => {
      expect(result).to.have.property("status", 200)
    })
  });
});  

describe('Registration', () => {
  it(`#2 tests that the user is able to be registered`, () => {
    onLoginPage.registerNewUser();
    onLoginPage.confirmRegistration();
  });

  it(`#3 tests that duplicated email can't be registered`, () => {
    onLoginPage.registerNewUser();
    onLoginPage.duplicatedAdderessNotification();
  });
});  

describe('Login', () => {
  it(`#4 tests that user is able login with valid credentials`, () => {
    onLoginPage.login();
    onLoginPage.loginPageIsOpened();
  });
});  

describe('Shopping cart/Checkout', () => {
  it(`#5 tests that product can be added to the cart`, () => {
    onMainPage.addProductToCart("macbook Retina 13.3' ME662 (2013)");
    onMainPage.openCart();
    onCheckoutPage.checkProductIsInCart("macbook Retina 13.3' ME662 (2013)");
  });

  it(`#6 tests that the shopping cart is cleared after user logged out`, ()=>{
    onLoginPage.login();
    onMainPage.addProductToCart("macbook Retina 13.3' ME662 (2013)");
   onMainPage.confirmCheckoutInfo();
    onLoginPage.logout();
    onMainPage.confirmCheckoutInfo();
  });

  it(`#7 tests that multipple products can be added to the cart`, () => {
    onMainPage.addProductToCart("macbook Retina 13.3' ME662 (2013)");
    onMainPage.addProductToCart("Macbook Pro 13.3' Retina MF841LL/A");
    onMainPage.openCart();
    onCheckoutPage.checkProductIsInCart("macbook Retina 13.3' ME662 (2013)");
    onCheckoutPage.checkProductIsInCart("Macbook Pro 13.3' Retina MF841LL/A");
  });

  it(`#8 tests that product can be removed from cart`, () => {
    onMainPage.addProductToCart("macbook Retina 13.3' ME662 (2013)");
    onMainPage.openCart();
    onCheckoutPage.checkProductIsInCart("macbook Retina 13.3' ME662 (2013)");
    onCheckoutPage.removeProduct();
    onCheckoutPage.checkProductIsNotInCart("macbook Retina 13.3' ME662 (2013)");
  });

  it(`#9 tests that order can be succesfully checkout`, () => {
    onLoginPage.login();
    onMainPage.addProductToCart("macbook Retina 13.3' ME662 (2013)");
    onMainPage.openCart();
    onCheckoutPage.checkoutCart();
    onCheckoutPage.confirmSuccessfullOrder();
  });

  // This test should fall, as expected
  it(`#10 tests that quantity of products can't be negative`, () => {
    cy.log('This is a BUG and test is expected to fail');
    onLoginPage.login();
    onMainPage.addProductToCart("macbook Retina 13.3' ME662 (2013)");
    onMainPage.openCart();
    cy.get('input').clear().type('-1');
    cy.get('input').should('not.have.value', '-1');
  });
});

