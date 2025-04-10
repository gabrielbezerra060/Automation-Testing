import foodTrucks from '../../fixtures/foodTrucks.json'  

describe('Successfull scenarios', () => {
    // 1 - Search establishment by lat and long 
    //Given I want to request a food truck by long and lat
    //And I pass the correct coordinates
    //And I don't specify the status
    //Then I should be able the food trucks on that street
    it('Get food truck by geo localization', () => {
      const foodTruck = foodTrucks[3]
      const latitude = foodTruck.__select_alias14__
      const longitude = foodTruck.__select_alias15__
      const status = foodTruck.__select_alias10__

      cy.api_nearestFoodTrucks(latitude, longitude).then(response => {
        expect(response.status).to.be.equal(200);
        expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8')

        expect(response.body[0]).to.have.property('address');
        expect(response.body[0]).to.have.property('applicant');
        expect(response.body[0]).to.have.property('facilityType');
        expect(response.body[0]).to.have.property('foodItems');
        expect(response.body[0]).to.have.property('id');
        expect(response.body[0]).to.have.property('latitude');
        expect(response.body[0]).to.have.property('longitude');
        expect(response.body[0]).to.have.property('status');
      })
    });

    // 2 - Test a not existent geo localization
    //Given I want to request a food truck by long and lat
    //And I pass inexistents coordinates
    //And I don't specify the status
    //Then I should be able to see the approved food trucks with no geo localizations yet
    it('Get no existent geo localization', () => {
      const latitude = -90909090
      const longitude = 10999999

      cy.api_nearestFoodTrucks(latitude, longitude).then(response => {
        expect(response.status).to.be.equal(200);
        expect(response).to.have.property('headers')
        expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8')

        let places = Object.values(response.body)

        places.forEach((place) => {
          if(place.status !== "APPROVED"){
            throw new Error("Not approved items")
          }

          if(place.latitude !== 0 && place.longitude !== 0){
            throw new Error("Not found items")
          } 
        })
      })
    });
});

describe("Error scenarios", () => {
    // 3 - Test a not existent geo localization
    //Given I want to request a food truck by long and lat
    //And I pass unvalid coordinates
    //And I don't specify the status
    //Then I should receive a 400 status and an error message
    it('Get no existent geo localization', () => {
      const latitude = "asd"
      const longitude = 10999999
      const errorMessage = "The value 'asd' is not valid."
      const title = "One or more validation errors occurred."

      cy.api_nearestFoodTrucks(latitude, longitude).then(response => {
        expect(response.status).to.be.equal(400);
        expect(response).to.have.property('headers')
        expect(response.headers).to.have.property('content-type', 'application/problem+json; charset=utf-8')
        expect(response.body).to.have.property('errors');
        expect(response.body.errors.latitude[0]).to.be.equal(errorMessage)
        expect(response.body).to.have.property('title');
        expect(response.body.title).to.be.equal(title)
      })
    })

    // 4 - Test an invalid longitude
    //Given I want to request a food truck by long and lat
    //And I pass unvalid coordinates
    //And I don't specify the status
    //Then I should receive a 400 status and an error message
    it('Missing parameter', () => {
      const latitude = 999999
      const longitude = undefined
      const errorMessage = "The value '' is invalid."
      const title = "One or more validation errors occurred."

      cy.api_nearestFoodTrucks(latitude, longitude).then(response => {
        expect(response.status).to.be.equal(400);
        expect(response).to.have.property('headers')
        expect(response.headers).to.have.property('content-type', 'application/problem+json; charset=utf-8')
        expect(response.body).to.have.property('errors');
        expect(response.body.errors.longitude[0]).to.be.equal(errorMessage)
        expect(response.body).to.have.property('title');
        expect(response.body.title).to.be.equal(title)
      })
    })
});