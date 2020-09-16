import employeeReducer from '../../app/reducers/EmployeeReducer';

describe('Job Title Reducer', () => {
    [
        {
            state: {

            },
            action: {
                type: 'reset'
            },
            response: {
                firstName: "",
                lastName: "",
                middleInitial: "",
                jobTitle: {},
                department: {},
                manager: {},
                isActive: true
            }
        },
        {
            state: {
                firstName: "",
                lastName: "",
                middleInitial: "",
                jobTitle: {},
                department: {},
                manager: {},
            },
            action: {
                type: 'update',
                field: 'firstName',
                value: 'John'
            },
            response: {
                firstName: "John",
                lastName: "",
                middleInitial: "",
                jobTitle: {},
                department: {},
                manager: {},
            }
        },
        {
            state: {
            },
            action: {
                type: 'fake',
                field: 'name',
                value: 'John'
            },
            response: {
            }
        },
    ].forEach(testCase => {
        it(`returns the expected response for action type: ${testCase.action.type}`, () => {
            expect(employeeReducer(testCase.state, testCase.action)).toEqual(testCase.response);
        })
    })
})