import foodTrucks from '../../fixtures/foodTrucks.json'  

describe('Successfull scenarios', () => {
    // 1 - Search single establishment by name 

    //Given I access sfgov site
    //And I go to (Economy / Community) Mobile Food Facility Permit section
    //And I go to Data tab
    //And I input a food truck name
    //Then I should be able to see it w/ all its information

    it('Get food truck by name', () => {
      const foodTruckName = foodTrucks[0].__select_alias1__

      cy.api_searchByName(foodTruckName).then(response => {
        expect(response.status).to.be.equal(200);
        expect(response).to.have.property('headers')
        expect(response.headers)
        .to.have
        .property('content-type', 'application/json; charset=utf-8')

        expect(response.body[0]).to.have.property('applicant', foodTruckName);
      })
    })

    // 2 - Test a not existent food truck

    //Given I access sfgov site
    //And I go to (Economy / Community) Mobile Food Facility Permit section
    //And I go to Data tab
    //And I input a not existent food truck search
    //Then I should see receive an empty array w/ passed status 200
    
    it('Get no existent food truck', () => {
      const foodTruckName = "noexistent"

      cy.api_searchByName(foodTruckName).then(response => {
        expect(response.status).to.be.equal(200);
        expect(response).to.have.property('headers')
        expect(response.headers)
        .to.have
        .property('content-type', 'application/json; charset=utf-8')

        expect(response.body).to.be.empty;
      })
    })

    // 3 - Test multi results query 

    //Given I access sfgov site
    //And I go to (Economy / Community) Mobile Food Facility Permit section
    //And I go to Data tab
    //And I input 'pizza' for a food truck search
    //Then I should see all the food trucks that sell pizza

    it('Get multiple food trucks by food name', () => {
      const food = "pizza"

      cy.api_searchByName(food).then(response => {
        expect(response.status).to.be.equal(200);
        expect(response).to.have.property('headers')
        expect(response.headers)
        .to.have
        .property('content-type', 'application/json; charset=utf-8')

        let places = Object.values(response.body)

        places.forEach((place) => {
          place.foodItems.includes(food)
          cy.log("habemus pizza")
        })
      })
    })
  })

    
describe("Error scenarios", () => {
  // 4 - Test empty name entry

  //Given I request a food truck by name
  //And I don´t pass a name
  //Then I should get a 400 status and the error message "The name field is required."
  it('Get food truck by status and empty name', () => {
    const foodTruckName = ""
    const status = "expired"
    const errorMessage = "The name field is required."
    const title = "One or more validation errors occurred."

    cy.api_searchByName(foodTruckName, status).then(response => {
      expect(response.status).to.be.equal(400);
      expect(response).to.have.property('headers')
      expect(response.headers).to.have.property('content-type', 'application/problem+json; charset=utf-8')
      expect(response.body).to.have.property('errors');
      expect(response.body.errors.name[0]).to.be.equal(errorMessage)
      expect(response.body).to.have.property('title');
      expect(response.body.title).to.be.equal(title)
    })
  })


  // 4 - Test an invalid status and correct name

  //Given I request a food truck by name
  //And I pass a wrong status 
  //And an existent name
  //Then I should get a 200 status 
  //And an empty body
  it('Get food truck by name w/ wrong status', () => {
    const foodTruckStatus = "noexistent"
    const foodTruckName = foodTrucks[1].__select_alias1__

    cy.api_searchByName(foodTruckName, foodTruckStatus).then(response => {
      expect(response.status).to.be.equal(200);
      expect(response).to.have.property('headers')
      expect(response.headers)
      .to.have
      .property('content-type', 'application/json; charset=utf-8')

      expect(response.body).to.be.empty;
    })
  })
})