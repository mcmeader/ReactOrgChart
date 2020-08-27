import departmentReducer from '../../app/reducers/DepartmentReducer';

describe('Department Reducer', () => {
    [
        {
            state: {

            },
            action: {
                type: 'reset'
            },
            response: {
                name: "",
                isActive: true,
            }
        },
        {
            state: {

                isActive: true
            },
            action: {
                type: 'update',
                field: 'name',
                value: 'Delivery'
            },
            response: {
                name: "Delivery",
                isActive: true,
            }
        },
        {
            state: {
            },
            action: {
                type: 'fake',
                field: 'name',
                value: 'Delivery'
            },
            response: {
            }
        },
    ].forEach(testCase => {
        it(`returns the expected response for action type: ${testCase.action.type}`, () => {
            expect(departmentReducer(testCase.state, testCase.action)).toEqual(testCase.response);
        })
    })
})