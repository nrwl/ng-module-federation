import { getGreeting } from '../support/app.po';

describe('shop', () => {
  beforeEach(() => cy.visit('/shop'));

  it('should display welcome message', () => {
    getGreeting().contains('shop');
  });
});
