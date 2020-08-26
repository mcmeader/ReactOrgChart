import { doGet, doPost, doPut, doDelete } from "../../app/services/ApiService";
import { getActiveDepartments, getArchivedDepartments, getDepartmentById, createDepartment, updateDepartment, deleteDepartment} from "../../app/services/DepartmentService";

jest.mock('../../app/services/ApiService')

describe("Department Service", () => {
    let department;

    beforeEach(() => {
        department = {
            id: 1,
            name: "Test"
        }
    })

    describe("getActiveDepartments", () => {
        it("calls doGet with the correct service URL", () => {
            getActiveDepartments();
            expect(doGet).toHaveBeenCalledWith("/depts");
        });
    });

    describe("getArchivedDepartments", () => {
        it("calls doGet with the correct service URL", () => {
            getArchivedDepartments();
            expect(doGet).toHaveBeenCalledWith("/depts/archives");
        });
    });

    describe("getDepartmentById", () => {
        it("calls doGet with the correct service URL", () => {
            getDepartmentById(1);
            expect(doGet).toHaveBeenCalledWith("/depts/1");
        });
    });

    describe("createDepartment", () => {
        it("calls doPost with the correct service URL", () => {
            createDepartment(department);
            expect(doPost).toHaveBeenCalledWith("/depts", department);
        });
    });

    describe("updateDepartment", () => {
        it("calls doPut with the correct service URL", () => {
            updateDepartment(department);
            expect(doPut).toHaveBeenCalledWith("/depts", department);
        });
    });

    describe("deleteDepartment", () => {
        it("calls doPut with the correct service URL", () => {
            deleteDepartment(1);
            expect(doDelete).toHaveBeenCalledWith("/depts/1");
        });
    });
});
