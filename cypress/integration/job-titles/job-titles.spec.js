import mockData from "../mockData";

const getCreateJobTitleLink = () => cy.get('[data-testid=create-job-title-link]');

const getHeader = (index) => cy.get(`[data-testid=table-header-${index}]`);
const getCell = (row, column) => cy.get(`[data-testid=table-row-${row}-column-${column}]`)
const getEditLink = (rowId) => cy.get(`[data-testid=row-${rowId}-edit-link]`);
const getDeleteButton = (rowId) => cy.get(`[data-testid=row-${rowId}-delete-button]`);

const getJobTitleNameField = () => cy.get('[data-testid=create-job-title-name]');
const getSaveButton = () => cy.get('[data-testid=create-job-title-save-button]');

const getToastDismissIcon = () => cy.get('.react-toast-notifications__toast__dismiss-icon');
context("Job Titles", () => {

    beforeEach(() => {
        cy.server();

        cy.route("GET", "http://localhost:8080/api/orgchart/titles", mockData.jobTitles).as("job-titles");

        cy.visit("http://localhost:3000/job-titles");
        cy.wait("@job-titles");
    });

    it("successfully creates a new department with all the fields filled out", () => {
        cy.route("POST", "http://localhost:8080/api/orgchart/titles", {}).as("save");
        getCreateJobTitleLink().click();

        getJobTitleNameField().type("Delivery Manager");


        getSaveButton().click();

        cy.wait("@save").should((xhr) => {
            expect(xhr.requestBody).to.have.property("name", "Delivery Manager");
            expect(xhr.requestBody).to.have.property("isActive", true);

            expect(xhr.requestHeaders).to.have.property('Content-Type', "application/json");
        });

        getJobTitleNameField().should('have.value', '');

    });

    it("unsuccessfully creates a new department with all the fields filled out", () => {
        cy.route({
            method: "POST",
            url: "http://localhost:8080/api/orgchart/titles",
            response: {},
            status: 400
        }).as("save");

        getCreateJobTitleLink().click();

        getJobTitleNameField().type("Delivery Manager");


        getSaveButton().click();

        cy.wait("@save").its('status').should('eq', 400)

        getJobTitleNameField().should('have.value', 'Delivery Manager');

        getToastDismissIcon().should('be.visible');
        getToastDismissIcon().click();

    });

    it("loads the list of employees into the table", () => {
        getHeader('job-title').should('have.text', "Job Title");

        getCell(1, 'job-title').should('have.text', 'Delivery Director');
    });

    it("attempts to delete an employee when clicking delete", () => {
        cy.route({
            method: "DELETE",
            url: "http://localhost:8080/api/orgchart/titles/1",
            response: true,
            status: 204
        }).as("delete");

        getDeleteButton(1).click();

        cy.wait("@delete").its('status').should('eq', 204)
    });

    it("navigates to the edit form when clicking edit, and populates with the appropriate data", () => {
        cy.route({
            method: "GET",
            url: "http://localhost:8080/api/orgchart/titles/1",
            response: mockData.jobTitles[0]
        }).as("getById");

        cy.route({
            method: "PUT",
            url: "http://localhost:8080/api/orgchart/titles",
            response: mockData.jobTitles[0]
        }).as("update");

        getEditLink(1).click();

        cy.wait("@getById").its('status').should('eq', 200);

        getJobTitleNameField().should('have.value', 'Delivery Director')
        getJobTitleNameField().clear();
        getJobTitleNameField().type("Sr. Delivery Director");

        getSaveButton().click();

        cy.wait('@update').should((xhr) => {
            expect(xhr.requestBody).to.have.property("name", "Sr. Delivery Director");
            expect(xhr.requestBody).to.have.property("isActive", true);

            expect(xhr.requestHeaders).to.have.property('Content-Type', "application/json");
        });
    });
})