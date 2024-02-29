
function SSsortByParams(){
  console.log('Сортируем данные')
  sortByDateUpDown()
  let dataNext = sortByDatePeriod()
  let dataNext2 = sortByFormData(dataNext)

  renderCard(dataNext2)
}
function sortByDateUpDown(){

    switch (document.getElementById('order_by').value){
      case 'up':
        data.sort((a,b)=>{
          return a.minCompensation > b.minCompensation ? 1 : -1
        })
          break
      case 'down':
        data.sort((a,b)=>{
          return a.minCompensation < b.minCompensation ? 1 : -1
        })
          break
      case 'date':
        data.sort((a,b)=>{
           if(new Date(a.date).getTime() > new Date(b.date).getTime()){
            return 1
           }
            return -1

        })
            break
    }
    return data
  }
function sortByDatePeriod(array = data){
    let dateNow = new Date()
    dateNow.setDate(dateNow.getDate() - document.getElementById('search_period').value)
    return array.filter((el)=>{
       if(new Date(el.date).getTime() > new Date(dateNow).getTime()){
        return true
      }
    })
  }
function sortByFormData(dataArr){
    let arr = document.querySelectorAll('.filter__input')
    let a = Array.from(arr).filter((el)=>{
    return el.checked
    }).reduce((acc, el)=>{
    if(acc[el.name]){
      acc[el.name] = [acc[el.name], el.value].flat()
    }else{
      acc[el.name] = el.value
    }
    return acc
    },{})
    let array = null
    // console.log(dataArr)
    if(a.hasOwnProperty('salary')){
     array = sortBySalary(a.salary, array ? array : dataArr)
    }
    if(a.hasOwnProperty('experience')){
      array = sortByExperiense(a.experience, array ? array : dataArr)
    }
    if(a.hasOwnProperty('region')){
      array = sortByCity(a.region, array ? array : dataArr)
    }
    if(a.hasOwnProperty('type')){
      array = sortByEmployment(a.type, array ? array : dataArr)
    }
    console.log(array)
    return array ? array: dataArr

    function sortBySalary(salary, array){
      return array.filter((el)=>{
        return el.minCompensation >= salary
      })
    }
    function sortByCity(city, array ){

      return array.filter((el)=>{
        if(Array.isArray(city))
        {
        for(let i = 0 ; i < city.length; i++){
          if(el.address === city[i]){
            return true
          }
        }
      }else{
        if(el.address === city){
          return true
        }
      }
      })
    }
    function sortByExperiense(experience, array){
      return array.filter((el)=>{
        if(Array.isArray(experience))
        {
        for(let i = 0 ; i < experience.length; i++){
          if(el.experience === experience[i]){
            return true
          }
        }
      }else{
        if(el.experience === experience){
          return true
        }
      }
      })
    }
 function sortByEmployment(employm, array){

      let arr = []

      for(let i = 0; i < array.length; i++){

        if(Array.isArray(employm)){

        for(let k = 0; k < employm.length;k++){
          console.log(array[i] === employm[k])
          for(let m = 0 ; m < array[i].employment.length;m++){
            if(array[i].employment[m] === employm[k]){
              arr.push(array[i])
            }
          }
        }


      }
      else{

        if(array[i].employment.includes(employm)){
          arr.push(array[i])
        }
      }
      }

      return arr
}
}


function headParams(){
    let btn = document.querySelector('.option__btn_order')
let list = document.querySelector('.option__list_order')
btn.addEventListener('click',()=>{
    list.classList.toggle('option__list_active')
    list2.classList.remove('option__list_active')
})
list.addEventListener('click',()=>{
    btn.textContent = event.target.textContent
    document.getElementById('order_by').value = event.target.dataset.sort

    SSsortByParams()

    let items = list.querySelectorAll('.option__item')
    items.forEach((el)=>{
        el.classList.remove('option__item_active')
    })
    event.target.classList.add('option__item_active')
    list.classList.toggle('option__list_active')
})

let period = document.querySelector('.option__btn_period')
let list2 = document.querySelector('.option__list_period')
period.addEventListener('click',()=>{
    list2.classList.toggle('option__list_active')
    list.classList.remove('option__list_active')
})

list2.addEventListener('click',()=>{
    period.textContent = event.target.textContent
    document.getElementById('search_period').value = event.target.dataset.date

    SSsortByParams()

    let items = list2.querySelectorAll('.option__item')
    items.forEach((el)=>{
        el.classList.remove('option__item_active')
    })
    event.target.classList.add('option__item_active')
    list2.classList.toggle('option__list_active')
  })
  document.addEventListener('click',()=>{
  if(event.target !== btn && event.target !== period ){
    list.classList.remove('option__list_active')
    list2.classList.remove('option__list_active')
  }
})
}
headParams()

/////////////
let data = []
/////////////
///Модальне вікно міст, (зверху зліва)
    let topCity = document.querySelector('.top__city')
    let city = document.querySelector('.city')
    let cityClose = document.querySelector('.city__close')
    let cityRegion = document.querySelector('.city__region')

    topCity.addEventListener('click',()=>{
        city.classList.toggle('city_active')
    })

    cityClose.addEventListener('click',()=>{
        city.classList.remove('city_active')
    })

    cityRegion.addEventListener('click',()=>{
        if(event.target.classList.contains('city__link')){
          topCity.textContent = event.target.textContent

          let hash = new URL(event.target.href).hash.substring(1)

          let options = {
            [hash]:topCity.textContent
          }

          getData(options).then(response=>{
            data = response
            SSsortByParams()
          })
            city.classList.remove('city_active')
        }
    })
/////////////
/////////////

let modalItem = document.querySelector('.overlay_vacancy')
let resultItems = document.querySelector('.result__list')
resultItems.addEventListener('click',()=>{
    if(event.target.dataset.vacancy){
        event.preventDefault()
        createModal.call(modalItem, event.target.dataset.vacancy)
    }
    if(event.target.classList.contains(' vacancy__open-modal')){
        createModal.call(modalItem, event.target.dataset.vacancy)
    }
})
document.querySelector('.overlay_vacancy').addEventListener('click', ()=>{
    if(event.target.classList.contains('overlay_vacancy')){
      document.querySelector('.overlay_active').innerHTML = ''
      document.querySelector('.overlay_active').classList.remove('overlay_active')
    }
})

async function createModal(id){

let  {
  address,
  compensation,
  description,
  employer,
  experience,
  skills,
  title,
  employment
} = await getData(null, id)

let modal = document.createElement('div')
modal.className = 'modal'
modal.innerHTML = `
  <h2 class="modal__title">${title}</h2>
  <p class="modal__compensation">${compensation}</p>
  <p class="modal__employer">${employer}</p>
<p class="modal__address">${address}</p>
  <p class="modal__experience">Требуемый опыт работы: ${experience}</p>
  <p class="modal__employment">${employment.join(', ')}</p>
  <p class="modal__description">${description}</p>
  <div class="modal__skills skills">
    <h2 class="skills__title">Подробнее:</h2>
    <ul class="skills__list">
    </ul>
  </div>

  <button class="modal__response">Отправить резюме</button>
  `
  skills.forEach((el)=>{
    let li = document.createElement('li')
    li.className = 'skills__item'
    li.textContent = el
    modal.querySelector('.skills__list').append(li)
  })

  let btnClose = document.createElement('button')
  btnClose.className = 'modal__close'
  btnClose.textContent = 'X'
  btnClose.addEventListener('click',()=>{
    document.querySelector('.overlay_active').innerHTML = ''
    document.querySelector('.overlay_active').classList.remove('overlay_active')

  })
  modal.prepend(btnClose)

  this.classList.add('overlay_active')
  this.append(modal)
}

///////
///////
function renderCard(cards){
let list = document.querySelector('.result__list')
list.innerHTML = ''

cards.forEach((el)=>{

let{
id,
address,
compensation,
description,
employer,
title,
date,
workSchedule
} = el

list.insertAdjacentHTML('afterbegin',`
<li class="result__item">
             <article class="vacancy">
               <h2 class="vacancy__title"><a href="#" data-vacancy="${id}">${title}</a></h2>
               <p class="vacancy__compensation">${compensation}</p>
               <p class="vacancy__work-schedule">${workSchedule}</p>
               <div class="vacancy__employer">
                 <p class="vacancy__employer-title">${employer}</p>
                 <p class="vacancy__employer-address">${address}</p>
               </div>
               <div class="vacancy__description">
                 <p class="vacancy__description">${description}</p>
               </div>
               <p class="vacancy__date">
                 <time datetime="${date}">${date}</time>
               </p>
               <div class="vacancy__wrapper-btn">
                 <a class="vacancy__response" href="#" data-vacancy="${id}">Откликнуться</a>
                 <button class="vacancy__contacts">Показать контакты</button>
               </div>
             </article>
           </li>`)
          })
}
function getData(obj, id=''){
  let url = `http://localhost:3000/api/vacancy/${id}`
  if(obj){
    if(obj.search){
    url = `http://localhost:3000/api/vacancy?search=${obj.search}`
    }
    if(obj.country){
      url = `http://localhost:3000/api/vacancy?country=${obj.country}`
    }
    if(obj.city){
      url = `http://localhost:3000/api/vacancy?city=${obj.city}`
    }
  }
return fetch(url)
.then((data)=>{
  return data.json()
})
}
async function getInfo(){
  let cards = await getData()
  data = cards
  SSsortByParams()
}

let formSearch = document.querySelector('.bottom__search')
formSearch.addEventListener('submit', ()=>{
  event.preventDefault()

  let text = formSearch.search.value
  if(text.length < 2){
    formSearch.search.style.borderColor = 'red'
  }else{
    formSearch.search.style.borderColor = '#888b8c'
    getData({'search': text}).then((response)=>{
      data = response
      let sortByOrder = document.getElementById('order_by').value
      sort(sortByOrder)
      renderCard(data)
      actualFound(data.length, text)
      })
  }
})
///Рендер вакансій
getInfo()

/// Відображаємо дані про кількість знадених вакансій через пошук
actualFound(null)

function actualFound(numb, search){
  /// Правильне закінчення у цифр
  const declOfNum = (n, titles) => titles[n % 10 === 1 && n % 100 !== 11 ?
	  0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];

  let find = document.querySelector('.found')
  if(!numb && numb !== 0){
    find.style.display = 'none'
    return
  }
  else{
    find.style.display = 'block'
  }
  find.innerHTML = `${numb} ${declOfNum(numb,['вакансия','вакинсии','вакансий'])}
  <span class='found__item'>"${search}"</span>`
}

let filterForm = document.querySelector('.filter__form')
let btnFiltered = document.querySelector('.filter__apply')
let btnReset = document.querySelector('.filter__reset')
let filter = document.querySelector('.filter')
filter.addEventListener('click',()=>{
  if(event.target.classList.contains('filter__input')){
    btnFiltered.style.display = 'block'
  }
})
filterForm.addEventListener('submit',()=>{
  event.preventDefault()
  let arr = document.querySelectorAll('.filter__input')
  let a = Array.from(arr).filter((el)=>{
    return el.checked
  }).reduce((acc, el)=>{
    if(acc[el.name]){
      acc[el.name] = [acc[el.name], el.value].flat()
    }else{
      acc[el.name] = el.value
    }
    return acc
  },{})
  SSsortByParams()
})

btnReset.addEventListener('click',()=>{
  event.preventDefault()
  let arr = document.querySelectorAll('.filter__input')
  let a = Array.from(arr).filter((el)=>{
    return el.checked
  })
  a.forEach((el)=>{
    el.checked = false
  })
  btnFiltered.style.display = 'none'
  SSsortByParams()
})

