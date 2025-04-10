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
        },
        failOnStatusCode: false
    })
})

Cypress.Commands.add("api_nearestFoodTrucks", (lat, long, stts)  => {
    cy.request({
        url: `/api/mobilefoodtrucks/nearestFoodTrucks`,
        qs: {
            latitude: lat,
            longitude: long,
            status: stts
        },
        failOnStatusCode: false
    })
})
