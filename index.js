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