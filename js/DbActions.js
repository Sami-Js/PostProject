// MUST TRY TO GET ESQID FROM URL IN CASE OF UPDATED INFO
var esqID = ""
var url = 'http://localhost:5001/api';
//PATHS
var paths = {
    "rawM": "/rawM",
    "aux": "/aux",
    "Products": "/Products",
    "HazardousMaterials": "/HazardousMaterials",
    "Fuels": "/Fuels",
    "AirEmissionsPointSources": "/AirEmissionsPointSources",
    "FugitiveAirEmissions": "/FugitiveAirEmissions",
    "WaterConsumption": "/WaterConsumption",
    "EffluentWastewater": "/EffluentWastewater",
    "SolidLiquidWaste": "/SolidLiquidWaste",
    "Noise": "/Noise",
    "Flare": "/Flare",
    "Incinerator": "/Incinerator",
    "LoadUnload": "/LoadUnload",
    "DredgingOperations": "/DredgingOperations",
    "OtherInformation": "/OtherInformation",
}
onClickSubmit()
//Get next btn
// btn = document.getElementById("Next")
// btn.addEventListener('click', function () {
//     onClickSubmit()
// })
export function onClickSubmit() {
    try {
        data = new FormData(document.getElementById("Env"))
        var jsonBody = setupObject(data)
        if (esqID === "")
            esqID = postData(url + "/EnvForm", setupObject(data));
        else
            updateData(url + "/EnvForm", data)

        for (var key in paths) {
            try {
                path = url + paths[key]
                data = new FormData(document.getElementById(key + "Form"))
                jsonData = setupArrayData(data, key)
                jsonBody[key] = jsonData
            } catch{ }
        }
        console.log(jsonBody)
    }
    catch{
        console.log(`failed submit ${path} where`)
        // console.log(`Form = ${key}Form`)
        // console.log(`Controller = ${paths[key]}`)
    }
}

function setupObject(data) {
    var json = new Object();
    for (var [key, val] of data.entries()) {
        if (val === 'true')
            val = true
        else if (val === 'false')
            val = false
        json[key] = val
    }
    return json
}
//JSON OBJECT SETUP
function setupArrayData(data) {
    var tempArr = []
    var temp = new Object()
    for (var [key, value] of data.entries()) {
        if (key == "empty") {
            tempArr.push(temp)
            temp = new Object()
        }else {
            if (value != ""){
                if (value == "true") {
                    value = true
                } else if (value == "false") {
                    value = false
                }
                else if (!isNaN(value)){
                    value = parseInt(value)
                }
                temp[key] = value
            }
        }
    }
    return tempArr
}

//SEND REQUEST BLOCK
function postData(path, body) {

    var xhr = new XMLHttpRequest();
    xhr.open("POST", path, 1)
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300)
            console.log("success")
        else
            console.log("fail")
        // response = xhr.responseText
        // console.log(this.responseText)

    }
    xhr.send(JSON.stringify(body))
    // console.log(xhr.responseText)
    return xhr.responseText
}

//SUBMIT ARRAY OF OBJECTS TEST
// document.getElementById("submit").addEventListener('click', function(){



// var paths = {
//     env : "/EnvForm",
//     rawMaterials : "/rawM",
//     aux : "/aux",
//     products : "/Products",
//     hazards : "/HazardousMaterials",
//     fuels : "/Fuels",
//     air : "/AirEmissionsPointSources",
//     fugAir : "/FugitiveAirEmissions",
//     water : "/WaterConsumption",
//     effluent : "/EffluentWastewater",
//     solid : "/SolidLiquidWaste",
//     noise : "/Noise",
//     flare : "/Flare",
//     incinerator : "/Incinerator",
//     load : "/LoadUnload",
//     dredge : "/DredgingOperations",
//     other : "/OtherInformation", 
// }