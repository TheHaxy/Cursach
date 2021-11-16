export class BasketStorage {
  static PRODUCT_KEY = 'product-storage'
  static EmptyBasket = []

  constructor( ) {
    this.listeners = []

    if (!this.checkStorage()) this.defineStorage()
    this.basket = this.getBasket()
  }

  /**
   * Проверяет существует ли у нас ключ "product-storage" в localStorage
   * @return {boolean} Сущестивет ли хранилище или нет
   */
  checkStorage() {
    return Boolean(localStorage.getItem(BasketStorage.PRODUCT_KEY))
  }

  defineStorage() {
    localStorage.setItem(BasketStorage.PRODUCT_KEY, JSON.stringify(BasketStorage.EmptyBasket))
  }

  /**
   * отдает корзину
   * @return {object} Коризина из localStorage
   */
  getBasket() {
    return JSON.parse(localStorage.getItem(BasketStorage.PRODUCT_KEY))
  }

  /**
   * Добавляет новый продукт в корзину
   * @param {object} product
   * @return {void} Nothing
   */
  setItem(product) {
    this.basket.push(product)
    this._replaceStorageBasket(this.basket)
    this._notify()
  }

  /**
   * Ищет элемент по id в корзине
   * @param {string, number} id
   * @return {void} Nothing
   */
  findInStorageById(id) {
    return this.basket.find(basket => basket.id === id)
  }

  /**
   * Удаляет элемент из корзины по id
   * @param {string, number} id
   * @return {void} Nothing
   */
  removeBasketElemById(id) {
    const newBasket = this.basket.filter(basket => basket.id != id)
    this.basket = newBasket
    this._replaceStorageBasket(newBasket)
    this._notify()
  }

  /**
   * Подписываемя на изменения корзины
   * @param {function} callback
   * @return {void} Nothing
   */
  subscribe(callback) {
    this.listeners.push(callback)
  }

  /**
   * внутренний метод перезаписи localStorage
   * @param {array} newBasket
   * @return {void} Nothing
   */
  _replaceStorageBasket(newBasket) {
    localStorage.setItem(BasketStorage.PRODUCT_KEY, JSON.stringify(newBasket))
  }

  /**
   * Уведомляет всех слушателей
   * @return {void} Nothing
   */
  _notify() {
    this.listeners.forEach((listener) => listener(this.basket))
  }

  /**
   * Возвращает общую сумму корзины
   * @return {number} Сумма всей корзины
   */

  getSummary() {
    return this.basket.reduce((acc, item) => acc + item.price, 0);
  }
}

