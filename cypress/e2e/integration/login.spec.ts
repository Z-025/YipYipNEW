describe('Login Page Tests', () => {
    const testUser = { username: 'testuser', password: '1234' };
  
    beforeEach(() => {
      // Visit the login page
      cy.visit('http://localhost:8100/login');
  
      // Insert the test user into the storage
      cy.window().then((win) => {
        win.DbService.insertUsuario(testUser);
      });
    });
  
    it('should log in with valid credentials', () => {
      cy.get('input[name="username"]').type(testUser.username);
      cy.get('input[name="password"]').type(testUser.password);
      cy.get('ion-button').contains('Iniciar sesión').click();
  
      cy.url().should('include', '/home'); // Check navigation to home
      cy.window().then((win) => {
        expect(win.localStorage.getItem('username')).to.eq(testUser.username);
        expect(win.localStorage.getItem('sesion_activa')).to.eq('SI');
      });
    });
  
    it('should show alert for invalid credentials', () => {
      cy.get('input[name="username"]').type('invaliduser');
      cy.get('input[name="password"]').type('wrongpassword');
      cy.get('ion-button').contains('Iniciar sesión').click();
  
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Usuario o contraseña incorrectos');
      });
    });
  });
  