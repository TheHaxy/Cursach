import {BasketStorage} from "../Product/basketStorage.js";


const catalogContainer = document.querySelector('.catalog')

const basketStorage = new BasketStorage()

let produtctsHTML = ''

function stringToBoolean(str) {
  return str === 'true';
}

function renderProduct(product, index) {
  produtctsHTML += `<div class="product-content products ${index}"  data-value="${index}" data-category="1">
                        <img src="../img/img${product.id}.jpg" alt="Изображение" class="product-img">
                        <h3 class="product-name">${product.name}</h3>
                        <div class="price">${numberFormat(product.price)}</div>
                        <a href="../Product/products/product${index}.html" class="linkprice">
                        <div class="price-button">Подробнее...</div></a>
                        <div class="baskets-button" data-id="${product.id}">Удалить из корзины</div>
                      </div>`
}


basketStorage.getBasket().forEach(renderProduct)

basketStorage.subscribe((basket) => {
  catalogContainer.innerHTML = ''
  produtctsHTML = ''
  basket.forEach(renderProduct)
  catalogContainer.innerHTML = produtctsHTML
})

catalogContainer.innerHTML = produtctsHTML


catalogContainer.addEventListener("click", (e) => {
  const target = e.target
  const id = target.getAttribute('data-id')
  if (!id) return;

  const inBasket = stringToBoolean(target.getAttribute('data-is-in-basket'))
  if (inBasket) return;

  basketStorage.removeBasketElemById(id)

  target.setAttribute('data-is-in-basket', true)

})

function numberFormat(number){
  return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(number)
}
const $summary = document.querySelector("[data-summary]")
$summary.textContent =  numberFormat(basketStorage.getSummary())

basketStorage.subscribe(() => {
  $summary.textContent = numberFormat(basketStorage.getSummary())
})

if (basketStorage.getBasket().length === 0){
  catalogContainer.innerHTML = '<div class="void-basket">Ваша корзина пуста!</div>'
}

basketStorage.subscribe((basket) => {
  if (basket.length === 0){
    catalogContainer.innerHTML = '<div class="void-basket">Ваша корзина пуста!</div>'
  }
})

