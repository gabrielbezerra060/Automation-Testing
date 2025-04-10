Cypress.Commands.add("api_searchByName", (foodTruckName)  => {
    cy.request({
        url: `/api/mobilefoodtrucks/searchByName`,
        qs: {
            name: foodTruckName
        }
    })
})