/*describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user={ username: 'crispussia',name: 'Degbelo Crispussia',password: 'cris@2000' }
    const user2={ username: 'root',name: 'SuperUser',password: 'sekret' }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })
  describe('Login',function() {

    it('fails with wrong credentials', function() {
      cy.get('#username')
        .type('crispussia')
      cy.get('#password')
        .type('cris')
      cy.get('#login-button')
        .click()
      cy.get('.error')
        .contains('Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
    it('succeeds with correct credentials', function() {
      cy.get('#username')
        .type('crispussia')
      cy.get('#password')
        .type('cris@2000')
      cy.get('#login-button')
        .click()
      cy.contains('Degbelo Crispussia logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'crispussia', password: 'cris@2000' })
    })

    it('A blog can be created', function() {
      cy.get('#username')
        .type('crispussia')
      cy.get('#password')
        .type('cris@2000')
      cy.get('#login-button')
        .click()
      cy.contains('Degbelo Crispussia logged in')

      cy.contains('new blog')
        .click()
      cy.get('#title')
        .type('a blog created by cypress')
      cy.get('#author')
        .type('Crispussia Degbelo')
      cy.get('#url')
        .type('www.cypress.com')
      cy.get('#create')
        .click()

      cy.contains('a blog created by cypress Crispussia Degbelo')
    })

    describe('and blogs exist', function () {
      beforeEach(function () {
        cy.get('#username')
          .type('crispussia')
        cy.get('#password')
          .type('cris@2000')
        cy.get('#login-button')
          .click()
        cy.contains('Degbelo Crispussia logged in')

        cy.createBlog({
          title: 'another blog cypress',
          author: 'Jean Luc',
          url: 'http://cris.fr'
        })
        cy.createBlog({
          title: 'another blog cypress 2',
          author: 'Jean Luc2',
          url: 'http://cris2.fr'
        })
      })

      it('any of those can be liked', function () {
        cy.get('#view')
          .click()
        cy.get('#like')
          .click()
        cy.contains('another blog cypress')
          .contains('Jean Luc')
          .contains('http://cris.fr')
          .contains(1)
      })
      it('user who created the blog can delete it', function () {
        cy.contains('another blog cypress 2')
          .parent()
          .find('#view')
          .click()
        cy.contains('another blog cypress 2')
          .parent()
          .find('#remove')
          .click()
        cy.get('form')
          .parent()
          .should('not.contain', 'another blog cypress 2')
      })

      describe('other user', function () {
        beforeEach(function () {
          cy.get('#logout')
            .click()
          cy.login({ username: 'root', password: 'sekret' })
          cy.get('#username')
            .type('root')
          cy.get('#password')
            .type('sekret')
          cy.get('#login-button')
            .click()
          cy.contains('SuperUser logged in')
          cy.createBlog({
            title: 'another blog cypress 3',
            author: 'Jean Luc3',
            url: 'http://cris3.fr'
          })
        })

        it('other users cannot delete the blog', function () {
          cy.contains('another blog cypress')
            .parent().find('#view')
            .click()
            .should('not.contain', '#remove')
        })
        it('other users can delete the blog that it create', function () {
          cy.contains('another blog cypress 3')
            .parent().find('#view')
            .click()
            .parent()
            .find('#remove')
        })
      })

    })
  })
})*/

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Degbelo Crispussia',
      username: 'crispussia',
      password: 'cris@2000'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    const user2 = {
      name: 'SuperUser',
      username: 'root',
      password: 'sekret'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login').click()
  })

  it('succeeds with correct credentials', function() {
    cy.get('#username').type('crispussia')
    cy.get('#password').type('cris@2000')
    cy.get('#login-button').click()
    cy.contains('Degbelo Crispussia logged in')
    cy.get('#logout').click()
  })

  it('fails with wrong credentials', function() {
    cy.get('#username').type('crispussis')
    cy.get('#password').type('cris')
    cy.get('#login-button').click()
    cy.get('.error')
      .contains('Wrong username or password')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'crispussia', password: 'cris@2000' })
      cy.get('#username').type('crispussia')
      cy.get('#password').type('cris@2000')
      cy.get('#login-button').click()
    })
    it('A blog can be created', function() {
      cy.createBlog({
        title: 'a blog created by cypress',
        author: 'Crispussia Degbelo',
        url: 'https://cris.fr'
      })
      cy.contains('a blog created by cypress Crispussia Degbelo')
    })
    it('user can like blog', function() {
      cy.createBlog({
        title: 'another blog cypress',
        author: 'Jean Luc',
        url: 'http://cris.fr'
      })
      cy.contains('another blog cypress Jean Luc')
      cy.get('#view').click()
      cy.get('#like').click()
      cy.contains('1')
    })
    it('user who created the blog can delete it', function() {
      cy.createBlog({
        title: 'another blog cypress 2',
        author: 'Jean Luc2',
        url: 'http://cris2.fr'
      })
      cy.contains('another blog cypress 2 Jean Luc2')
      cy.get('#view').click()
      cy.get('#remove').click()
    })
    it('other users cannot delete the blog', function() {
      cy.createBlog({
        title: 'another blog cypress 3',
        author: 'Jean Luc3',
        url: 'http://cris3.fr'
      })
      cy.contains('another blog cypress 3 Jean Luc3')
      cy.get('#logout').click()
      cy.visit('http://localhost:3000')
      cy.get('#username').type('root')
      cy.get('#password').type('sekret')
      cy.get('#login-button').click()
      cy.get('#view').click()
        .parent()
        .should('not.contain', '#remove')
      cy.get('#logout').click()
    })
    it('other users can delete the blog that it create', function () {
      //cy.get('#logout').click()
      cy.get('#logout')
        .click()
      cy.login({ username: 'root', password: 'sekret' })
      cy.get('#username').type('root')
      cy.get('#password').type('sekret')
      cy.get('#login-button').click()

      cy.createBlog({
        title: 'another blog cypress 4',
        author: 'Jean Luc4',
        url: 'http://cris4.fr'
      })
      cy.contains('another blog cypress 4')
        .parent().find('#view')
        .click()
        .parent()
        .find('#remove')
    })
    it(' the blogs are ordered according to likes with the blog with the most likes being first', function() {
      cy.createBlog({ title:'The title with the most likes ',author:'Crispussia Degbelo',url:'https://fullstackopen.com/en/part5/end_to_end_testing',likes:12 })
      cy.createBlog({ title:'The title with the second most likes',author:'Crispussia Degbelo',url:'https://fullstackopen.com/en/part5/end_to_end_testing',likes:5 })
      cy.get('.blog').eq(0).should('contain', 'The title with the most likes')
      cy.get('.blog').eq(1).should('contain', 'The title with the second most likes')
    })
  })
})