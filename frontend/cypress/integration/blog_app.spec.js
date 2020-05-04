describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "Robie Gonzales",
      username: "robie123",
      password: "password",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("http://localhost:3000/");
  });

  it("Login form is shown", function () {
    cy.contains("Login");
  });

  it("Login form can be opened", function () {
    cy.contains("Login").click();
  });

  describe("Logging in", function () {
    it("User can log in", function () {
      cy.contains("Login").click();
      cy.get("#username").type("robie123");
      cy.get("#password").type("password");
      cy.get("#login").click();

      cy.contains("Welcome Robie");
    });

    it("Login fails with wrong password", function () {
      cy.contains("Login").click();
      cy.get("#username").type("robie123");
      cy.get("#password").type("wrong");
      cy.get("#login").click();

      cy.get(".error").should("contain", "Wrong credentials");
      cy.get("html").should("not.contain", "Welcome Robie");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "robie123", password: "password" });
    });

    it("A new blog can be added", function () {
      cy.contains("Add New Blog").click();
      cy.get(".titleInput").type("a new blog");
      cy.get(".authorInput").type("a new author");
      cy.get(".urlInput").type("a new url");

      cy.contains("Add Blog").click();
      cy.contains("Added new blog!");
    });

    describe("A blog exists", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "A new blog",
          author: "THE author",
          url: "Google",
        });
      });

      it("Blog can be liked", function () {
        cy.contains("Show").click();
        cy.contains("Like").click();

        cy.contains("1 likes");
      });
    });
  });
});
