import { doGet, doPost, doPut, doDelete } from "../../app/services/ApiService";
import {
    createEmployee, deleteEmployee,
    getArchivedEmployees,
    getEmployeeById,
    getEmployees,
    updateEmployee
} from "../../app/services/EmployeeService";

jest.mock('../../app/services/ApiService')

describe("Employee Service", () => {
    let employee;

    beforeEach(() => {
        employee = {
            id: 1,
            firstName: 'Test',
            lastName: 'User'
        }
    });

    describe("getEmployees", () => {
        it("calls doGet with the correct service URL", () => {
            getEmployees();

            expect(doGet).toHaveBeenCalledWith("/emps")
        })
    });

    describe("getArchivedEmployees", () => {
        it("calls doGet with the correct service URL", () => {
            getArchivedEmployees();

            expect(doGet).toHaveBeenCalledWith("/emps/archives")
        })
    });

    describe("getEmployeeById", () => {
        it("calls doGet with the correct service URL", () => {
            getEmployeeById(1);

            expect(doGet).toHaveBeenCalledWith("/emps/1")
        })
    });

    describe("createEmployee", () => {
        it("calls doPost with the correct service URL", () => {
            createEmployee(employee);

            expect(doPost).toHaveBeenCalledWith("/emps", employee);
        })
    });

    describe("updateEmployee", () => {
        it("calls doPut with the correct service URL", () => {
            updateEmployee(employee);

            expect(doPut).toHaveBeenCalledWith("/emps", employee);
        })
    });

    describe("deleteEmployee", () => {
        it("calls doDelete with the correct service URL", () => {
            deleteEmployee(1);

            expect(doDelete).toHaveBeenCalledWith("/emps/1");
        })
    });

});
