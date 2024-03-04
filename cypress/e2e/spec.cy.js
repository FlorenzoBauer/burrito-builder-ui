describe("This is the test for the mod assessment", () => {
  beforeEach(() => {
    cy.visit("localhost:3000");
    cy.intercept('http://localhost:3001/api/v1/orders', {
      statusCode: 200,
      body: { orders: [
        {
          id: 1,
          name: 'bob',
          ingredients: ['happy', 'joy', 'not-sad']
        },
        {
          id: 2,
          name: 'sally',
          ingredients: ['sad', 'depressed', 'sad']
        }
      ]}
    }).as('apiRequest');
    cy.wait('@apiRequest');
  });

  it("should see ingredients on load", () => {
    cy.get('.order-name').eq(0).should('contain', 'bob');
    cy.get('.ingredient-name').eq(0).should('contain', 'happy');
    cy.get('.ingredient-name').eq(1).should('contain', 'joy');
    cy.get('.order-name').eq(1).should('contain', 'sally');
    cy.get('.ingredient-name').eq(3).should('contain', 'sad');
    cy.get('.ingredient-name').eq(4).should('contain', 'depressed');
  });

  it("should check if the form is loaded on the page", () => {
    cy.get('form').should('exist');
    cy.get('.form-name').should('exist');
    cy.get('.guacamole-btn').should('exist');
    cy.get('.steak-btn').should('exist');
    cy.get('.lettuce-btn').should('exist');
    cy.get('.submit-btn').should('exist');
  });

  it('should be able to submit an order', () => {
    cy.get('.form-name').type('fred');
    cy.get('.steak-btn').click();
    cy.get('.guacamole-btn').click();
    cy.get('.submit-btn').click();
    cy.get('.order-name').eq(2).should('contain', 'fred');
    cy.get('.ingredient-name').eq(6).should('contain', "steak");
    cy.get('.ingredient-name').eq(7).should('contain', "guacamole");
  });

  it('should not be able to submit a form without a name', () => {
    cy.get('.steak-btn').click();
    cy.get('.guacamole-btn').click();
    cy.get('.submit-btn').click();
    cy.get('.order-name').should('have.length', 2);
  });

  it('should not be able to submit a form without ingredients', () => {
    cy.get('.form-name').type('fred');
    cy.get('.submit-btn').should('be.disabled');
    cy.get('.order-name').should('have.length', 2);
  });
});
