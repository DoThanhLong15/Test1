function createId() {
  // trả về một chuỗi ngẫu nhiên gồm 12 ký tự: 0-9a-zA-Z;
  const characters = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
  ];
  let length = 12;
  let charactersLength = characters.length;
  let result = '';
  for (let i = 0; i < length; i++) {
    let idx = Math.floor(Math.random() * charactersLength);
    result += characters[idx];
  }
  return result;
}
const PRODUCTS = [
  {
    id: 'hBuZdx1elR5a',
    name: 'Fushigidane',
    thumb: 'Fushigidane.png',
    shortDesc:
      'Người ta thường thấy Fushigidane nằm ngủ dưới ánh nắng. Càng đắm mình trong nắng, hạt giống trên lưng chúng càng phát triển.',
    price: 12,
  },
  {
    id: 'fDQWzrgq6gXX',
    name: 'Hitokage',
    thumb: 'Hitokage.png',
    shortDesc: 'Tính cách ưa thích đồ nóng. Nghe nói khi trời mưa khói sẽ phụt ra từ đuôi của nó.',
    price: 15,
  },
  {
    id: 'aLjNSdeJi9Q2',
    name: 'Zenigame',
    thumb: 'Zenigame.png',
    shortDesc:
      'Chiếc mai của Zenigame không chỉ để tự vệ, mà còn làm giảm tối đa lực cản nước nhờ hình dáng tròn trịa cùng bề mặt nhiều rãnh, giúp chúng bơi nhanh hơn.',
    price: 25,
  },
  {
    id: 'rOYIHlZQlwdV',
    name: 'Pikachu',
    thumb: 'Pikachu.png',
    shortDesc: 'Những Pikachu có thể tạo ra dòng điện càng mạnh thì túi má càng mềm mại và lớn nhanh.',
    price: 32,
  },
  {
    id: 'zzC3HkWp9g4s',
    name: 'Purin',
    thumb: 'Purin.png',
    shortDesc:
      'Những bản thu âm tuyển tập bài hát ru kì lạ của Purin được bán tại các cửa hàng tạp hóa. Rất nhiều người coi chúng là vật gối đầu giường.',
    price: 9,
  },
];
let carts = [];
let count = 0;
let sumBuy = 0;
let quantityBuy = 0;
let tempQuantity = createTempQuantity();
let getFromProducts;
//window onload 
window.onload = () => {
  carts = localSaveProduct();
  // localStorage.clear();
  createListProducts();
  buyProduct();
  initBuyProduct();
  changeQuantity();
}
// create list Porduct in HTML
function createListProducts(){
  let xhtml = PRODUCTS.map(value => {
    return `
      <div class="row align-items-center">
        <div class="col-6 col-md-4">
          <img src="img/${value.thumb}" alt="" class="img-fluid">
        </div>
        <div class="col-6 col-md-8">
          <h6>${value.name}</h6>
          <div class="form-group">
            <div class="d-flex">
              <button class="btn btn-primary"> - </button>
              <input type="text" class="form-control mx-1" value="1" min="1">
              <button class="btn btn-primary"> + </button>
            </div>
            <button class="btn btn-danger btn-block mt-1 btn-add-to-cart btn-buy">${value.price}</button>
          </div>
        </div>
      </div> 
    `
  });
  document.getElementById('listProducts').innerHTML = xhtml;
}
//create temp quantity
function createTempQuantity() {
  let temp = [];
  const productLenght = PRODUCTS.length;
  for(let i = 0; i < productLenght; i++)
    temp.push(0);
  return temp;
}
//Choose quantity of product item
function changeQuantity(){
  getFormProducts = document.getElementsByClassName('form-group');  
  const formProductlength = getFormProducts.length;
  for(let i = 0; i < formProductlength; i++){
    let btnChangeQuantity = getFormProducts[i].querySelectorAll('.btn-primary');
    productChangeQuantity(btnChangeQuantity, i, getFormProducts[i]);
    checkQuantityNumBuy(getFormProducts[i].querySelector('input'), i);
  };
};
//check so luong product
function checkQuantityNumBuy(input,index) {
  input.addEventListener('change', () =>{
    let temp = parseInt(input.value*1);
    if(isNaN(temp)){
      window.alert('Vui lòng nhập số');
      input.value = 1;
    }
    // console.log(tempQuantity);
  });
}
//Click change quantity
function productChangeQuantity(btn, index, value){
  btn.forEach(x => {
    let quantity;
    x.addEventListener('click', () =>{
      quantity = parseInt(value.querySelector('input').value);
      if(x.innerText === "-")
      {
        if(quantity > 1)
        value.querySelector('input').value = --quantity;
      }
      else
        value.querySelector('input').value = ++quantity;
      // tempQuantity[index] = parseInt(value.querySelector('input').value);
      // console.log(tempQuantity);
    });
  });
}
//create temp Total cart
function totalCart() {
  document.getElementById('total-product').innerHTML = `
    <tr>
      <td colspan="4" >There are <span id="count" >${quantityBuy}</span> items in your shopping cart.</td>
      <td colspan="2"><span class="fw-bold text-danger" id="toTal">$${sumBuy}</span></td>
    </tr>
  `
  // console.log(tempQuantity);
}
//Click buy Item
function buyProduct() {
  let btnBuy = document.querySelectorAll('.btn-buy');
  const btnBuyLenght = btnBuy.length;
  for(let i = 0; i < btnBuyLenght; i++)
  {
    btnBuy[i].addEventListener('click', () => {
      listBuyProduct(i);
      console.log(carts);
      return;
    });
  }
}
//Init list buy product
function initBuyProduct(){
  if(carts !== []){
    carts.forEach((value, key) => {
      quantityBuy += value.quantity;
      let index = findProduct(value.name);
      tempQuantity[index] = value.quantity;
      count++;
      let totalPrice = value.price*value.quantity;
      sumBuy += totalPrice;
      addIntoCarts(value.id, value.name, value.price, value.quantity)
      updateQuantity(document.querySelectorAll('.product-item')[key]);
    })
  }
  totalCart();
}
//add cart product to html
function addIntoCarts(id, name, price, quantity) {
  document.getElementById('cardProducts').innerHTML += `
    <tr class = "product-item">
      <td class="idBuy">${id}</td>
      <td class = "product-name">${name}</td>
      <td>$${price}</td>
      <td>
        <input type="number" class="form-control" value="${quantity}" min="0">
      </td>
      <td><span class="fw-bold cost">${price*quantity}</span></td>
      <td>
        <button type="button" class="btn btn-link btn-sm btn-rounded btn-update">Update</button>
        <button type="button" class="btn btn-link btn-sm btn-rounded btn-delete">Delete</button>
      </td>
    </tr>
    `;
  // deleteEvent(document.querySelectorAll('.product-item')[count - 1], id - 1);
  console.log(document.querySelectorAll('.product-item')[id - 1]);
  updateQuantity(document.querySelectorAll('.product-item')[id - 1]);
  totalCart();
}
//list Buy Product
function listBuyProduct(index) {
  let quantity = parseInt(document.querySelectorAll('input[type="text"]')[index].value);
  let totalPrice = quantity*PRODUCTS[index].price;
  quantityBuy += quantity;
  sumBuy += totalPrice;
  let temp = tempQuantity[index] + quantity;
  // console.log(temp);
  if(tempQuantity[index] === 0){
    addIntoCarts(++count, PRODUCTS[index].name, PRODUCTS[index].price, temp);
    saveProduct(temp, PRODUCTS[index].name, count,PRODUCTS[index].price);
  }
  else{
    let x = findProductInCarts(PRODUCTS[index].name);
    updateQuantityBuy(temp, index, x)
  }
  tempQuantity[index] = temp;
  for(let i in carts){
    document.querySelectorAll('input[type="number"]')[i].value = carts[i].quantity;
  }
  document.querySelectorAll('input[type="text"]')[index].value = 1;
  console.log(tempQuantity);
  totalCart();
}
//update quantity khi click buy btn
function updateQuantityBuy(temp, index, keyCarts) {
  let productItem = document.querySelectorAll('.product-item');
  if(productItem[keyCarts].querySelector('.product-name').innerText === PRODUCTS[index].name)
  {
    // console.log(temp);
    productItem[keyCarts].querySelector('input[type="number"]').value = temp;
    productItem[keyCarts].querySelector('.cost').innerText = `${temp*PRODUCTS[index].price}`;
    saveProduct(temp, '', keyCarts + 1, '');
  }
}
//tim kiem trong carts
function findProductInCarts(name) {
  let x = -1;
  document.querySelectorAll('.product-item').forEach((value,key) => {
    if(value.querySelector('.product-name').innerText === name)
      x = key;
  })
  return x;
}
//tim kiem thong tin product
function findProduct(name) {
  let x = -1;
  PRODUCTS.forEach((value,key) => {
    if(value.name === name){
      x = key;
    }
  });
  return x;
}
//Delete buy product
function deleteEvent(element, index) {
  element.querySelector('.btn-delete').addEventListener('click', ()=> {
    let key = findProduct(element.querySelector(".product-name").innerText);
    let quantity = element.querySelector('input[type = "number"]').value;
    let cost = parseInt(element.querySelector('.cost').innerText);
    element.parentNode.removeChild(element);
    count--;
    sumBuy -= cost;
    quantityBuy -= cost/PRODUCTS[key].price;
    tempQuantity[key] -= cost/PRODUCTS[key].price;
    deleteProductInCarts(index);
    resetCount();
    totalCart();
    console.log(carts);
  });
  return;
}
//reset count 
function resetCount() {
  let buyId = document.querySelectorAll('.idBuy');
  buyId.forEach((value, key) => {
    value.innerText = key + 1;
  });
}
//xoa phan tu trong carts
function deleteProductInCarts(index) {
  let x = JSON.parse(localStorage.getItem('carts'));
  x.slice(id, 1);
  localStorage.setItem('carts', JSON.stringify(x));
}
//update so luong dat hang
function updateQuantity(element) {
  element.querySelector('.btn-update').addEventListener('click', ()=> {
    let key = findProduct(element.querySelector(".product-name").innerText);
    let quantity = element.querySelector('input[type = "number"]').value;
    let cost = parseInt(element.querySelector('.cost').innerText);
    let newCost = PRODUCTS[key].price*parseInt(quantity);
    element.querySelector('.cost').innerText = newCost;
    sumBuy += newCost - cost;
    quantityBuy += (newCost - cost)/PRODUCTS[key].price;
    tempQuantity[key] += (newCost - cost)/PRODUCTS[key].price;
    saveProduct(tempQuantity[key], '', count, '');
    totalCart();
  });
  return;
}
//luu vao carts
function saveProduct(quantity, name, id, price) {
  if(carts.length < id){
    carts.push({
      id: id,
      name: name,
      quantity: quantity,
      price: price
    })
  }
  else
  {
    carts[id - 1].quantity = quantity;
  }
  // console.log(carts);
  localStorage.setItem('carts', JSON.stringify(carts));
}
//get products trong local
function localSaveProduct() {
  let exist = localStorage.getItem('carts');
  let localCarts = [];
  if(exist !== null){
    localCarts = JSON.parse(exist);
  }
  return localCarts;
}