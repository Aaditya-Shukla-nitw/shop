class Item {
    constructor(name, price, imageLink, category) {
        this.name = name;
        this.price = price;
        this.imageLink = imageLink;
        this.category = category;
    }

}

let darkMode = localStorage.getItem('darkMode') === 'enabled';

function toggleDarkMode() {
darkMode = !darkMode;
localStorage.setItem('darkMode', darkMode ? 'enabled' : 'disabled');
document.querySelector('.hidden').style.backgroundColor = darkMode ? 'black' : 'white';
document.querySelector('img').style.filter = darkMode ? 'invert(1)' : 'invert(0)';
document.querySelectorAll('a').forEach(item => {
  item.style.color = darkMode ? 'white' : 'black';
});
document.querySelector('.ban').style.filter = darkMode ? 'invert(1)' : 'invert(0)';
document.querySelector('body').style.backgroundColor = darkMode ? 'black' : 'white';
document.querySelector('h2').style.color = darkMode ? 'white' : 'black';

document.querySelectorAll('.card').forEach(item => {
  item.style.color = darkMode ? 'white' : 'black';
  item.style.borderColor = darkMode ? 'white' : 'black';
});
document.querySelector('.banner').style.backgroundColor = darkMode ? 'black' : 'white';

}

if (darkMode) {
document.querySelector('.hidden').style.backgroundColor = 'black';
document.querySelector('img').style.filter = 'invert(1)';
document.querySelectorAll('a').forEach(item => {
  item.style.color = 'white';
});
document.querySelector('.ban').style.filter = 'invert(1)';
document.querySelector('body').style.backgroundColor = 'black';
document.querySelector('h2').style.color = 'white';

document.querySelectorAll('.card').forEach(item => {
  item.style.color = 'white';
  item.style.borderColor = 'white';
});
document.querySelector('.banner').style.backgroundColor = darkMode ? 'black' : 'white';
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
function total(){
    let total = 0;
    cart.forEach(item => {
        total += parseFloat((item.price).substring(1, item.price.length));
    });
    
    let tot = document.querySelector('.total');
    tot.innerHTML = `TOTAL: $${total}`;
}
function remove(event){
    let parentDiv = event.target.parentElement.parentElement;
    let itemName = parentDiv.querySelector('.item-name').textContent;

    cart = cart.filter(cartItem => cartItem.name !== itemName);
    saveCart();
    let cards = document.querySelector('.cards');
    cards.innerHTML = '';
    console.log('Item removed from cart');
    loadCart();
    total();
}
function loadCart(){
    console.log('Loading cart: ', cart);
    let cards = document.querySelector('.cards');
    if(cart.length === 0){
        cards.innerHTML = '<h3 class="empty">Your cart is empty</h3>';
        return;
    }
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
        card.className="card";
        cards.appendChild(card);
    });
    total();
}
