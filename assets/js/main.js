import products from "./products.js";

const productList = document.querySelector('.product-list')
const formSubmitWrapper = document.querySelector('.form-submit__wrapper')


//render list all product
function renderProduct() {
    const productWraps = products.map(product => {
        return `
        <div class="product-item">
            <div class="product-wrapper" data-id="${product.id}">
                <div class="product-wrapper__img" style="background-image: url(${product.image});"></div>
                <div class="product-wrapper__info">
                    <h4 class="product-wrap__name">${product.name}</h4>
                    <h5 class="product-wrap__desc">${product.description}</h5>
                    <h5 class="product-wrap__price">${product.price} Đ</h5>
                </div>
                <div class="product__btn">
                    Đặt hàng
                </div>
            </div>
        </div>
        `
    })
    productList.innerHTML = productWraps.join(' ')
}
renderProduct()


//ẩn hiện form đăng kí
let buyProductBtns = document.querySelectorAll('.product__btn')


// thong tin san pham khi mua hang

buyProductBtns.forEach(buyProductBtn => {
    buyProductBtn.onclick = function(e) {
        const idProductSelected = e.target.parentElement.dataset.id
        const productSelected = products.find(product => {
            return product.id == idProductSelected
        })
        renderFormSubmit(productSelected.name, productSelected.image)

        const closedIcon = document.querySelector('.form-close--btn');
        const overlay = document.querySelector('.overlay');
        const formSubmit = document.querySelector('.form');

        formSubmit.classList.add('open');
        overlay.style.display = 'block';

        //close formsubmit
        closedIcon.onclick = function(){
            formSubmit.classList.remove('open');
            overlay.style.display = 'none';
        }
        
        // click overlay to closed nav mobile
        overlay.onclick = function(){
            formSubmit.classList.remove('open');
            overlay.style.display = 'none';
        }

        const formSubmitBtn = document.querySelector('.form-submit')
        formSubmitBtn.onclick = function() {
            let name = document.getElementById('fullname').value
            let address = document.getElementById('address').value
            let product = document.getElementById('name-product').innerText
            let phone = document.getElementById('phone-number').value
            let quantity = document.getElementById('quantity').value
            
            const d = new Date()
            let date = `${d.getHours()}:${d.getMinutes()} ${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
        
            if( name == "" ||  address == "" || phone == "" || quantity == "") {
                alert("Vui lòng nhập đầy đủ thông tin")
            } else {
                let formOrder = {
                    nameBuyer: name,
                    address: address,
                    phone: phone,
                    product: product,
                    quantity: quantity,
                    date: date,
                }
                createOrder(formOrder)
                alert("Thành công! Đang chờ xác nhận.")
                formSubmit.classList.remove('open');
                overlay.style.display = 'none';
            }
    
            
        }

    }
})

const orderApi = 'https://sheetdb.io/api/v1/nfgfzya2ffq4n'

//create
function createOrder(data, callback) {
    var option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(orderApi, option)
        .then(respone => respone.json())
        .then(callback)
}

function renderFormSubmit(name, img, price) {
    const formHtml = `
    <div class="form">
        <div class="form-close--btn">
            <i class="far fa-times"></i>
        </div>
        <div class="form-info">
            <h2 class="content__desc text-center">Sản phẩm lựa chọn</h2>
            <div class="product-wrapper__img" style="background-image: url(${img});"></div>
            <h4 id="name-product" class="product-wrap__name text-center">${name}</h4>
        </div>
        <div class="form-wrapper">
            <div class="form-group">
                <label for="fullname" class="form-label">Họ và tên</label>
                <input id="fullname" name="fullname" type="text" placeholder="" class="form-control">
            </div>
            <div class="form-group">
                <label for="phone-number" class="form-label">Số điện thoại</label>
                <input id="phone-number" name="phone-number" type="text" placeholder="" class="form-control">
            </div>
            <div class="form-group">
                <label for="address" class="form-label">Địa chỉ</label>
                <input id="address" name="address" type="text" placeholder="" class="form-control">
            </div>
            <div class="form-group">
                <label for="quantity" class="form-label">Số lượng</label>
                <input id="quantity" name="quantity" type="text" value= "1" placeholder="" class="form-control">
            </div>
            <button class="form-submit">Đặt hàng</button>
        </div>
    </div>
    `
    formSubmitWrapper.innerHTML = formHtml
}





