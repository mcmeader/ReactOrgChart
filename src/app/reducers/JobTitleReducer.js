export const initialJobTitle = {
    name: "",
    isActive: true,
}

export default (state, action) => {
    switch (action.type) {
        case 'reset':
            return initialJobTitle
        case 'update':
            return updateState(state, action.field, action.value)
        default:
            return state
    }
}

const updateState = (state, field, value) => {
    switch (field) {
        case 'isActive':
            state.firstName = value
            break
        case 'name':
            state.name = value
            break
    }
    return state
}