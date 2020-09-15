export const initialEmployee = {
    firstName: "",
    lastName: "",
    middleInitial: "",
    jobTitle: {},
    department: {},
    manager: {},
    isActive: true,
}

export default (state, action) => {
    switch (action.type) {
        case 'reset':
            return initialEmployee
        case 'update':
            return { ...state, [action.field]: action.value }
        case 'set':
            return action.data
        default:
            return state
    }
}