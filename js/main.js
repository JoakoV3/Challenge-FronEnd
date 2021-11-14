jQuery(function () {

  //render the data onload
  const renderData = (selectedGroup) => {
    //get the json
    $.getJSON("../Assets/CarsJson.json", function (data) {
      //filter by group
      if (selectedGroup == 'all') {
        carContainer.empty();
        currentJson = data
        $.each(currentJson.cars, (i, car) => {
          carContainer.append(carComponent(car))
        })
        console.log(currentJson)
      } else {
        carContainer.empty();
        $.each(data, (i, car) => {
          currentJson = car[selectedGroup]
          carContainer.append(carComponent(currentJson));
        })
      }
    })
  }

  const renderExistingData = (currentJson) => {
    carContainer.empty();
    if (selectedGroup == 'all') {
      currentJson
      console.log(currentJson);
      $.each(currentJson, (i, car) => {
        carContainer.append(carComponent(car))
      })
    } else {
      $.each(currentJson, (i, car) => {
        currentJson = car[selectedGroup]
        carContainer.append(carComponent(car));
      })
    }
  }

  //define main states
  let selectedGroup = 'all'
  let currentJson

  //execute render on load
  renderData(selectedGroup)
  //global elements
  let groupSel = $('#groupSelect')
  let carContainer = $('.cars-container')
  const filters = $("#filters :checkbox")

  //when clicking on checkboxes
  filters.on('click', (e) => {
    if ($("#a-transmission").prop("checked")) {
      //if all option is disabled
      if (currentJson.length != 0) {
        if (selectedGroup != 'all') {
          currentJson = Object.values(currentJson).filter(function (item) {
            return item.TransmissionType == 'Automatic';
          })
          console.log(currentJson);
        } else {
          if (!currentJson.cars) {
            currentJson = Object.values(currentJson).filter(function (item) {
              return item.Company1.TransmissionType == 'Automatic'
            })
          } else {
            currentJson = Object.values(currentJson.cars).filter(function (item) {
              return item.Company1.TransmissionType == 'Automatic'
            })
          }
        }
      } else {
        alert('No hay mas datos para mostrar :(')
      }

    }
    if ($("#m-transmission").prop("checked")) {
      if (currentJson.length != 0) {
        if (selectedGroup != 'all') {
          currentJson = Object.values(currentJson).filter(function (item) {
            return item.TransmissionType == 'Manual';
          })
          console.log(currentJson);
        } else {
          if (!currentJson.cars) {
            currentJson = Object.values(currentJson).filter(function (item) {
              return item.Company1.TransmissionType == 'Manual'
            })
          } else {
            currentJson = Object.values(currentJson.cars).filter(function (item) {
              return item.Company1.TransmissionType == 'Manual'
            })
          }
        }
      } else {
        alert('No hay mas datos para mostrar :(')
      }
    }
    if ($("#5-seats").prop("checked")) {
      if (currentJson.length != 0) {
        if (selectedGroup != 'all') {
          console.log('entro aca');
          currentJson = Object.values(currentJson).filter(function (item) {
            return item.Features2.seats == '5';
          })
        } else {
          if (!currentJson.cars) {
            currentJson = Object.values(currentJson).filter(function (item) {
              return item.Company1.Features2.seats == '5';
            })
          } else {
            currentJson = Object.values(currentJson.cars).filter(function (item) {
              return item.Company1.Features2.seats == '5';
            })
          }
        }
      } else {
        alert('No hay mas datos para mostrar :(')
      }
    }
    if ($("#7-seats").prop("checked")) {
      if (currentJson.length != 0) {
        if (selectedGroup != 'all') {
          currentJson = Object.values(currentJson).filter(function (item) {
              return item.Features2.seats > '5';
          })
        } else {
          if (!currentJson.cars) {
            currentJson = Object.values(currentJson).filter(function (item) {
              return parseInt( item.Company1.Features2.seats) > parseInt('5');
            })
          } else {
            currentJson = Object.values(currentJson.cars).filter(function (item) {
              console.log(parseInt( item.Company1.Features2.seats) > parseInt('5'));
              return parseInt( item.Company1.Features2.seats) > parseInt('5');
            })
          }
        }
      }
    }
    renderExistingData(currentJson);
    
    if (currentJson.length == 0) {
      carContainer.empty();
    } else {}
  })

  //listen for select change
  groupSel.on('change', () => {
    selectedGroup = groupSel.val()
    renderData(selectedGroup)
  })

  //Modals Info
  $(document).on('click', "#modalButtonAR", (e) => {
    $.getJSON("../Assets/CarsJson.json", function (data) {
      $(".modal-body").empty()
      let groupClass = $(e.target).attr("class").split(' ')[0];
      let inclusionsArray = data.cars[groupClass].Company1.Rates.AR.RateData.inclusions

      $(".modal-subtitle").html(`
        <h6>AR - ${data.cars[groupClass].Company1.Rates.AR.RateData.name}</h6>
      `)
      inclusionsArray.map((val, i) => {
        $(".modal-body").append(
          `<li class="ms-5 list-unstyled"><span class="text-danger ms-5 fa-li"><i class="fas fa-greater-than"></i></span>${val}</li>`
        )
      })
    })
  })


  $(document).on('click', "#modalButton4M", (e) => {
    $.getJSON("../Assets/CarsJson.json", function (data) {
      $(".modal-body").empty()
      let groupClass = $(e.target).attr("class").split(' ')[0];
      let inclusionsArray = data.cars[groupClass].Company1.Rates["4M"].RateData.inclusions

      $(".modal-subtitle").html(`
        <h6>4M - ${data.cars[groupClass].Company1.Rates["4M"].RateData.name}</h6>
      `)
      inclusionsArray.map((val, i) => {
        $(".modal-body").append(
          `<li class="ms-5 list-unstyled"><span class="text-danger ms-5 fa-li"><i class="fas fa-greater-than"></i></span>${val}</li>`
        )
      })
    })
  })

  $(document).on('click', "#modalButtonF2", (e) => {
    $.getJSON("../Assets/CarsJson.json", function (data) {
      $(".modal-body").empty()
      let groupClass = $(e.target).attr("class").split(' ')[0];
      let inclusionsArray = data.cars[groupClass].Company1.Rates["F2"].RateData.inclusions

      $(".modal-subtitle").html(`
        <h6>F2 - ${data.cars[groupClass].Company1.Rates["F2"].RateData.name}</h6>
      `)
      inclusionsArray.map((val, i) => {
        $(".modal-body").append(
          `<li class="ms-5 list-unstyled"><span class="text-danger ms-5 fa-li"><i class="fas fa-greater-than"></i></span>${val}</li>`
        )
      })
    })
  })

  $(document).on('click', "#modalButtonSC", (e) => {
    $.getJSON("../Assets/CarsJson.json", function (data) {
      $(".modal-body").empty()
      let groupClass = $(e.target).attr("class").split(' ')[0];
      let inclusionsArray = data.cars[groupClass].Company1.Rates["SC"].RateData.inclusions

      $(".modal-subtitle").html(`
        <h6>SC - ${data.cars[groupClass].Company1.Rates["SC"].RateData.name}</h6>
      `)
      inclusionsArray.map((val, i) => {
        $(".modal-body").append(
          `<li class="ms-5 list-unstyled"><span class="text-danger ms-5 fa-li"><i class="fas fa-greater-than"></i></span>${val}</li>`
        )
      })
    })
  })

  $(document).on('click', "#modalButtonH8", (e) => {
    $.getJSON("../Assets/CarsJson.json", function (data) {
      $(".modal-body").empty()
      let groupClass = $(e.target).attr("class").split(' ')[0];
      let inclusionsArray = data.cars[groupClass].Company1.Rates["H8"].RateData.inclusions

      $(".modal-subtitle").html(`
        <h6>H8 - ${data.cars[groupClass].Company1.Rates["H8"].RateData.name}</h6>
      `)
      inclusionsArray.map((val, i) => {
        $(".modal-body").append(
          `<li class="ms-5 list-unstyled"><span class="text-danger ms-5 fa-li"><i class="fas fa-greater-than"></i></span>${val}</li>`
        )
      })
    })
  })

  //end of modals Info

  const carComponent = (json) => {
    let company
    if(!json.Company1){
      company = json
    }else{
      company = json.Company1
    }
    return `
      <div  class = "mx-1200 m-auto bg-light p-4 mt-4 rounded-8 shadow-sm" >
            <div class="topRow d-flex justify-content-between align-items-center">
            <div class=" d-flex align-items-center justify-content-between" >
                <img src="${company.PictureURL}" width="350px" class="me-4" alt="">
                <div class="ms-5">
                  <h2 class="text-danger font-sbold">${company.Features2.category} </h2>
                  <ul class="list-unstyled ml-4">
                    <li> Group ${company.VehGroup} (${company.Code}) </li> 
                    <li>  ${company.Name}  </li> 
                  </ul>
                </div>
              </div>
              <button class="me-4 btn btn-danger hover:btn-dark">✓ Book Now!</button>
            </div>
            <div class="mt-5 d-flex justify-content-between">
              <div class="ms-45">
                <h6 class="text-dark text-opacity-50 font-sbold">CHARACTERISTICS</h6> 
                <ul class="char-list list-unstyled ">
                  <li>
                    <img class="icon"src="/Assets/seats.svg">
                    <p class="ch-text">${company.Features2.seats} seats</p> 
                  </li>
                  <li>
                    <img class="icon"src="/Assets/luggage.svg">
                    <p class="ch-text">${company.Features2.largeSuitcase} large suitcase</p> 
                  </li>
                  <li>
                    <img class="icon"src="/Assets/bag.svg">
                    <p class="ch-text">${company.Features2.smallSuitcase} small suitcase</p> 
                  </li>
                  <li>
                    <img class="icon"src="/Assets/door.svg">
                    <p class="ch-text">${company.Features2.doors} doors</p> 
                  </li>
                  <li>
                    <img class="icon"src="/Assets/transmision.svg">
                    <p class="ch-text">${company.Features2.transmition}</p> 
                  </li>
                  <li>
                    <img class="icon"src="/Assets/air-conditioning.svg">
                    <p class="ch-text">${company.Features2.air}</p> 
                  </li>
                </ul>
              </div>
              <div>
                <h6 class="text-dark text-opacity-50 font-sbold">AVAILABLE RATES</h6> 
                <div  class="av-rates">
      
                <div class="item" >
                  <div><input type="radio" checked> <span> AR - ${company.Rates.AR.RateData.name}</span></div> 
                  <button type="button" id="modalButtonAR" class="${company.VehGroup} text-danger border-0 bg-transparent" data-bs-toggle="modal" data-bs-target="#exampleModal" >Rate Inclusions</button>
                  <span class="text-danger ">${company.Rates.AR.CurrencyCode} <span class="font-bold h5 "> ${ parseFloat( company.Rates.AR.RateTotalAmount).toFixed(2) } </span> </span>
                </div>

                <hr>
                <div class="item">
                  <div><input type="radio" > <span> 4M - ${company.Rates["4M"].RateData.name}</span></div> 
                  <button id="modalButton4M" class="${company.VehGroup} modalButton4M text-danger border-0 bg-transparent" data-bs-toggle="modal" data-bs-target="#exampleModal">Rate Inclusions</button>
                  <span class="text-danger ">${company.Rates["4M"].CurrencyCode} <span class="font-bold h5"> ${ parseFloat( company.Rates["4M"].RateTotalAmount).toFixed(2) } </span> </span>
                </div>
                <hr>
                <div class="item">
                  <div><input type="radio" > <span> F2 - ${company.Rates["F2"].RateData.name}</span></div> 
                  <button id="modalButtonF2" class="${company.VehGroup} modalButtonF2 text-danger border-0 bg-transparent" data-bs-toggle="modal" data-bs-target="#exampleModal">Rate Inclusions</button>
                  <span class="text-danger ">${company.Rates["F2"].CurrencyCode} <span class="font-bold h5"> ${ parseFloat( company.Rates["F2"].RateTotalAmount).toFixed(2) } </span> </span>
                </div>
                <hr>
                <div class="item">
                  <div><input type="radio" > <span> SC - ${company.Rates["SC"].RateData.name}</span></div> 
                  <button id="modalButtonSC" class="${company.VehGroup} modalButtonSC text-danger border-0 bg-transparent" data-bs-toggle="modal" data-bs-target="#exampleModal">Rate Inclusions</button>
                  <span class="text-danger ">${company.Rates["SC"].CurrencyCode} <span class="font-bold h5"> ${ parseFloat( company.Rates["SC"].RateTotalAmount).toFixed(2) } </span> </span>
                </div>
                <hr>
                <div class="item">
                  <div><input type="radio" > <span> H8 - ${company.Rates["H8"].RateData.name}</span></div> 
                  <button id="modalButtonH8" class="${company.VehGroup} modalButtonH8 text-danger border-0 bg-transparent" data-bs-toggle="modal" data-bs-target="#exampleModal">Rate Inclusions</button>
                  <span class="text-danger ">${company.Rates["H8"].CurrencyCode}  <span class="font-bold h5"> ${ parseFloat( company.Rates["H8"].RateTotalAmount).toFixed(2) } </span> </span>
                </div>

                </div>
              </div>
            </div>
          </div>
  `
  }
})