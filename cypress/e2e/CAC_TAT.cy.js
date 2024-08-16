describe('Central de Atendimento CAC-TAT', () => {

  beforeEach(() => {
    cy.visit('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
  })

  it('Verifica o titulo da aplicação', () => {
    cy.title().should('be.equals', 'Central de Atendimento ao Cliente TAT')
  })

  it('Preenche os campos obrigátorios e envia o formulário', () => {
    cy.get('#firstName').type("Alan");
    cy.get('#lastName').type("Pedon");
    cy.get('#email').type("alan@email.com");
    cy.get('#open-text-area').type("Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis ad sunt alias iure molestiae recusandae iste ex commodi est laboriosam?");

    cy.get('button[type="submit"]').click();
    cy.get('.success').should('be.visible');
    cy.get('.error').not('be.visible')
  })

  it("Exibe mensagem de erro ao submeter o forulário com um email com formatação inválida", () => {
    cy.get('#firstName').type("Alan");
    cy.get('#lastName').type("Pedon");
    cy.get('#email').type("alan@emailcom");
    cy.get('#open-text-area').type("Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis ad sunt alias iure molestiae recusandae iste ex commodi est laboriosam?");

    cy.get('button[type="submit"]').click();
    cy.get('.success').not('be.visible');
    cy.get('.error').should('be.visible');
  }) 

  it('Não altera o texto do campo telefone quando o digitado caracteres diferentes de números', () => {
    cy.get('#phone').type("Alan");
    cy.get('#phone').should('have.value', "")
  })

  it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('button[type="submit"]').click();
    cy.get('.success').not('be.visible');
    cy.get('.error').should('be.visible');
  })

  it('Envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()
  })

  it('Seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product').select("mentoria").should('have.value', 'mentoria');
  })

  it('Seleciona um produto (Blog) por seu indice (index)', () => {
    cy.get('#product').select(1).should('have.value', 'blog');
  })

  it('Marca o tipo de atendimento "Feedback', () => {
    cy.get('input[type="radio"][value="feedback"]').check()
  })

  it('Marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]').should('have.length', 3).each( $radio => {
      cy.wrap($radio).check()
      cy.wrap($radio).should('be.checked')
    });
  })

  it('Testa se o input file aceita arquivos', () => {
    cy.get('#file-upload').should('not.have.value').selectFile('cypress/fixtures/example.json', {
      action: "drag-drop"
    })
  })

})