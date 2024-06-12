let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");
let basket =JSON.parse(localStorage.getItem("Data")) || [];

let calculation =() => {
    let  cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x)=>x.item).reduce((x,y)=>x+y,0)
}

calculation();
let generateCartItems = () => {
    if (basket.length !==0 ){
        return (ShoppingCart.innerHTML = basket.map((x)=>{
            let {id,item} = x;
            let search = shopItemsData.find((y)=>y.id === id) || [];
            let {img ,name , price} = search;
            return `
            <div class = "cart-item">
                <img width="100" src=${img} alt="">
                <div class="details">
                    <div class="title-price-x">
                        <h4 class="title-price">
                            <p>${name}</p>
                            <p class="cart-item-price">$${price}</p>
                        </h4>
                        <i  onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                    </div>
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">${item}</div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
                    <h3>$${item * search.price}</h3>
                </div>
            </div>
            `
        }).join(""));
    }
    else{
        ShoppingCart.innerHTML = ``;
        label.innerHTML = `
        <h2>Cart is Empty.</h2>
        <a href="cart.html">
           <button class="HomeBtn">Back to Shop</button>
        </a>
        `;
    }
};

generateCartItems();

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined){
        basket.push({
            id:selectedItem.id,
            item:1,
        });
    }else{
        search.item += 1;
    }
    generateCartItems();

    update(selectedItem.id);
    localStorage.setItem("Data",JSON.stringify(basket));
};

let decrement = (id) => {
    let selectedItem = id;

    let search = basket.find((x) => x.id === selectedItem.id);

    if (search===undefined) return;
    else if (search.item === 0){
        return;
    }else{
        search.item -= 1;
    }
    update(selectedItem.id);
    basket = basket.filter((x)=>x.item !==0);
    generateCartItems();

    localStorage.setItem("Data",JSON.stringify(basket));
};

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    TotalAmount();
};

let removeItem = (id) => {
    let selectedItem = id;
    basket = basket.filter((x)=>x.id !== selectedItem.id);
    generateCartItems();
    TotalAmount();
    calculation();
    localStorage.setItem("Data",JSON.stringify(basket));
};

let clearCart = () => {
    basket = [];
    generateCartItems();
    calculation();
    localStorage.setItem("Data",JSON.stringify(basket));

};

let checkoutItems = () => {
    if (basket.length !==0 ){
        return (ShoppingCart.innerHTML = basket.map((x)=>{
            let {id,item} = x;
            let search = shopItemsData.find((y)=>y.id === id) || [];
            let {img ,name , price} = search;
            return `
            <div class = "cart-item">
                <img width="100" src=${img} alt="">
                <div class="details">
                    <div class="title-price-x">
                        <h4 class="title-price">
                            <p>${name}</p>
                            <p class="cart-item-price">$${price}</p>
                        </h4>
                        <i  onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                    </div>
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">${item}</div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
                    <h3>$${item * search.price}</h3>
                </div>
            </div>
            `
        }).join(""));
    }
    else{

        ShoppingCart.innerHTML = ``;
        label.innerHTML = `
        <h2>Your order being Placed...</h2>
        `;
    }
};

let checkout = () => {
    basket = [];
    calculation();
    checkoutItems();
    localStorage.setItem("Data",JSON.stringify(basket));
}

let TotalAmount = () =>{
    if (basket.length !== 0){
        let amount = basket.map((x)=>{
           let {item,id} = x;
            let search = shopItemsData.find((y)=>y.id === id) || [];
            return item * search.price;
        }).reduce((x,y)=>x+y,0);
       label.innerHTML = `
       <h2>Total Bill : $${amount}</h2>
       <button onclick="checkout()" class="checkout">Checkout</button>
       <button onclick="clearCart()" class="removeAll">Clear Cart</button>
       `
    }
    else {
        return;
    }
};

document.getElementById('user-details-form').addEventListener('submit', function(event) {

    let firstname = document.getElementById('firstname').value;
    let surname = document.getElementById('surname').value;
    let email = document.getElementById('email').value;
    let cardnumber = document.getElementById('cardnumber').value;
    let holdername = document.getElementById('holdername').value;
    let ex_date = document.getElementById('ex_date').value;
    let ccv = document.getElementById('ccv').value;
    let address1 = document.getElementById('address1').value;
    let town = document.getElementById('town').value;
    let zip = document.getElementById('zip').value;
    let country = document.getElementById('country').value;

    if (!firstname || !email || !address1 || !surname || !cardnumber || !holdername || !ex_date || !ccv || !town || !zip || !country) {
        alert('Please fill in all required fields.');
        return;6
    }
    processOrder(firstname,email,address1,surname,cardnumber,holdername,ex_date,ccv,town ,zip ,country);
});

function processOrder(firstname,email,address1,surname,cardnumber,holdername,ex_date,ccv,town ,zip ,country) {
    alert('Your Information are updated..');
}
TotalAmount();
shop();