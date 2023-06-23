// opening, closing of ham-burger in responsive

const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar')

if (bar) {
    bar.addEventListener('click', ()=> {
        nav.classList.add('active')
    })
}

if (close) {
    close.addEventListener('click', ()=> {
        nav.classList.remove('active')
    })
}

// --------------------------------------------------









// cart
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

// open cart
cartIcon.onclick = () =>{
    cart.classList.add('active');
};

// close cart
closeCart.onclick = () =>{
    cart.classList.remove('active');
};









// cart working

if (document.readystate == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
}else{
    ready();
}

// making function
function ready() {
    // remove item from cart
    var removeCartButtons = document.getElementsByClassName('remove-cart');
    console.log(removeCartButtons);
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }
    
    // Quantity changes
    var quantityInputs = document.getElementsByClassName('cart-quantity')
    for (var i = 0; i < quantityInputs.length; i++){
    var input = quantityInputs[i]
    input.addEventListener('change', quantityChanged);
    }

    // Add to cart
    var addCart = document.getElementsByClassName('add-cart')
    for (var i = 0; i < addCart.length; i++){
        var button = addCart[i]
        button.addEventListener('click', addCartClicked);
    }
}








// remove item from cart function ----------
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}

// Quantity changes function----------
function quantityChanged(event){
    var input = event.target
    if (isNaN(input.value) || input. value <= 0) {
        input.value = 1;
    }
    updatetotal();
}

// add to cart function -----------
function addCartClicked(event){
    var button = event.target
    var shopProducts = button.parentElement
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText
    var price = shopProducts.getElementsByClassName('price')[0].innerText
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title,price,productImg);
    // console.log(title,price,productImg);
    updatetotal();
}

function addProductToCart(title, price, productImg){
    var cartShopBox= document.createElement("div");
    cartShopBox.classList.add('cart-box')
    var cartItems = document.getElementsByClassName('cart-content')[0]
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title")
    for (var i = 0; i < cartItemsNames.length; i++){
        // alert("You have already added this item to cart");  
        // return;
    }

    
    var cartBoxContent = `
           
    <img src="${productImg}" alt="" class="cart-img">
    <div class="detail-box">
    <div class="cart-product-title">${title}</div>
    <div class="cart-price">${price}</div>
    <input type="number" value="1" class="cart-quantity">
    </div>
    <!-- remove cart -->
    <i class="fas fa-trash remove-cart"></i>`;
    cartShopBox.innerHTML = cartBoxContent
    cartItems.append(cartShopBox)
    cartShopBox.getElementsByClassName('remove-cart')[0].addEventListener('click', removeCartItem)
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged)
}








// update total
function updatetotal(){
    var cartContent = document.getElementsByClassName('cart-content')[0]
    var cartBoxes = cartContent.getElementsByClassName('cart-box')
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i]
        var priceElement = cartBox.getElementsByClassName('cart-price')[0]
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0]
        var price = parseFloat(priceElement.innerText.replace("$", ""))
        var quantity = quantityElement.value
        total = total + (price * quantity);
    }
        // if price contain some cents value
        total = Math.round(total *100)/100

        document.getElementsByClassName('total-price')[0].innerText = '$' + total;
    
}