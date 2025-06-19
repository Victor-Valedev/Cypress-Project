/// <reference types="cypress" />

import { format, prepareLocalStorage } from '../../support/utils';
//- entender o fluxo manualmente.
//- mapear os elementos que vamos interagir.
//- descrever as interações com cypress.
//- adicionar as asserções que a gente precisa.

// Com a otimização dos testes, a execução foi de 3s para 674ms

// Mobile web
// cy.viewport
// arquivos de config
// configs por linha de comando

context('Dev finance agilizei', () => {
    // hooks:
    // Trechos que executam antes e depois do teste.
    // before -> antes de todos os testes.
    // beforeEach -> antes de cada teste.
    // after -> depois de todos os testes.
    // afterEach -> depois de cada teste.
    beforeEach(() => {
        //visitando a url que contém os elementos.
        cy.visit('https://dev-finance.netlify.app/', {
            onBeforeLoad: (win) => { //// Inserindo dados no localStorage antes de carregar a página.
                prepareLocalStorage(win);// Passando a função com os parâmetros colocados no arquivo utils.js.
            }
        }); 
         //cy.get('#data-table tbody tr').should('have.length', 0);//Tamanho da tabela quando entra no site.
    });

    //Cadastrar entradas.
    it('Cadastrar entradas', () => {
        cy.get('#transaction .button').click(); //id + class
        cy.get('#description').type('Mesada'); //id
        cy.get('[name="amount"]').type(50); //atributos
        cy.get('[type=date]').type('2024-12-24'); //atributos
        cy.get('button').contains('Salvar').click(); //tipo e valor
        cy.get('#data-table tbody tr').should('have.length', 3);//Tamanho da tabela depois de salvar uma transação.
    });

    //Cadastrar saídas.
    it('Cadastrar saídas', () => {
        //forçando error
        cy.get('').click(); //id + class
        cy.get('#description').type('Chocolate'); //id
        cy.get('[name="amount"]').type(-10); //atributos
        cy.get('[type=date]').type('2024-12-24'); //atributos
        cy.get('button').contains('Salvar').click(); //tipo e valor

        cy.get('#data-table tbody tr').should('have.length', 3);//Tamanho da tabela depois de salvar uma transação.
    });

    //Remover entradas e saídas.
    it('Remover entradas e saídas', () => {
       /*  const entrada = 'Mesada';
        const saida = 'Cortina';


        cy.get('#transaction .button').click(); //id + class
        cy.get('#description').type(entrada); //id
        cy.get('[name="amount"]').type(100); //atributos
        cy.get('[type=date]').type('2024-12-24'); //atributos
        cy.get('button').contains('Salvar').click(); //tipo e valor

        cy.get('#transaction .button').click(); //id + class
        cy.get('#description').type(saida); //id
        cy.get('[name="amount"]').type(-35); //atributos
        cy.get('[type=date]').type('2024-12-24'); //atributos
        cy.get('button').contains('Salvar').click(); //tipo e valor
 */
        //estratégia 1: voltar para o elemento pai, e avançar para um td img attr.

        cy.get('td.description')
          .contains("Mesada")
          .parent()
          .find('img[onclick*=remove]')
          .click();

        //estratégia 2: buscar todos os irmãos, e especificar o que tem img + attr.

        cy.get('td.description')
          .contains("Suco Kapo")
          .siblings()
          .children('img[onclick*=remove]')
          .click();
        
          cy.get('#data-table tbody tr').should('have.length', 0);
    });

    it('Validar saldo com diversas transações', () => {

        /* const entrada = 'Mesada';
        const saida = 'Cortina';

        cy.get('#transaction .button').click(); //id + class
        cy.get('#description').type(entrada); //id
        cy.get('[name="amount"]').type(100); //atributos
        cy.get('[type=date]').type('2024-12-24'); //atributos
        cy.get('button').contains('Salvar').click(); //tipo e valor

        cy.get('#transaction .button').click(); //id + class
        cy.get('#description').type(saida); //id
        cy.get('[name="amount"]').type(-35); //atributos
        cy.get('[type=date]').type('2024-12-24'); //atributos
        cy.get('button').contains('Salvar').click(); //tipo e valor */

        //Capturar as linhas com as transações e as colunas com valores.
        //Caputurar o texto dessas colunas.
        //Formatar os valores das linhas.

        //Somar os valores de entradas e saídes.

        //Capturar o texto do total.
        //Comparar o somatório de entradas e despesas com o total.

        //inicializar as variáveis entrada e saída.
        let incomes = 0;
        let expenses = 0;
        
        //Seleciona todas as linhas da tabela pelo ID 
        cy.get('#data-table tbody tr') 
          .each(($el, index, $list) => { //$el é o elemento atual, index é indice, $list a lista de todos os elementos.
            //cy.log(index);

            //Para cada linha, busca o elemento com a classe income ou expense.
            cy.get($el).find('td.income, td.expense') 
              .invoke('text') //valor que contém no elemento.
              .then(text => {
                //Verifica se o texto tem o sinal negativo.
                if(text.includes('-')){
                    expenses = expenses + format(text); //caso seja uma saída, soma o valor formatado à variável expenses.
                } else {
                    incomes = incomes + format(text); //caso contrário, soma o valor à variável incomes.
                }
                  cy.log(`entradas:`, expenses);
                  cy.log(`saidas:`, incomes);

              }); 
         });

         //Seleciona o elemento que exibe o valor total.
         cy.get('#totalDisplay').invoke('text')
           .then(text => {
            //cy.log(`valor total`, format(text));

            //convertendo o valor total para um número formatado.
            let formattedTotalDisplay = format(text);
            //calcula o total, somando as entradas e saídas.
            let expectedTotal = incomes + expenses;

            //faz a verificação para garantir que o valor exibido na interface é igual ao valor calculado(entradas + saídas).
            expect(formattedTotalDisplay).to.eq(expectedTotal);
         });
    });
});