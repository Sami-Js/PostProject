// MUST TRY TO GET ESQID FROM URL IN CASE OF UPDATED INFO
var esqID = 28
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
// EnvSubmit()
// OtherSubmit()
// Get next btn
// var btn = document.getElementById("Next")
// btn.addEventListener('click', function () {
//     onClickSubmit()
// })

export function EnvSubmit() {
    try {
        console.log("envSubmit")
        var data = new FormData(document.getElementById("EnvForm"))
        var jsonBody = setupObject(data)
        console.log("envData: ", jsonBody)
        if (esqID === "") {
            // esqID = postData(url + "/EnvForm", setupObject(jsonBody));
            console.log("posted")
        }

        else {
            // updateData(url + "/EnvForm", data)
            console.log("updated")
        }
    } catch (e)
        {console.log(e.stack)}
}

function OtherSubmit(form){
        try {
            console.log(form.id, "OTHER SUBMIT")
            var path = url + paths[form.id]
            var data = new FormData(form)
            var jsonData = setupArrayData(data)
            console.log(jsonData)
            postData(path, jsonData, 1)
            console.log("posted other")
            // jsonBody[key] = jsonData
        } catch (e)
        {
            console.log(e.stack)
        }
    
}
export function onClickNext(val, form) {
    if (val > 0)
        OtherSubmit(form)
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
            temp["esqId"] = esqID
            tempArr.push(temp)
            temp = new Object()
        } else {
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
    console.log(tempArr)
    return tempArr
}

//SEND REQUEST BLOCK
function postData(path, body) {

try{
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
    console.log(JSON.stringify(body))
    // console.log(xhr.responseText)
    return xhr.responseText
}
catch (e)
{
    console.error("%O", e)
}
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