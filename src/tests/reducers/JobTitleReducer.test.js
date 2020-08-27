import jobTitleReducer from '../../app/reducers/JobTitleReducer';

describe('Job Title Reducer', () => {
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
                value: 'Delivery Manager'
            },
            response: {
                name: "Delivery Manager",
                isActive: true,
            }
        },
        {
            state: {
            },
            action: {
                type: 'fake',
                field: 'name',
                value: 'Delivery Manager'
            },
            response: {
            }
        },
    ].forEach(testCase => {
        it(`returns the expected response for action type: ${testCase.action.type}`, () => {
            expect(jobTitleReducer(testCase.state, testCase.action)).toEqual(testCase.response);
        })
    })
})