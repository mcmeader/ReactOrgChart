export const initialEmployee = {
    firstName: "",
    lastName: "",
    middleInitial: "",
    jobTitle: {},
    department: {},
    manager: {},
}

export default (state, action) => {
    switch (action.type) {
        case 'reset':
            return initialEmployee
        case 'update':
            return updateState(state, action.field, action.value)
        default:
            return state
    }
}

const updateState = (state, field, value) => {
    switch (field) {
        case 'firstName':
            state.firstName = value
            break
        case 'lastName':
            state.lastName = value
            break
        case 'middleInitial':
            state.middleInitial = value
            break
        case 'jobTitle':
            state.jobTitle = value
            break
        case 'department':
            state.department = value
            break
        case 'manager':
            state.manager = value
            break
    }
    return state
}