let validateFormFields = (data, inputFieldValue) => {
    let formFields = getFormFields(data, inputFieldValue)
    let invalidCharacters = new RegExp(/^[a-z .A-Z]+$/)
    let result = Object.values(formFields).some(value => {
        if (typeof value === 'string') {
            console.log("Input", value.id, value)
            return value === '' || !invalidCharacters.test(value)
        } else {
            return value === undefined || value.id === '0'
        }
    })
    return result
}

let getFormFields = (data, inputFieldValue) => {
    let editableFields = { ...inputFieldValue }
    let fieldValues = Object.keys(inputFieldValue)
    let functions = data.map(value => value.field)
    fieldValues.forEach(value => {
        if (!functions.some(field => field === value)) {
            delete editableFields[value]
        }
    })
    return editableFields
}

export { validateFormFields }