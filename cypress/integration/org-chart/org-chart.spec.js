import mockData from "./mockData";

const getEmployeeDisplayName = (id) => cy.get(`[data-testid='${id}-display-name']`);
const getEmployeeJobTitle = (id) => cy.get(`[data-testid='${id}-job-title']`);
const getEmployeeShowButton = (id) => cy.get(`[data-testid='${id}-show-employees-button']`);
const getEmployeeHideButton = (id) => cy.get(`[data-testid='${id}-hide-employees-button']`);

const validateEmployee = (id, name, jobTitle) => {
    getEmployeeDisplayName(id).should('have.text', name);
    getEmployeeJobTitle(id).should('have.text', jobTitle);
    getEmployeeShowButton(id).should('be.visible')
}

context('Org Chart', () => {
    beforeEach(() => {
        cy.server();

        cy.route("GET", "http://localhost:8080/api/orgchart/emps/manager/0", mockData[0]).as("topLevel")
        cy.visit('http://localhost:3000/')
    })

    it("Navigates the Org Chart Tree", () => {
        cy.wait("@topLevel");

        cy.route("GET", "http://localhost:8080/api/orgchart/emps/manager/1", mockData[1]).as("children1");
        cy.route("GET", "http://localhost:8080/api/orgchart/emps/manager/5", mockData[5]).as("children5");
        cy.route("GET", "http://localhost:8080/api/orgchart/emps/manager/6", mockData[6]).as("children6");

        getEmployeeDisplayName(1).should('have.text', 'Mark Orttung');
        getEmployeeJobTitle(1).should('have.text', 'Chief Executive Officer');
        getEmployeeShowButton(1).should('be.visible');
        getEmployeeShowButton(1).click();

        cy.wait("@children1");

        validateEmployee(2, "Colin Chapman", "Chief Delivery Officer");
        validateEmployee(3, "Asim Malik", "General Manager");
        validateEmployee(4, "Danno Broekhuizen", "Vice President, People");
        validateEmployee(5, "Andy Lin", "Vice President");

        getEmployeeHideButton(1).should('be.visible');
        getEmployeeShowButton(1).should('not.exist');

        getEmployeeShowButton(5).click();

        cy.wait("@children5");

        validateEmployee(6, "Oliver Merkle", "Sr. Director of Agile Excellence");

        getEmployeeShowButton(6).click();

        validateEmployee(7, "Craig Salajan", "Delivery Manager");

        getEmployeeHideButton(1).click();

        getEmployeeShowButton(1).should('be.visible');
        getEmployeeShowButton(2).should('not.exist');

    })
})