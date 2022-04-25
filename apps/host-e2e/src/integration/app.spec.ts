import { getGreeting } from '../support/app.po';

describe('host', () => {
  beforeEach(() => cy.visit('/'));

  it('smoke test', () => {
    // Function helper example, see `../support/app.po.ts` file

    getGreeting().contains('Store');
  });
});
