export class MainPage {
  
  addProductToCart(productName) {
    cy.contains(productName)
    .parent('.card-title')
    .siblings('.row')
    .children('.col-6')
    .contains('Add to cart').click()
    cy.wait(3000)
  }

  openCart() {
    cy.contains('Checkout').click()
  }
}

export const onMainPage = new MainPage();
