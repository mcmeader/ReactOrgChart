export const initialEmployee = {
    firstName: "",
    lastName: "",
    middleInitial: "",
    jobTitle: {},
    department: {},
    manager: {}
}

export default (state, action) => {
    switch (action.type) {
        case 'reset':
            return initialEmployee
        case 'update':
            return { ...state, [action.field]: action.value }
        default:
            return state
    }
}