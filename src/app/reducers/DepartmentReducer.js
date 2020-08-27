export const initialDepartment = {
    name: "",
    isActive: true,
}

export default (state, action) => {
    switch (action.type) {
        case "reset":
            return initialDepartment;
        case "update":
            return {
                ...state,
                [action.field]: action.value,
            }
        default:
            return state;
    }
}