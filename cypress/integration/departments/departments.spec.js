import mockData from "../mockData";

const getCreateDepartmentLink = () => cy.get('[data-testid=create-department-link]');
const getHeader = (index) => cy.get(`[data-testid=table-header-${index}]`);
const getCell = (row, column) => cy.get(`[data-testid=table-row-${row}-column-${column}]`)
const getEditLink = (rowId) => cy.get(`[data-testid=row-${rowId}-edit-link]`);
const getDeleteButton = (rowId) => cy.get(`[data-testid=row-${rowId}-delete-button]`);

const getDepartmentNameField = () => cy.get('[data-testid=create-department-name]');
const getSaveButton = () => cy.get('[data-testid=create-department-save-button]');

const getToastDismissIcon = () => cy.get('.react-toast-notifications__toast__dismiss-icon');
context("Departments", () => {

    beforeEach(() => {
        cy.server();

        cy.route("GET", "http://localhost:8080/api/orgchart/depts", mockData.departments).as("departments");

        cy.visit("http://localhost:3000/departments");
        cy.wait("@departments");
    });

    it("successfully creates a new department with all the fields filled out", () => {
        cy.route("POST", "http://localhost:8080/api/orgchart/depts", {}).as("save");
        getCreateDepartmentLink().click();

        getDepartmentNameField().type("Delivery");


        getSaveButton().click();

        cy.wait("@save").should((xhr) => {
            expect(xhr.requestBody).to.have.property("name", "Delivery");
            expect(xhr.requestBody).to.have.property("isActive", true);

            expect(xhr.requestHeaders).to.have.property('Content-Type', "application/json");
        });

        getDepartmentNameField().should('have.value', '');

    });

    it("unsuccessfully creates a new department with all the fields filled out", () => {
        cy.route({
            method: "POST",
            url: "http://localhost:8080/api/orgchart/depts",
            response: {},
            status: 400
        }).as("save");
        getCreateDepartmentLink().click();

        getDepartmentNameField().type("Delivery");


        getSaveButton().click();

        cy.wait("@save").its('status').should('eq', 400)

        getDepartmentNameField().should('have.value', 'Delivery');

        getToastDismissIcon().should('be.visible');
        getToastDismissIcon().click();

    });

    it("loads the list of employees into the table", () => {
        getHeader('department-name').should('have.text', "Department Name");

        getCell(1, 'department-name').should('have.text', 'Delivery');
    });

    it("attempts to delete a department when clicking delete", () => {
        cy.route({
            method: "DELETE",
            url: "http://localhost:8080/api/orgchart/depts/1",
            response: true,
            status: 204
        }).as("delete");

        getDeleteButton(1).click();

        cy.wait("@delete").its('status').should('eq', 204)
    });

    it("navigates to the edit form when clicking edit, and populates with the appropriate data", () => {
        cy.route({
            method: "GET",
            url: "http://localhost:8080/api/orgchart/depts/1",
            response: mockData.departments[0]
        }).as("getById");

        cy.route({
            method: "PUT",
            url: "http://localhost:8080/api/orgchart/depts",
            response: mockData.departments[0]
        }).as("update");

        getEditLink(1).click();

        cy.wait("@getById").its('status').should('eq', 200);

        getDepartmentNameField().should('have.value', 'Delivery');
        getDepartmentNameField().clear();
        getDepartmentNameField().type("Agile");

        getSaveButton().click();

        cy.wait('@update').should((xhr) => {
            expect(xhr.requestBody).to.have.property("name", "Agile");
            expect(xhr.requestBody).to.have.property("isActive", true);

            expect(xhr.requestHeaders).to.have.property('Content-Type', "application/json");
        });
    });
})