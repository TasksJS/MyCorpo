/// <reference types="cypress" />
const { eq } = require("cypress/types/lodash");

context("Actions", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/connect");
  });

  // https://on.cypress.io/interacting-with-elements

  it(".type() - type into a DOM element", () => {
    // https://on.cypress.io/type

    // Connect to the app
    cy.get('input[name="login"]').type("steven").should("have.value", "steven");

    cy.get('input[name="password"]')
      .type("azerty")
      .should("have.value", "azerty");

    cy.get('button[name="btn-login"]').click();

    // Testing events page
    cy.wait(500);

    cy.get("button.v-app-bar__nav-icon").click();

    cy.get('a[href*="events"]').click();

    cy.get("form").within(() => {
      cy.get('input[name="title"]').type("Réparer la RX8");
      cy.get('input[name="description"]').type("Prévoir des outils");
    });

    // Suppression
    cy.get("button.delete").click();
  });
});
