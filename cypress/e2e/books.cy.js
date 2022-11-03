describe('Books', () => {
  it('can list, show, create, edit and delete books', () => {
    // List books
    cy.visit('/')
      .get('.Home_container__bCOhY > :nth-child(2)').click()

    // Create book
    cy.get('[href="/libros/crear"]').click()
      .get('#title').type('Cypress Book')
      .get('button').contains('Crear').click()
      .get('table').contains('Cypress Book')

    // View book
    cy.get('[data-cy^=link-to-visit-book-]').last().click()
      .get('h3').should('contain.text', 'Cypress Book')
      .get('[href="/libros"]').click()

    // Edit book
    cy.get('[data-cy^=link-to-edit-book-]').last().click()
      .get('#title').clear().type('Cypress Book Edited')
      .get('button').contains('Actualizar').click()
      .get('table').contains('Cypress Book Edited')

    // Delete book
    cy.get('[data-cy^=link-to-delete-book-]').last().click()
      .get('table').should('not.contain.text', 'Cypress Book Edited')
  })
})