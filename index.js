(function (){
    let btn = document.querySelector('.option__btn_order')
let list = document.querySelector('.option__list_order')
btn.addEventListener('click',()=>{
    list.classList.toggle('option__list_active')
    list2.classList.remove('option__list_active')
})
list.addEventListener('click',function (){
    btn.textContent = event.target.textContent
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
    let items = list2.querySelectorAll('.option__item')
    items.forEach((el)=>{
        el.classList.remove('option__item_active')
    })
    event.target.classList.add('option__item_active')
    list2.classList.toggle('option__list_active')
})
})()

/////////////
/////////////

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
            city.classList.remove('city_active')
        }
    })
/////////////
/////////////

let modal = document.querySelector('.overlay_vacancy')

let resultItems = document.querySelector('.result__list')

resultItems.addEventListener('click',()=>{

    if(event.target.dataset.vacancy){
        event.preventDefault()
        modal.classList.add('overlay_active')
    }
    if(event.target.classList.contains(' vacancy__open-modal')){
        modal.classList.add('overlay_active')
    }
})

let modalClose= document.querySelector('.modal__close')

modalClose.addEventListener('click', ()=>{
    modal.classList.remove('overlay_active')
})

document.querySelector('.overlay_vacancy').addEventListener('click', ()=>{
    if(event.target.classList.contains('overlay_vacancy')){
    modal.classList.remove('overlay_active')
    }
})


///////
//render card
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

function getData(obj){
  if(obj ){
    return fetch(`http://localhost:3000/api/vacancy?search=${obj.search}`)
    .then((data)=>{
    return data.json()
      })
  }
return fetch('http://localhost:3000/api/vacancy')
.then((data)=>{
  return data.json()
})
}
async function getInfo(){
  let cards = await getData()
  console.log(cards)
  renderCard(cards)
}

getInfo()
actualFound(null)

let formSearch = document.querySelector('.bottom__search')
formSearch.addEventListener('submit', ()=>{
  event.preventDefault()

  let text = formSearch.search.value
  if(text.length < 2){
    formSearch.search.style.borderColor = 'red'
  }else{
    formSearch.search.style.borderColor = '#888b8c'
    getData({search: text}).then((data)=>{
      renderCard(data)
      actualFound(data.length, text)
      })
  }
})

function actualFound(numb, search){
  let find = document.querySelector('.found')
  if(!numb && numb !== 0){
    find.style.display = 'none'
    return
  }
  else{
    find.style.display = 'block'
  }
  find.innerHTML = `${numb} вакансий
  <span class='found__item'>"${search}"</span>`
}
