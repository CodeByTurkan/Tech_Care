const base64Credentials = btoa("coalition:skills-test");
let patients = []
fetch("https://fedskillstest.coalitiontechnologies.workers.dev", {
    method: "GET",
    headers: {
        Authorization: ` Basic ${base64Credentials}`,
        // author - sorgu atmaga komek edir
        "Content-Type": "application/json",
    },
})
    .then((response) => response.json())
    .then((data) => {
        patients.push(...data)
        // bu data yuxaridaki datadi.
        // bir array yaradirsan ve push edib arraya datani , ekranda cixarda bilirsen. Fetchlerde bele etmek lazimdir
        getUsers();
        // gozleyirem fetchden data gelir sonra sorgunu cagiriram
    })
    console.log(patients);
    

                                  
const ctx = document.getElementById('myChart');
const patientList = document.querySelector('.patientList');
const sysValue = document.getElementById('sysValue');
const sysLevel = document.getElementById('sysLevel');
const diasValue = document.getElementById('diasValue');
const diasLevel = document.getElementById('diasTitle');
const restValue = document.getElementById('restValue');
const restLevel = document.getElementById('restLevel');
const tempValue = document.getElementById('tempValue');
const tempLevel = document.getElementById('tempLevel');
const heartValue = document.getElementById('heartValue');
const heartLevel = document.getElementById('heartLevel');
const diagnosticList = document.getElementById('diagnosticList');
const patientProfile = document.getElementById('patientProfile');
const patientName = document.getElementById('patientName');
const birth = document.getElementById('birth');
const gender = document.getElementById('gender');
const phone = document.getElementById('phone');
const emergency = document.getElementById('emergency');
const insurance = document.getElementById('insurance');
const labResults = document.getElementById('labResults');



function getUsers() {
    let code = ''
    patients.forEach((elm, index )=> {
        code += 
        `  <div onclick="getBloodPressure(${index})" class=" hover:bg-[#01F0D0] rounded-lg flex items-center p-2">
                <img class="pr-2 w-12" src="${elm.profile_picture}" alt="">
                <div><p class="font-semibold text-sm">${elm.name}</p><p class="text-gray-500 text-sm">${elm.gender}, ${elm.age}</p></div>
            </div>
        `
    });
    patientList.innerHTML = code
}

function getBloodPressure(index) {
    let filterPatient = patients.find((elm, i) => i === index)
    // the way to find patients
    let systolicValues = filterPatient.diagnosis_history.map((item) => item.blood_pressure.systolic.value)
    // burda array maplanir cunki diagnostic history icinde arr var.
    let diastolicValues = filterPatient.diagnosis_history.map((item) => item.blood_pressure.diastolic.value)
    qraf.data.datasets[0].data = systolicValues
    qraf.data.datasets[1].data = diastolicValues 
    qraf.update()

    // avg
    let totalSysValue = systolicValues.reduce((sum, val) => sum + val)
    let totalDiasValue = diastolicValues.reduce((sum, val) => sum + val)
    let avgSysValue = Math.round(totalSysValue /systolicValues.length)// TO FIND AVERAGE
    let avgDiasValue = Math.round(totalDiasValue /diastolicValues.length)
    sysValue.innerHTML = avgSysValue
    diasValue.innerHTML = avgDiasValue

    // level
    let systolicLevel = filterPatient.diagnosis_history.map((item) => item.blood_pressure.systolic.levels)
    let diastolicLevel = filterPatient.diagnosis_history.map((item) => item.blood_pressure.systolic.levels)
    sysLevel.innerHTML = systolicLevel[0]
    diasLevel.innerHTML = diastolicLevel[1]
    //Resp rate + its avg
    let respiratoryValue = filterPatient.diagnosis_history.map(item=> item.respiratory_rate.value)
    let totalrespiratoryValue = respiratoryValue.reduce((sum, val) => sum + val )
    let avgrespiratoryValue = Math.round(totalrespiratoryValue /respiratoryValue.length )
    restValue.innerHTML = avgrespiratoryValue + " bmp"

    let respiratoryLevels = filterPatient.diagnosis_history.map(item=> item.respiratory_rate.levels)
    restLevel.innerHTML = respiratoryLevels[0]
    // temp + its avg
    let temperatureValue = filterPatient.diagnosis_history.map(item=> item.temperature.value)
    let totaltemperatureValue = temperatureValue.reduce((sum, val) => sum + val )
    let avgtemperatureValue = (totaltemperatureValue / temperatureValue.length ).toFixed(1)
    tempValue.innerHTML = avgtemperatureValue + " ℉"

    let temperatureLevels = filterPatient.diagnosis_history.map(item=> item.temperature.levels) 
    tempLevel.innerHTML = temperatureLevels[0]
    // heart rate + its avg
    let heartrateValue = filterPatient.diagnosis_history.map(item=> item.heart_rate.value)
    let totalheartrateValue = heartrateValue.reduce((sum, val) => sum + val )
    let avgheartrateValue = Math.round(totalheartrateValue / heartrateValue.length )
    heartValue.innerHTML = avgheartrateValue + " bmp"

    let heartrateLevels = filterPatient.diagnosis_history.map(item=> item.heart_rate.levels)
    heartLevel.innerHTML = heartrateLevels[0]
    // info about patient
    patientProfile.src = filterPatient.profile_picture
    patientName.innerHTML = filterPatient.name
    birth.innerHTML = filterPatient.date_of_birth
    gender.innerHTML = filterPatient.gender
    phone.innerHTML = filterPatient.phone_number
    emergency.innerHTML = filterPatient.emergency_contact
    insurance.innerHTML = filterPatient.insurance_type


    // diagnosticList
    let code = ''
    let code1 = ''
    let diagList = filterPatient.diagnostic_list.map(item => {
        code += 
        `<div class="flex justify-between text-center my-4 px-2 border-b border-gray-200 py-1">
             <span class="p-1"> ${item.name}</span> <span class="p-1">${item.description}</span> <span class="p-1">${item.status}</span>
        </div>
        `
    })
    diagnosticList.innerHTML = code
    
    // lab results
    let labRes = filterPatient.lab_results.map(item =>{
        code1 +=  
        `<div class="flex justify-between text-sm">
            <p>${item}</p>
            <i class="fa-solid fa-download text-xl"></i>
        </div> `

    })
    labResults.innerHTML  = code1
    
}

let qraf = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Oct 2023', 'Nov 2023', 'Dec 2023', 'Jan 2024', 'Feb 2024', 'Mar 2024', 'Oct 2024'],
      datasets: [
        {
        label: 'Systolic',
        data: [95, 120,77, 92, 95, 80, 68, 70, 95],
        borderWidth: 3,
        borderColor:"#E66FD2",
        pointBorderWidth:2, 
        pointBorderColor:"#fff",
        pointBackgroundColor: "#E66FD2",
        pointRadius:9,
        tension:0.5
        // cubic-baser - css de
      },
      {
        label: 'Diastolic',
        data: [163, 151, 168, 158, 117, 115, 133, 149, 165],
        borderWidth: 3,
        borderColor:"#7e6cab",
        pointBorderWidth:2, 
        pointBorderColor:"#fff",
        pointBackgroundColor: "#7e6cab",
        pointRadius:9,
        tension:0.5
      }
    ]
    },
    options: {
        responsive:true,
        maintainAspectRatio:false,
        scales: {
            y: {
                beginAtZero: true,
                min:60,
                max: 180,
                ticks:{
                    stepSize:20,
                }
            },
            x: {
                grid:{
                    display: false,
                },
                ticks: {
                    font: {
                      size: 11 // 👈 Change this value for bigger/smaller text
                    },
                    color: '#333' // (Optional) Change label color
                  }
            }
        },
        plugins: {
            annotation: {
                annotations: {
                    line1: {
                        type: 'line',
                        scaleID: 'x',
                        value: 'Oct 2024',
                        borderColor: 'red',
                        borderWidth: 2,
                        label: {
                            content: 'Oct 2024',
                            enabled: true,
                            position: 'start'
                        }
                    },
                }
            },
            legend:{
                display:false  //usteki value delete
            }
        }
    }
  });

