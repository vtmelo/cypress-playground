describe('POST /login', () => {

    var usuarioId;
    
    after(()=>{
        cy.request({
            method: 'DELETE',
            url: `/usuarios/${usuarioId}`})
    })

  it('should return 200 and a token for valid credentials', () => {
    cy.request({
        method: 'POST',
        url: '/usuarios',
        body: {
        "nome": "Fulano da Silva",
        "email": "beltrano@qa.com.br",
        "password": "teste",
        "administrador": "true"
        }
    }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.message).to.eq('Cadastro realizado com sucesso');
        expect(response.body).to.have.property('_id');
        usuarioId = response.body._id;
      });
    }
  );

    it('should return 400 and a token for email already used', () => {
    cy.request({
        method: 'POST',
        url: '/usuarios',
        body: {
        "nome": "Fulano da Silva",
        "email": "beltrano@qa.com.br",
        "password": "teste",
        "administrador": "true"
        }
        ,failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.eq('Este email já está sendo usado');
      });
    }
  );
});