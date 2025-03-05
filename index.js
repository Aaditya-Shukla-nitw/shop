class Item {
    constructor(name, price, imageLink, category) {
        this.name = name;
        this.price = price;
        this.imageLink = imageLink;
        this.category = category;
    }

}

// Example usage:
// Assuming you have a button with an onclick attribute set to item.addToCart(event)
// <button onclick="item.addToCart(event)">Add to Cart</button>
let cart = JSON.parse(localStorage.getItem('cart')) || [];
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}
function addToCart(event) {
    let parentDiv = event.target.parentElement.parentElement.parentElement;
    console.log('Parent div:', parentDiv);
    let itemName = parentDiv.querySelector('.item-name').textContent;
    let itemPrice = parentDiv.querySelector('.item-price').textContent;
    let imageLink = parentDiv.querySelector('.image-link').src;
    let category = parentDiv.querySelector('.category').textContent;

    let item = new Item(itemName, itemPrice, imageLink, category);
    cart.push(item);
    console.log('cart:',cart);
    saveCart();
    console.log('Item added to cart');
}
function remove(event){
    let parentDiv = event.target.parentElement.parentElement;
    let itemName = parentDiv.querySelector('.item-name').textContent;

    cart = cart.filter(cartItem => cartItem.name !== itemName);
    saveCart();
    console.log('Item removed from cart');
    loadCart();
}
function loadCart(){
    console.log('Loading cart: ', cart);
    let cards = document.querySelector('.cards');
    cart.forEach(item => {
        let card = document.createElement('div');
        card.innerHTML = `
        <img class="image-link" src="${item.imageLink}" alt="card1" />
        <div class="description">
          <h5 class="item-name">${item.name}</h5>
          <hr>
          <p class="category">${item.category}</p>
          <p class="item-price">${item.price}</p>
          <center>
          <button onclick="remove(event)">Remove</button>
        </center>
        </div>`;
        cards.appendChild(card);
    });
}