import { getData } from '../ImportHandler'

let { getByManagerIdService } = getData("employee")

const getLayerOfEmployee = (orgChart, employeeId) => {
    let layerOfEmployee = orgChart.map(layer =>
        layer[0].some(data => data.id == employeeId)
    )
    return layerOfEmployee.indexOf(true)
}

const getManagedEmployees = async (employeeId, getManager) => {
    let currentLevel = [...await getManager(employeeId)]
    let layerLength = 1
    let allManagedEmployees = [[...currentLevel]]

    while (layerLength > 0) {
        let layer = currentLevel.map(async element => {
            return (
                await getManager(element.id))
        })

        let currentLayer = await Promise.all(layer)

        currentLayer = [].concat(...currentLayer)
        let dataToAdd = currentLayer.length === 1 ? [[...currentLayer]] : currentLayer

        layerLength = currentLayer.length
        if (layerLength > 0) {
            allManagedEmployees = [...allManagedEmployees, dataToAdd]
            currentLevel = currentLayer
        }
    }
    return allManagedEmployees
}

const removeAllUnusedEmployees = (employeeArray) => {
    let array = [...employeeArray]

    for (let x = 0; x < array.length; x++) {
        for (let y = 0; y < newOrgChart[x].length; y++) {
            for (let z = 0; z < newOrgChart[x][y].length; z++) {
                if (newOrgChart[x][y][z].length == 0) {
                    newOrgChart[x][y].splice(z, 1)
                    z--
                }
            }
        }
    }

    for (let x = 0; x < array.length; x++) {
        for (let y = 0; y < newOrgChart[x].length; y++) {
            if (newOrgChart[x][y].length == 0) {
                newOrgChart[x].splice(y, 1)
                y--
            }
        }
    }

    for (let x = 0; x < array.length; x++) {
        if (newOrgChart[x].length == 0) {
            newOrgChart.splice(x, 1)
            x--
        }
    }
}

const getInitialManager = async (orgChart, setOrgChart) => {
    let newEmployees = await getByManagerIdService(0)
    setOrgChart([...orgChart, [newEmployees]])
}

export { getLayerOfEmployee, getManagedEmployees, removeAllUnusedEmployees, getInitialManager }