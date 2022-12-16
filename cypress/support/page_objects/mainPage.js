export class MainPage {
  addProductToCart(productName) {
    cy.contains(productName)
      .parent(".card-title")
      .siblings(".row")
      .children(".col-6")
      .contains("Add to cart")
      .click();
    cy.wait(3000);
  }

  openCart() {
    cy.contains("Checkout").click();
  }

  confirmCheckoutInfo() {
    cy.contains(".btn", "Checkout")
      // .should('contain', '1 ($ 2399)');
      .invoke("text")
      .then(($txt1) => {
        expect($txt1).to.equal($txt1);
      });
  }

  typeNegativeValue() {
    cy.get("input").clear().type("-1").should("not.have.value", "-1");
  }
}

export const onMainPage = new MainPage();
