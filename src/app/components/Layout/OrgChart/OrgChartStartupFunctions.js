import { getData } from '../ImportHandler'

const getOrgChartData = async () => {
    let { getByManagerIdService } = getData("employee")
    let currentLevel = [...await getByManagerIdService(0)]
    let layerLength = 1
    let data = [[...currentLevel]]

    while (layerLength > 0) {
        let layer = currentLevel.map(async element => {
            console.log(element)
            return (
                await getByManagerIdService(element.id))
        })

        let currentLayer = await Promise.all(layer)

        currentLayer = [].concat(...currentLayer)
        let dataToAdd = currentLayer.length === 1 ? [[...currentLayer]] : currentLayer

        layerLength = currentLayer.length
        if (layerLength > 0) {
            data = [...data, dataToAdd]
            currentLevel = currentLayer
        }
    }
    return data
}

const groupEmployeesByManager = (unGroupedOrgChartData) => {
    if (unGroupedOrgChartData != undefined) {
        return unGroupedOrgChartData.map(layerData => {
            let currentLayerData = null
            if (layerData.length > 1) {
                let groupedEmployees = []
                let unGroupedEmployees = [...layerData]
                while (unGroupedEmployees.length > 0) {
                    let commonManager = unGroupedEmployees[0]
                    let filteredEmployees = unGroupedEmployees.filter(employee => employee.manager.id == commonManager.manager.id)
                    let unFilteredEmployees = unGroupedEmployees.filter(employee => employee.manager.id != commonManager.manager.id)
                    groupedEmployees = [...groupedEmployees, filteredEmployees]
                    unGroupedEmployees = [...unFilteredEmployees]
                }
                currentLayerData = [...groupedEmployees]
            } else {
                currentLayerData = [[...layerData]]
            }
            return currentLayerData
        })
    }
}

const hideAllManagedEmployees = (groupedEmployees) => {
    let hiddenComponents = [...groupedEmployees]
    hiddenComponents = hiddenComponents.map(layer =>
        layer.map(group => { return ({ data: group, isVisible: false }) }))
    hiddenComponents[0][0].isVisible = true
    return hiddenComponents
}

export const buildInitialOrgChart = async (orgChart, setOrgChart) => {
    let orgChartTree = await getOrgChartData()
    let groupedOrgChartTree = groupEmployeesByManager(orgChartTree)
    let initOrgChart = hideAllManagedEmployees(groupedOrgChartTree)
    setOrgChart([...orgChart, ...initOrgChart])
}
