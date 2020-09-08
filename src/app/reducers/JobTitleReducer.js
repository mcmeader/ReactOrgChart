export const initialJobTitle = {
    name: "",
    isActive: true,
}

export default (state, action) => {
    switch (action.type) {
        case 'reset':
            state = initialJobTitle
            break
        case 'update':
            state = updateState(state, action.field, action.value)
            break
        default:
            break
    }
    return state
}

const updateState = (state, field, value) => {
    switch (field) {
        case 'isActive':
            state.isActive = value
            break
        case 'name':
            state.name = value
            break
    }
    return state
}