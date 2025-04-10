describe('Search By Name', () => {
    it('successfully', () => {
      const foodTruckName = "FRUITYMANIA"
  
      cy.api_searchByName(foodTruckName).then(response => {
        expect(response.status).to.be.equal(200);
      })


    })
        
  })