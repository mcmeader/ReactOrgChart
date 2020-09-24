import { getData } from '../ImportHandler'

let { getByManagerIdService } = getData("employee")

const getLayerOfEmployee = (orgChart, employeeId) => {
    let layerOfEmployee = orgChart.map(layer =>
        layer[0].some(data => data.id == employeeId)
    )
    return layerOfEmployee.indexOf(true)
}

const getManagedEmployees = async (employeeId) => {
    let currentLevel = [...await getByManagerIdService(employeeId)]
    let layerLength = 1
    let allManagedEmployees = [[...currentLevel]]

    while (layerLength > 0) {
        let layer = currentLevel.map(async element => {
            return (
                await getByManagerIdService(element.id))
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

const removeAllUnusedEmployees = (array) => {
    for (let x = 0; x < array.length; x++) {
        for (let y = 0; y < array[x].length; y++) {
            for (let z = 0; z < array[x][y].length; z++) {
                if (array[x][y][z].length == 0) {
                    array[x][y].splice(z, 1)
                    z--
                }
            }
        }
    }

    for (let x = 0; x < array.length; x++) {
        for (let y = 0; y < array[x].length; y++) {
            if (array[x][y].length == 0) {
                array[x].splice(y, 1)
                y--
            }
        }
    }

    for (let x = 0; x < array.length; x++) {
        if (array[x].length == 0) {
            array.splice(x, 1)
            x--
        }
    }
}

const getInitialManager = async (orgChart, setOrgChart) => {
    let newEmployees = await getByManagerIdService(0)
    setOrgChart([...orgChart, [newEmployees]])
}

export { getLayerOfEmployee, getManagedEmployees, removeAllUnusedEmployees, getInitialManager }