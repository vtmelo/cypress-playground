describe('GET /users', () => {

    var userAdmin = {
        "nome": "Usuario Teste",
        "email": "usuarioteste@teste.com",
        "password": "teste",
        "administrador": "true"
    }
    var userNonADmin = {
        "nome": "UsuarioTeste2",
        "email": "usuariotesteNonADMIN@teste.com",
        "password": "teste",
        "administrador": "false"
    }

    var userIdAdmin=null;
    var userIdNonAdmin=null;

    before(() => {
        cy.createUser(userAdmin).then((response) => {
           userIdAdmin = response.body._id;
        });
        cy.createUser(userNonADmin).then((response) => {
           userIdNonAdmin = response.body._id;
        });
    })

    after(() => {
        cy.deleteUser(userIdAdmin);
          cy.deleteUser(userIdNonAdmin);
    })

    it('should return 200 and a list of users', () => {
        cy.request({
            method: 'GET',
            url: '/usuarios'
        }).then((response) => { 
            expect(response.status).to.eq(200);
            expect(response.body.quantidade).to.be.greaterThan(0);
            expect(response.body).to.have.property('usuarios');
            expect(response.body.usuarios).to.be.an('array');
            expect(response.body.usuarios.length).to.be.greaterThan(0);
            response.body.usuarios.some(u => u._id === userIdAdmin);
        })
    });

     it('should return 200 and a list of users using admin filter true', () => {
        cy.request({
            method: 'GET',
            url: '/usuarios?administrador=true'
        }).then((response) => { 
            expect(response.status).to.eq(200);
            expect(response.body.quantidade).to.be.greaterThan(0);
            expect(response.body).to.have.property('usuarios');
            expect(response.body.usuarios).to.be.an('array');
            expect(response.body.usuarios.length).to.be.greaterThan(0);
            response.body.usuarios.some(u => u._id === userIdAdmin);
            response.body.usuarios.forEach(u => expect(u.administrador).to.eq('true'));
        })
    });

      it('should return 200 and a list of users using admin filter false', () => {
        cy.request({
            method: 'GET',
            url: '/usuarios?administrador=false'
        }).then((response) => { 
            expect(response.status).to.eq(200);
            expect(response.body.quantidade).to.be.greaterThan(0);
            expect(response.body).to.have.property('usuarios');
            expect(response.body.usuarios).to.be.an('array');
            expect(response.body.usuarios.length).to.be.greaterThan(0);
            response.body.usuarios.some(u => u._id === userIdNonAdmin);
            response.body.usuarios.forEach(u => expect(u.administrador).to.eq('false'));
        })
    });

    it('should return 200 and a list of users using name filter', () => {
    cy.request({
        method: 'GET',
        url: '/usuarios?nome=UsuarioTeste2'
    }).then((response) => { 
        expect(response.status).to.eq(200);
        expect(response.body.quantidade).to.be.greaterThan(0);
        expect(response.body).to.have.property('usuarios');
        expect(response.body.usuarios).to.be.an('array');
        expect(response.body.usuarios.length).to.be.greaterThan(0);
        response.body.usuarios.some(u => u._id === userIdAdmin);
        response.body.usuarios.forEach(u => expect(u.administrador).to.eq('false'));
        })
    });
    
    it.only('should return 200 and a empty list of users', () => {
    cy.request({
        method: 'GET',
        url: '/usuarios?nome=UnknownName'
    }).then((response) => { 
        expect(response.status).to.eq(200);
        expect(response.body.quantidade).to.be.eq(0);
        expect(response.body).to.have.property('usuarios');
        expect(response.body.usuarios).to.be.an('array');
        expect(response.body.usuarios.length).to.be.eq(0);
        })
    });
});
