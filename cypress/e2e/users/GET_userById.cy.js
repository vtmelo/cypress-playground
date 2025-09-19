describe('GET /user{id}', () => {
    var user = {
        "nome": "Usuario Teste",
        "email": "usuarioteste@teste.com",
        "password": "teste",
        "administrador": "true"
    }
   var userId=null;

    before(() => {
        cy.createUser(user).then((response) => {
           userId = response.body._id;
        });
    })

    after(() => {
        cy.deleteUser(userId);
    })

    it('should return 200 and a specified user', () => {
        cy.request({
            method: 'GET',
            url: `/usuarios/${userId}`
        }).then((response) => { 
            expect(response.status).to.eq(200);
            expect(response.body.nome).to.eq(user.nome);
            expect(response.body.email).to.eq(user.email);
            expect(response.body._id).to.eq(userId);
            expect(response.body.administrador).to.eq(user.administrador);
        })
    });

    it('should return 400 and for invalid ID format', () => {
    cy.request({
        method: 'GET',
        url: `/usuarios/InvalidID`,
        failOnStatusCode: false
    }).then((response) => { 
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('id')
        expect(response.body.id).to.be.equal('id deve ter exatamente 16 caracteres alfanuméricos')
    })
    });

    it('should return 400 for user not found', () => {
    cy.request({
        method: 'GET',
        url: `/usuarios/0000000000000000`,
      failOnStatusCode: false
    }).then((response) => { 
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('message')
        expect(response.body.message).to.be.equal('Usuário não encontrado')
    })
    });
});
