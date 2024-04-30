import login from '../fixtures/login.json';

describe('тестируем процесс создания заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
    localStorage.setItem('refreshToken', login.refreshToken);
    cy.setCookie('accessToken', login.accessToken);
  });
  afterEach(() => {
    localStorage.clear();
    cy.clearCookies();
  });
  it('тестируем авторизацию', () => {
    cy.visit('http://localhost:4000');
    cy.contains('Личный кабинет').click();
    cy.contains('E-mail').type('ya873478@ya.ru');
    cy.contains('Пароль').type('123qaz');
    cy.contains('Войти').click();
    cy.get('[data-cy="userName"]').should('contain.text', 'Жак-Ив Кусто');
  });
  it('тестируем оформление заказа', () => {
    cy.intercept('GET', 'api/auth/user', { fixture: 'login.json' });
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' });
    cy.visit('http://localhost:4000/');
    cy.get('[data-cy = "Флюоресцентная булка R2-D3"]')
      .children('button')
      .click({ force: true });
    cy.get('[data-cy = "Филе Люминесцентного тетраодонтимформа"]')
      .children('button')
      .click({ force: true });
    cy.get('[data-cy = "Хрустящие минеральные кольца"]')
      .children('button')
      .click({ force: true });
    cy.get('[data-cy = "Мини-салат Экзо-Плантаго"]')
      .children('button')
      .click({ force: true });
    cy.get('button').contains('Оформить заказ').click();
    cy.contains('идентификатор заказа').should('be.visible');
    cy.get('[data-cy="orderNumber"]').should('contain.text', '38927');
    cy.get('[data-cy="closeModal"]').click();
    cy.contains('идентификатор заказа').should('not.exist');
    cy.get('[data-cy="totalPrice"]').should('contain.text', '0');
  });
});
