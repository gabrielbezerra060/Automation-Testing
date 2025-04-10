Cypress.Commands.add("api_searchByName", (foodTruckName, foodTruckstatus)  => {
    cy.request({
        url: `/api/mobilefoodtrucks/searchByName`,
        qs: {
            name: foodTruckName,
            status: foodTruckstatus
        },
        failOnStatusCode: false
    })
})



Cypress.Commands.add("api_searchByStreet", (street)  => {
    cy.request({
        url: `/api/mobilefoodtrucks/searchByStreet`,
        qs: {
            street: street
        }
    })
})