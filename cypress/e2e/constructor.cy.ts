describe('тестируем конструктор', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4000');
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
  });
  describe('тестируем добавление ингредиентов в конструктор', () => {
    it('добавление ингредиентов в конструктор', () => {
      cy.get('[data-cy = "Флюоресцентная булка R2-D3"]')
        .children('button')
        .click({ force: true });
      cy.get('[data-cy = "Соус традиционный галактический"]')
        .children('button')
        .click({ force: true });
      cy.get('[data-cy = "Плоды Фалленианского дерева"]')
        .children('button')
        .click({ force: true });
    });
  });
  describe('тестируем работу модальных окон', () => {
    it('открытие модального окна ингредиента', () => {
      cy.get('[data-cy = "Флюоресцентная булка R2-D3"]').click();
      cy.get('[data-cy = "modal"]').should(
        'contain.text',
        'Детали ингредиента'
      );
    });
    it('тестируем отображение в модальном окне ингредиента, по которому произошел клик', () => {
      cy.get('[data-cy = "Говяжий метеорит (отбивная)"]').click();
      cy.get('[data-cy = "modal"]').should(
        'contain.text',
        'Детали ингредиента'
      );
      cy.get('[data-cy = "modal"]').should(
        'contains.text',
        'Говяжий метеорит (отбивная)'
      );
      cy.get('[data-cy = "modal"]').should('contains.text', 'Калории, ккал');
      cy.get('[data-cy = "modal"]').should('contains.text', '2674');
    });
    it('закрытие модального окна ингридиента по клику на крестик', () => {
      cy.get('[data-cy = "Флюоресцентная булка R2-D3"]')
        .click()
        .children('button')
        .click({ force: true });
    });
    it('закрытие модального окна ингридиента по клику на оверлей', () => {
      cy.get('[data-cy = "Флюоресцентная булка R2-D3"]').click();
      cy.contains('Конструктор').click({ force: true });
      cy.contains('Детали ингредиента').should('not.exist');
    });
  });
});
