import foodTrucks from '../../fixtures/foodTrucks.json'  

describe('Successfull scenarios', () => {
    // 1 - Search single establishment by street 
    //Given I access sfgov site
    //And I go to (Economy / Community) Mobile Food Facility Permit section
    //And I go to Data tab
    //And I input a street name
    //Then I should be able the food trucks on that street

    it('Get food truck by address', () => {
      const foodTruck = foodTrucks[0]

      cy.api_searchByStreet(foodTruck.__select_alias5__).then(response => {
        expect(response.status).to.be.equal(200);
        expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8')

        expect(response.body[0]).to.have.property('address', foodTruck.__select_alias5__);
        expect(response.body[0]).to.have.property('applicant', foodTruck.__select_alias1__);
        expect(response.body[0]).to.have.property('facilityType', foodTruck.__select_alias2__);
        expect(response.body[0]).to.have.property('foodItems', foodTruck.__select_alias11__);
        expect(response.body[0]).to.have.property('id');
        expect(response.body[0]).to.have.property('latitude', foodTruck.__select_alias23__.latitude);
        expect(response.body[0]).to.have.property('longitude', foodTruck.__select_alias23__.longitude);
        expect(response.body[0]).to.have.property('status', foodTruck.__select_alias10__);
      })
    });

    // 2 - Test a not existent street
    //Given I access sfgov site
    //And I go to (Economy / Community) Mobile Food Facility Permit section
    //And I go to Data tab
    //And I input a non existent street name
    //Then I should receive a 200 status w/ an empty body
    
    it('Get no existent street', () => {
      const street = "fakeStreet"

      cy.api_searchByStreet(street).then(response => {
        expect(response.status).to.be.equal(200);
        expect(response).to.have.property('headers')
        expect(response.headers)
        .to.have
        .property('content-type', 'application/json; charset=utf-8')

        expect(response.body).to.be.empty;
      })
    });

    // 3 - Test multi results query 

    //Given I access sfgov site
    //And I go to (Economy / Community) Mobile Food Facility Permit section
    //And I go to Data tab
    //And I input 'pizza' for a food truck search
    //Then I should see all the food trucks that sell pizza

    it('Get multiple food trucks by street', () => {
      const commonStreet = "1 MARKET ST"

      cy.api_searchByStreet(commonStreet).then(response => {
        expect(response.status).to.be.equal(200);
        expect(response).to.have.property('headers')
        expect(response.headers)
        .to.have
        .property('content-type', 'application/json; charset=utf-8')

        let places = Object.values(response.body)

        places.forEach((place) => {
          place.address.includes(commonStreet)
        })
      })
    });
});

describe("Error scenarios", () => {
  // 4 - Test empty name entry

  //Given I request a food truck by street
  //And I don´t pass a street
  //Then I should get a 400 status and the error message "The street field is required."
  it('Get food truck by empty street', () => {
    const errorMessage = "The street field is required."
    const title = "One or more validation errors occurred."

    cy.api_searchByStreet().then(response => {
      expect(response.status).to.be.equal(400);
      expect(response).to.have.property('headers')
      expect(response.headers).to.have.property('content-type', 'application/problem+json; charset=utf-8')
      expect(response.body.errors.street[0]).to.be.equal(errorMessage)
      expect(response.body).to.have.property('title');
      expect(response.body.title).to.be.equal(title)
    })
  });
});