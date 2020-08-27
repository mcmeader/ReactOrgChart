import mockData from "../mockData";

const getCreateEmployeeLink = () => cy.get('[data-testid=create-employee-link]');

const getHeader = (index) => cy.get(`[data-testid=table-header-${index}]`);
const getCell = (row, column) => cy.get(`[data-testid=table-row-${row}-column-${column}]`)
const getEditLink = (rowId) => cy.get(`[data-testid=row-${rowId}-edit-link]`);
const getDeleteButton = (rowId) => cy.get(`[data-testid=row-${rowId}-delete-button]`);

const getFirstNameField = () => cy.get('[data-testid=create-employee-first-name]');
const getLastNameField = () => cy.get('[data-testid=create-employee-last-name]');
const getMiddleInitialField = () => cy.get('[data-testid=create-employee-middle-initial]');
const getJobTitleField = () => cy.get('[data-testid=create-employee-job-title]');
const getJobTitleOption = (id) => cy.get(`[data-testid=create-employee-job-title-option-${id}]`);
const getDepartmentField = () => cy.get('[data-testid=create-employee-department]');
const getDepartmentOption = (id) => cy.get(`[data-testid=create-employee-department-option-${id}]`);
const getManagerField = () => cy.get('[data-testid=create-employee-manager]');
const getManagerOption = (id) => cy.get(`[data-testid=create-employee-manager-option-${id}]`);
const getSaveButton = () => cy.get('[data-testid=create-employee-save-button]');

const getToastDismissIcon = () => cy.get('.react-toast-notifications__toast__dismiss-icon');
context("Employees", () => {

    beforeEach(() => {
        cy.server();

        cy.route("GET", "http://localhost:8080/api/orgchart/emps", mockData.employees).as("employees");
        cy.route("GET", "http://localhost:8080/api/orgchart/depts", mockData.departments).as("departments");
        cy.route("GET", "http://localhost:8080/api/orgchart/titles", mockData.jobTitles).as("jobTitles");

        cy.visit("http://localhost:3000/employees");
        cy.wait("@employees");
    });

    it("successfully creates a new employee with all the fields filled out", () => {
        cy.route("POST", "http://localhost:8080/api/orgchart/emps", {}).as("save");

        getCreateEmployeeLink().click();

        cy.wait('@employees');
        cy.wait('@departments');
        cy.wait('@jobTitles');

        getFirstNameField().type("Dave");
        getLastNameField().type("Muczynski");
        getMiddleInitialField().type("A");
        getJobTitleField().select("Delivery Director");
        getDepartmentField().select("Delivery");
        getManagerField().select("Colin Chapman");

        getSaveButton().click();

        cy.wait("@save").should((xhr) => {
            expect(xhr.requestBody).to.have.property("firstName", "Dave");
            expect(xhr.requestBody).to.have.property("lastName", "Muczynski");
            expect(xhr.requestBody).to.have.property("middleInitial", "A");
            expect(xhr.requestBody).to.have.nested.property("jobTitle.id", 1);
            expect(xhr.requestBody).to.have.nested.property("jobTitle.name", "Delivery Director");
            expect(xhr.requestBody).to.have.nested.property("department.id", 1);
            expect(xhr.requestBody).to.have.nested.property("department.name", "Delivery");
            expect(xhr.requestBody).to.have.nested.property("manager.id", 1);
            expect(xhr.requestBody).to.have.nested.property("manager.firstName", "Colin");
            expect(xhr.requestBody).to.have.nested.property("manager.lastName", "Chapman");

            expect(xhr.requestHeaders).to.have.property('Content-Type', "application/json");
        });
    });

    it("unsuccessfully creates a new department with all the fields filled out", () => {
        cy.route({
            method: "POST",
            url: "http://localhost:8080/api/orgchart/emps",
            response: {},
            status: 400
        }).as("save");
        getCreateEmployeeLink().click();

        cy.wait('@employees');
        cy.wait('@departments');
        cy.wait('@jobTitles');

        getFirstNameField().type("Dave");
        getLastNameField().type("Muczynski");
        getMiddleInitialField().type("A");
        getJobTitleField().select("Delivery Director");
        getDepartmentField().select("Delivery");
        getManagerField().select("Colin Chapman");

        getSaveButton().click();

        cy.wait("@save").its('status').should('eq', 400)

        getFirstNameField().should('have.value', "Dave");
        getLastNameField().should('have.value', "Muczynski");
        getMiddleInitialField().should('have.value', "A");
        getJobTitleField().should('have.value', 1);
        getDepartmentField().should('have.value', 1);
        getManagerField().should('have.value', 1);

        getToastDismissIcon().should('be.visible');
        getToastDismissIcon().click();

    });

    it("loads the list of employees into the table", () => {
        getHeader('first-name').should('have.text', "First Name");
        getHeader('last-name').should('have.text', "Last Name");
        getHeader('middle-initial').should('have.text', "Middle Initial");

        getCell(1, 'first-name').should('have.text', 'Colin');
        getCell(1, 'last-name').should('have.text', 'Chapman');
        getCell(1, 'middle-initial').should('have.text', 'A');
    });

    it("attempts to delete an employee when clicking delete", () => {
        cy.route({
            method: "DELETE",
            url: "http://localhost:8080/api/orgchart/emps/1",
            response: true,
            status: 204
        }).as("delete");

        getDeleteButton(1).click();

        cy.wait("@delete").its('status').should('eq', 204)
    });

    it("navigates to the edit form when clicking edit, and populates with the appropriate data", () => {
        cy.route({
            method: "GET",
            url: "http://localhost:8080/api/orgchart/emps/1",
            response: mockData.employees[0]
        }).as("getById");

        cy.route({
            method: "PUT",
            url: "http://localhost:8080/api/orgchart/emps",
            response: mockData.employees[0]
        }).as("update");

        getEditLink(1).click();

        cy.wait("@getById").its('status').should('eq', 200);

        cy.wait('@employees');
        cy.wait('@departments');
        cy.wait('@jobTitles');

        getFirstNameField().should('have.value', "Colin");
        getLastNameField().should('have.value', "Chapman");
        getMiddleInitialField().should('have.value', "A");
        getJobTitleField().should('have.value', 0);
        getDepartmentField().should('have.value', 0);
        getManagerField().should('have.value', 0);

        getMiddleInitialField().clear();
        getMiddleInitialField().type("S");
        getJobTitleField().select("Chief Delivery Officer");
        getDepartmentField().select("Delivery");

        getSaveButton().click();

        cy.wait('@update').should((xhr) => {
            expect(xhr.requestBody).to.have.property("firstName", "Colin");
            expect(xhr.requestBody).to.have.property("lastName", "Chapman");
            expect(xhr.requestBody).to.have.property("middleInitial", "S");
            expect(xhr.requestBody).to.have.nested.property("jobTitle.id", 2);
            expect(xhr.requestBody).to.have.nested.property("jobTitle.name", "Chief Delivery Officer");
            expect(xhr.requestBody).to.have.nested.property("department.id", 1);
            expect(xhr.requestBody).to.have.nested.property("department.name", "Delivery");

            expect(xhr.requestHeaders).to.have.property('Content-Type', "application/json");
        });

    });
})