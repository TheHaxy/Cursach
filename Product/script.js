import {BasketStorage} from "./basketStorage.js";

export const products = [
    {
        name: "Белый приталенный пиджак",
        price: 7990,
        type: 1,
        id: 1
    },
    {
        name: "Пиджак TROSHIN DESIGN",
        price: 9521,
        type: 1,
        id: 2
    },
    {
        name: "Брюки TROSHIN DESIGN",
        price: 1235,
        type: 3,
        id: 3
    },
    {
        name: "Белые брюки",
        price: 1920,
        type: 3,
        id: 4
    },
    {
        name: "Рубашка TROSHIN DESIGN",
        price: 1990,
        type: 2,
        id: 5
    },
    {
        name: "Рубашка для высоких",
        price: 6990,
        type: 2,
        id: 6
    },
    {
        name: "Броги TROSHIN DESIGN",
        price: 7120,
        type: 4,
        id: 7
    },
    {
        name: "Туфли TROSHIN DESIGN",
        price: 4120,
        type: 4,
        id: 8
    }
]


const basketStorage = new BasketStorage()

function stringToBoolean(str) {
    return str === 'true';
}

function renderProduct(index, product) {

    const isInBasket = Boolean(basketStorage.findInStorageById(product.id))
    produtctsHTML += `<div class="product-content products ${index}"  data-value="${index}" data-category="1">
                        <img src="../img/img${product.id}.jpg" alt="Изображение" class="product-img">
                        <h3 class="product-name">${product.name}</h3>
                        <div class="price">${numberFormat(product.price)}</div>
                        <a href="products/product${index}.html" class="linkprice"><div class="price-button">Подробнее...</div></a>
                        <div class="baskets-button ${isInBasket ? 'baskets-active' : ''}" data-id="${product.id}" 
                        data-is-in-basket="${isInBasket}">${isInBasket ? "В корзине" : "Добавить в корзину"}</div>
                      </div>`
}

const catalogContainer = document.querySelector(`[data-type="catalog"]`)
const chooseContainer = document.querySelector(`[data-type="choose"]`)
let basketsButton = document.getElementsByClassName('baskets-button')
let produtctsHTML = ''
let basketsHTML = ''

products.forEach((product, index) => {
    console.log(product)
    index += 1
    renderProduct(index, product)
})
catalogContainer.innerHTML = produtctsHTML

chooseContainer.addEventListener('click', (e) => {
    e.preventDefault()
    const value = e.target.getAttribute('value')
    if (!value) return
    produtctsHTML = ''
    catalogContainer.innerHTML = produtctsHTML

    products.forEach((product, index) => {
        if (+value && product.type !== +value) return
        index += 1
        renderProduct(index, product)
    })
    catalogContainer.innerHTML = produtctsHTML

})

function findProductById(id) {
    return products.find((product) => product.id == id)
}

/**
 * тут навешивается обработчик событий на весь контейнер продуктов и слушается клик по кнопке "Добавить в корзину"
 */
catalogContainer.addEventListener("click", (e) => {
    const target = e.target
    const id = target.getAttribute('data-id')
    if (!id) return;

    const inBasket = stringToBoolean(target.getAttribute('data-is-in-basket'))
    if (inBasket) return;

    basketStorage.setItem(findProductById(id))

    target.classList.add("baskets-active");
    target.textContent = "В корзине";
    target.setAttribute('data-is-in-basket', true)
})

function numberFormat(number){
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(number)
}
