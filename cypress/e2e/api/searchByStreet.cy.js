describe.skip('Search By Street', () => {
    it('successfully', () => {
      const street = "225 BUSH ST"
  
      cy.api_searchByStreet(street).then(response => {
        expect(response.status).to.be.equal(200);
      })
    })
  })