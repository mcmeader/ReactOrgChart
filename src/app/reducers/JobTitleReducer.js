export const initialJobTitle = {
    name: "",
    isActive: true
}

export default (state, action) => {
    switch (action.type) {
        case "reset":
            return initialJobTitle;
        case "update":
            return {
                ...state,
                [action.field]: action.value
            }
        default:
            return state;
    }
}