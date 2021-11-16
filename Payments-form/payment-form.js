import {BasketStorage} from "../Product/basketStorage.js";

const basketStorage = new BasketStorage()

function numberFormat(number){
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(number)
}

const $summary = document.querySelector("#data-summary")
$summary.value =  numberFormat(basketStorage.getSummary())

basketStorage.subscribe(() => {
    $summary.value = numberFormat(basketStorage.getSummary())
})

const $name = document.querySelector("#data-name")

for(let i = 0; i<basketStorage.getBasket().length; i++){
    $name.value += basketStorage.getBasket()[i].name + ", "
}



