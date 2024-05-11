function onEntry(entry) {
    entry.forEach(change => {
      if (change.isIntersecting) {
        change.target.classList.add('element-show');
      } else {
        change.target.classList.remove('element-show');
      }
    });
  }

  let options = {
    threshold: [0, 0.5, 1]
  };
  let observer = new IntersectionObserver(onEntry, options);
  let elements = document.querySelectorAll('.element-animation');

  for (let elm of elements) {
    observer.observe(elm);
  }
  SmoothScroll({
    animationTime    : 800,
    stepSize         : 40,
    accelerationDelta : 30,  
    accelerationMax   : 2,   
    keyboardSupport   : true,  
    arrowScroll       : 40,
    pulseAlgorithm   : true,
    pulseScale       : 4,
    pulseNormalize   : 1,
    touchpadSupport   : true,
})


const products = document.querySelectorAll('.product');
const addToCartButtons = document.querySelectorAll('.addToCart');
const cartButton = document.getElementById('cartButton');
const cartModal = document.getElementById('cartModal');
const orderForm = document.getElementById('orderForm');
const nothing = document.getElementById('nothing');
const nothing2 = document.getElementById('nothing2');
const dessertButton = document.getElementById('dessertButton');
const cartItems = document.getElementById('cartItems');
const totalPrice = document.getElementById('totalPrice');
const orderTotal = document.getElementById('orderTotal');
const checkoutButton = document.getElementById('checkoutButton');
const closeButton = document.querySelector('.close');
const closeButton2 = document.querySelector('.close2');
const closeButton3 = document.querySelector('.close3');
const closeButton4 = document.querySelector('.close4');
const closeButton5 = document.querySelector('.close5');
const closeButton6 = document.querySelector('.close6');
const cardWindow = document.getElementById('cardWindow');
const cancelOrder = document.getElementById('cancelOrder');
const paymentWindow = document.getElementById("paymentWindow");
const payButton = document.getElementById("payButton")
const citySelect = document.getElementById('city');
const branchSelect = document.getElementById('branch');
const deliveryMethod = document.getElementById('deliveryMethod');
const buttonPrev = document.getElementById("buttonPrev");
const returnButton3 = document.getElementById("returnButton3");
const returnButton4 = document.getElementById("returnButton4");
const optionOther = document.createElement('option');
optionOther.textContent = 'Інше...';
optionOther.style.fontSize = 23 + 'px';

let cart = [];
let isShaking = false;

function addToCart(product) {
    const existingProductIndex = cart.findIndex(item => item.name === product.name);

    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity++;
    } else {
        product.quantity = 1;
        cart.push(product);
    }

    renderCart();
    startShakeCart();
}

function removeFromCart(index) {
    const product = cart[index];
    product.quantity--;

    if (product.quantity === 0) {
        cart.splice(index, 1);
    }

    renderCart();
}

function renderCart() {
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach((product, index) => {
        const item = document.createElement('div');
        item.textContent = `${product.name} - ${product.price}UAH x ${product.quantity}`;
        item.style.fontSize = 28 + "px";
        item.style.marginTop = 10 + "px";
        item.style.position = "relative";

        const image = document.createElement('img');
        image.src = product.image;
        image.alt = product.name; 
        image.style.width = '100px';
        image.style.height = '130px';
        image.style.position = "absolute";
        image.style.top = -43 + "px";
        image.style.left = -110 + "px";
        item.appendChild(image);
        
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Видалити';
        removeButton.style.scale = 0.6;
        removeButton.style.position = "absolute";
        removeButton.style.top = -13 + "px";
        removeButton.style.marginLeft = -30 + "px";
        removeButton.style.backgroundColor = "rgb(255, 86, 94)";
        removeButton.style.cursor = "pointer";

        removeButton.onclick = () => removeFromCart(index);
        
        item.appendChild(removeButton);
        cartItems.appendChild(item);

        total += product.price * product.quantity;
        
    });

    totalPrice.textContent = `Сума: ${total.toFixed(2)}UAH`;

    if (cart.length === 0) {
        stopShakeCart(); 
    }
}

function startShakeCart() {
    nothing.style.display = "none";
    nothing2.style.display = "none";
    if (!isShaking) {
        isShaking = true;
        shakeCart();
    }
}

function passTotalToOrderForm() {
    orderTotal.textContent = totalPrice.textContent; 
}

function shakeCart() {
    cartButton.style.animation = 'shake 0.5s ease-in-out infinite';
}

function stopShakeCart() {
    nothing2.style.display = "block";
    nothing.style.display = "block";
    isShaking = false;
    cartButton.style.animation = 'none'; 
}

cartButton.addEventListener('click', () => {
    renderCart();
    cartModal.style.display = 'block';
    cartButton.style.display = "none";
});

buttonPrev.addEventListener('click', (event) => {
    event.preventDefault();
    orderForm.style.display = 'none';
    cartModal.style.display = 'block';
});

closeButton.addEventListener('click', () => {
    cartModal.style.display = 'none';
    cartButton.style.display = "block";
});

closeButton2.addEventListener('click', () => {
    cancelOrder.style.display = "block";
    const confirmCancelBtn = document.getElementById("confirmCancel");
    const cancelCancelBtn = document.getElementById("cancelCancel");

    confirmCancelBtn.addEventListener("click", function() {
        cancelOrder.style.display = "none";
        orderForm.style.display = "none";
        cartButton.style.display = "block";
    });

    cancelCancelBtn.addEventListener("click", function() {
        cancelOrder.style.display = "none";
    });
});

dessertButton.addEventListener('click', () =>{
    cartModal.style.display = 'none';
    cartButton.style.display = "block";
});

addToCartButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        let price;
        switch (index) {
            case 0:
                price = 50;
                break;
            case 1:
                price = 45;
                break;
            case 2:
                price = 55;
                break;
            case 3:
                price = 45;
                break;
            case 4:
                price = 50;
                break;
            case 5:
                price = 55;
                break;  
            case 6:
                price = 50;
                break; 
            case 7:
                price = 60;
                break; 
            case 8:
                price = 55;
                break;
            case 9:
                price = 60;
                break;
            case 10:
                price = 50;
                break;
            default:
                price = 0; 
                break;
        }

        let image;
        switch (index) {
            case 0:
                image = "../Mochi/images/coconat.png";
                break;
            case 1:
                image = "../Mochi/images/chery.png";
                break;
            case 2:
                image = "../Mochi/images/maraquya.png";
                break;
            case 3:
                image = "../Mochi/images/green-tea.png";
                break;
            case 4:
                image = "../Mochi/images/forest-berry.png";
                break;
            case 5:
                image = "../Mochi/images/fistashki.png";
                break;
            case 6:
                image = "../Mochi/images/panakota.png";
                break;
            case 7:
                image = "../Mochi/images/strawberry.png";
                break;
            case 8:
                image = "../Mochi/images/granat.png";
                break;
            case 9:
                image = "../Mochi/images/mango.png";
                break;
            case 10:
                image = "../Mochi/images/kunjut.png";
                break;
        }

        const product = {
            name: products[index].querySelector('h1').textContent,
            price: price,
            image: image
        };
        addToCart(product);
    });
});

checkoutButton.addEventListener('click', () => {
    if (cart.length === 0) {
        nothing.style.display = "block";
    
    } else {
        nothing.style.display = "none";
        cartModal.style.display = "none";
        orderForm.style.display = "block";
        if(orderForm.style.display = "block"){
            cartButton.style.display = "none";
        }
        passTotalToOrderForm();
    }
});

const services = {
    ukrPoshta: {
        kyiv: ['вул. Пирогівський шлях, 135; №1'],
        lviv: ['пл. Ринок, 12', 'вул. Личаківська, 34', 'пр. Свободи, 55'],
        odesa: ['вул. Дерибасівська, 18', 'пр. Шевченка, 21', 'вул. Приморська, 33']
    },
    novaPoshta: {
        kyiv: ['вул. Пирогівський шлях, 135; №1', 'вул. Богатирська, 11; №2', 'вул. Слобожанська, 13; №3', 'вул. Верховинна, 69; №4' , 'вул. Федорова, 32; №5' , 'вул. Миколи Василенка, 2; №6' , 'вул. Гната Хоткевича, 8; №7' , 'вул. Набережно-Хрещатицька, 33; №8'],
        lviv: ['вул. Галицька, 5', 'вул. Франка, 20', 'пл. Ринок, 35'],
        odesa: ['вул. Добровольського, 8', 'вул. Катерининська, 12', 'пр. Шевченка, 25']
    },
    meestExpress: {
        kyiv: ['вул. Івана Франка, 11', 'вул. Тарасівська, 25', 'пр. Петра Петрова, 30'],
        lviv: ['вул. Степана Бандери, 8', 'вул. Сихівська, 15', 'вул. Зелена, 20'],
        odesa: ['вул. Льва Толстого, 18', 'пр. Гагаріна, 22', 'вул. Фонтанська, 28']
    }
};

function updateBranches() {
    const selectedService = deliveryMethod.value;
    const selectedCity = citySelect.value;
    
    if (selectedCity === 'other') {
        const customCity = document.getElementById("customCity")
        const customBranch = document.getElementById("customBranch")
        customCity.style.display = 'block';
        customBranch.style.display = 'block';
        const branchNone = document.getElementById("branch-none")
        const WriteYourCity = document.getElementById("WriteYourCity")
        const WriteYourBranch = document.getElementById("WriteYourBranch")
        const labelName = document.getElementById("labelName")
        const labelSurname = document.getElementById("labelSurname")
        const labelPhone = document.getElementById("labelPhone")
        const buttonSubmit = document.getElementById("buttonSubmit")
        const inputName = document.getElementById("name")
        const inputSurname = document.getElementById("surname")
        const inputPhone = document.getElementById("phone")
        const labelDeliveryMethod = document.getElementById("labelDeliveryMethod")
        const forCity = document.getElementById("for-city")
        const labelPaymentMethod = document.getElementById("labelPaymentMethod")
        const paymentMethod = document.getElementById("paymentMethod")
        const modalContent2 = document.getElementById("modal-content2")
        const buttonPrev = document.getElementById("buttonPrev")
        WriteYourCity.style.display = "block";
        WriteYourBranch.style.display = "block";
        branchNone.style.display = "none";
        branchSelect.style.display = "none";
        branchSelect.disabled = true; 
        labelName.style.top = 41 + "px";
        labelSurname.style.top = 17 + "px";
        labelPhone.style.top = -5 + "px";
        buttonSubmit.style.top = -161 + "px";
        inputName.style.top = -32 + "px";
        inputSurname.style.top = -61 + "px";
        inputPhone.style.top = -91 + "px";
        labelDeliveryMethod.style.top = -131 + "px";
        deliveryMethod.style.top = -156 + "px";
        forCity.style.top = -218 + "px";
        citySelect.style.top = -216 + "px";
        WriteYourCity.style.top = -196 + "px";
        WriteYourCity.style.left = 175 + "px"
        customCity.style.top = -223 + "px";
        customCity.style.left = 405 + "px";
        WriteYourBranch.style.top = -200 + "px";
        customBranch.style.top = -228 + "px";
        labelPaymentMethod.style.top = -205 + "px";
        labelPaymentMethod.style.left = 258 + "px";
        paymentMethod.style.top = -235 + "px";
        paymentMethod.style.left = 433 + "px";
        modalContent2.style.height = 583 + "px";
        modalContent2.style.margin = 4.8 + "% auto";
        orderTotal.style.top = 212 + "px";
        buttonPrev.style.top = -161 + "px";
        paymentMethod.style.left = 408 + "px";
        labelPaymentMethod.style.left = 230 + "px";
    } 
    else {
        const customCity = document.getElementById("customCity")
        const customBranch = document.getElementById("customBranch")
        customCity.style.display = 'none';
        customBranch.style.display = 'none';
        const branchNone = document.getElementById("branch-none")
        const WriteYourCity = document.getElementById("WriteYourCity")
        const WriteYourBranch = document.getElementById("WriteYourBranch")
        const labelName = document.getElementById("labelName")
        const labelSurname = document.getElementById("labelSurname")
        const labelPhone = document.getElementById("labelPhone")
        const buttonSubmit = document.getElementById("buttonSubmit")
        const inputName = document.getElementById("name")
        const inputSurname = document.getElementById("surname")
        const inputPhone = document.getElementById("phone")
        const labelDeliveryMethod = document.getElementById("labelDeliveryMethod")
        const forCity = document.getElementById("for-city")
        const modalContent2 = document.getElementById("modal-content2")
        const labelPaymentMethod = document.getElementById("labelPaymentMethod")
        const paymentMethod = document.getElementById("paymentMethod")
        const buttonPrev = document.getElementById("buttonPrev")
        const selectBranch = document.getElementById("branch")
        WriteYourCity.style.display = "none";
        WriteYourBranch.style.display = "none";
        branchNone.style.display = "block";
        branchSelect.style.display = "block";
        branchSelect.innerHTML = '';
        labelName.style.top = 61 + "px";
        labelSurname.style.top = 38 + "px";
        labelPhone.style.top = 14 + "px";
        buttonSubmit.style.top = -110 + "px";
        inputName.style.top = -12 + "px";
        inputSurname.style.top = -41 + "px";
        inputPhone.style.top = -71 + "px";
        labelDeliveryMethod.style.top = -111 + "px";
        deliveryMethod.style.top = -136 + "px";
        forCity.style.top = -198 + "px";
        citySelect.style.top = -196 + "px";
        WriteYourCity.style.top = -176 + "px";
        customCity.style.top = -203 + "px";
        WriteYourBranch.style.top = -180 + "px";
        customBranch.style.top = -208 + "px";
        modalContent2.style.height = 570 + "px";
        labelPaymentMethod.style.top = -181 + "px";
        labelPaymentMethod.style.left = 227 + "px";
        paymentMethod.style.top = -209 + "px";
        paymentMethod.style.left = 403 + "px";
        modalContent2.style.margin = 5.7 + "% auto";
        orderTotal.style.top = 199 + "px";
        buttonPrev.style.top = -110 + "px";
        branchNone.style.top = -181 + "px";
        selectBranch.style.top = -205 + "px";
    }
    
    const customCity = document.getElementById("customCity")
    const branchNone = document.getElementById("branch-none")
    const selectBranch = document.getElementById("branch")
    const WriteYourCity = document.getElementById("WriteYourCity")
    const labelName = document.getElementById("labelName")
    const labelSurname = document.getElementById("labelSurname")
    const labelPhone = document.getElementById("labelPhone")
    const inputName = document.getElementById("name")
    const inputSurname = document.getElementById("surname")
    const inputPhone = document.getElementById("phone")
    const labelDeliveryMethod = document.getElementById("labelDeliveryMethod")
    const forCity = document.getElementById("for-city")
    const labelPaymentMethod = document.getElementById("labelPaymentMethod")
    const paymentMethod = document.getElementById("paymentMethod")
    const cityBranches = services[selectedService][selectedCity];
    const buttonPrev = document.getElementById("buttonPrev")
    const buttonSubmit = document.getElementById("buttonSubmit")
    if (cityBranches) {
        cityBranches.forEach(branch => {
            const option = document.createElement('option');
            option.style.fontSize = 20 + "px";
            option.style.borderRadius = 5 + "px";
            option.textContent = branch;
            option.value = branch;
            branchSelect.appendChild(option);
        });
        branchSelect.disabled = false;
    } else {
        const option = document.createElement('option');
        option.style.fontSize = 20 + "px";
        option.style.borderRadius = 5 + "px";
        option.textContent = 'Для цього міста немає доступних відділень!';
        option.disabled = true;
        branchSelect.appendChild(option);
        branchSelect.disabled = true;
    }
    
    branchSelect.appendChild(optionOther);
    
    branchSelect.addEventListener('change', function() {
        const selectedBranch = branchSelect.value;
        const customBranch = document.getElementById("customBranch");
        const WriteYourBranch = document.getElementById("WriteYourBranch");
        if (selectedBranch === 'Інше...') {
            customBranch.style.display = 'block';
            WriteYourBranch.style.display = 'block';
            buttonPrev.style.top = -166 + "px";
            buttonSubmit.style.top = -166 + "px";
            labelName.style.top = 31 + "px";
            labelSurname.style.top = 7 + "px";
            labelPhone.style.top = -15 + "px";
            inputName.style.top = -42 + "px";
            inputSurname.style.top = -71 + "px";
            inputPhone.style.top = -101 + "px";
            labelDeliveryMethod.style.top = -141 + "px";
            deliveryMethod.style.top = -166 + "px";
            forCity.style.top = -228 + "px";
            citySelect.style.top = -226 + "px";
            WriteYourCity.style.top = -206 + "px";
            customCity.style.top = -233 + "px";
            WriteYourBranch.style.top = -210 + "px";
            customBranch.style.top = -238 + "px";
            labelPaymentMethod.style.top = -215 + "px";
            labelPaymentMethod.style.left = 268 + "px";
            paymentMethod.style.top = -245 + "px";
            paymentMethod.style.left = 443 + "px";
            branchNone.style.top = -210 + "px";
            selectBranch.style.top = -235 + "px";
            paymentMethod.style.left = 408 + "px";
            labelPaymentMethod.style.left = 230 + "px";
        } else {
            customBranch.style.display = 'none';
            WriteYourBranch.style.display = 'none';
            buttonPrev.style.top = -110 + "px";
            buttonSubmit.style.top = -110 + "px";
            labelName.style.top = 61 + "px";
            labelSurname.style.top = 38 + "px";
            labelPhone.style.top = 14 + "px";
            inputName.style.top = -12 + "px";
            inputSurname.style.top = -41 + "px";
            inputPhone.style.top = -71 + "px";
            labelDeliveryMethod.style.top = -111 + "px";
            deliveryMethod.style.top = -136 + "px";
            forCity.style.top = -198 + "px";
            citySelect.style.top = -196 + "px";
            WriteYourCity.style.top = -176 + "px";
            customCity.style.top = -203 + "px";
            WriteYourBranch.style.top = -180 + "px";
            customBranch.style.top = -208 + "px";
            labelPaymentMethod.style.top = -181 + "px";
            labelPaymentMethod.style.left = 227 + "px";
            paymentMethod.style.top = -209 + "px";
            paymentMethod.style.left = 403 + "px";
            orderTotal.style.top = 199 + "px";
            buttonPrev.style.top = -110 + "px";
            branchNone.style.top = -181 + "px";
            selectBranch.style.top = -205 + "px";
        }
    });
}

citySelect.addEventListener('change', updateBranches);
deliveryMethod.addEventListener('change', updateBranches);

updateBranches();

function validateForm() {
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const phone = document.getElementById("phone").value;
    const customCityInput = document.getElementById("customCity");
    const customBranchInput = document.getElementById("customBranch");
    const alertToName = document.getElementById("alertToName");
    const alertToPhone = document.getElementById("alertToPhone");
    const alertToCitySelect = document.getElementById("alertToCitySelect");
    const alertToCitySelectBranch = document.getElementById("alertToCitySelectBranch");
    const alertToBranchSelect = document.getElementById("alertToBranchSelect");
    if (!containsOnlyNameAndSurname(name) || !containsOnlyNameAndSurname(surname)) {
        alertToName.style.display = "block";
    }else{
        alertToName.style.display = "none";
    }
    const phoneRegex = /^\d+$/;
    if (!phoneRegex.test(phone) || phone.length !== 9) {
        alertToPhone.style.display = "block";
    }else{
        alertToPhone.style.display = "none";
    }
    if (citySelect.value === 'other' && customCityInput.style.display === 'block') {
        if(!containsForCity(customCityInput.value.trim())){
            alertToCitySelect.style.display = "block";
        }else{
            alertToCitySelect.style.display = "none";
        }
        alertToName.style.top = "257px";
        alertToPhone.style.top = "257px";   
    }else{
        alertToCitySelect.style.display = "none";
        alertToName.style.top = "290px";
        alertToPhone.style.top = "290px";  
    }
    const branchValue = customBranchInput.value.trim();
    if (citySelect.value === 'other' && customBranchInput.style.display === 'block' && branchValue === "") {
        alertToCitySelectBranch.style.display = "block";
    }else{
        alertToCitySelectBranch.style.display = "none";
    }
    if (branchSelect.appendChild(optionOther) && customCityInput.style.display === 'none' && customBranchInput.style.display === 'block') {
        if(customBranchInput.value.trim() === ''){
            alertToBranchSelect.style.display = "block";
        }else{
            alertToBranchSelect.style.display = "none";
        }
        alertToName.style.top = "260px";
        alertToPhone.style.top = "260px";   
    }else{
        alertToBranchSelect.style.display = "none";
    }
}
function containsOnlyNameAndSurname(text) {
    return /^[a-zA-Zа-яА-ЯіІїЇєЄ-]+$/.test(text);
}

function containsForCity(text) {
    return /^[a-zA-Zа-яА-ЯіІїЇєЄ.-]+$/.test(text);
}

document.addEventListener("DOMContentLoaded", function() {
    validateForm(); 
});

orderForm.addEventListener("input", function() {
    validateForm(); 
});

orderForm.addEventListener("change", function() {
    validateForm();
});

const buttonSubmit = document.getElementById("buttonSubmit");
buttonSubmit.addEventListener("click", function(event) {
    event.preventDefault();
    const paymentMethod = document.getElementById("paymentMethod").value;
    const modalContent2 = document.getElementById("modal-content2");
    const finishText = document.getElementById("finishText");
    const finishText2 = document.getElementById("finishText2");
    const finishText3 = document.getElementById("finishText3");
    const alertToName = document.getElementById("alertToName");
    const alertToPhone = document.getElementById("alertToPhone");
    const alertToCitySelect = document.getElementById("alertToCitySelect");
    const alertToCitySelectBranch = document.getElementById("alertToCitySelectBranch");
    const alertToBranchSelect = document.getElementById("alertToBranchSelect");
    if (paymentMethod === "cashOnDelivery") {
        if(alertToName.style.display === 'block'){
            finishText.style.display = "none";
            finishText2.style.display = "none";
            finishText3.style.display = "none";
        }
        else if(alertToPhone.style.display === 'block'){
            finishText.style.display = "none";
            finishText2.style.display = "none";
            finishText3.style.display = "none";
        }
        else if(alertToCitySelect.style.display === 'block'){
            finishText.style.display = "none";
            finishText2.style.display = "none";
            finishText3.style.display = "none";
        }
        else if(alertToCitySelectBranch.style.display === 'block'){
            finishText.style.display = "none";
            finishText2.style.display = "none";
            finishText3.style.display = "none";
        }
        else if(alertToBranchSelect.style.display === 'block'){
            finishText.style.display = "none";
            finishText2.style.display = "none";
            finishText3.style.display = "none";
        }else{
            modalContent2.innerHTML = ""; 
            finishText.style.display = "block";
            finishText2.style.display = "block";
            finishText3.style.display = "block";
            modalContent2.appendChild(finishText);
            modalContent2.appendChild(finishText2);
            modalContent2.appendChild(finishText3);
            setTimeout(function() {
                orderForm.style.display = "none";
                cartButton.style.display = "block";
                location.reload();
            }, 10000);
        }
    }else if (paymentMethod === "onlinePayment") {
        if(alertToName.style.display === 'block'){
            finishText.style.display = "none";
            finishText2.style.display = "none";
            finishText3.style.display = "none";
        }
        else if(alertToPhone.style.display === 'block'){
            finishText.style.display = "none";
            finishText2.style.display = "none";
            finishText3.style.display = "none";
        }
        else if(alertToCitySelect.style.display === 'block'){
            finishText.style.display = "none";
            finishText2.style.display = "none";
            finishText3.style.display = "none";
        }
        else if(alertToCitySelectBranch.style.display === 'block'){
            finishText.style.display = "none";
            finishText2.style.display = "none";
            finishText3.style.display = "none";
        }
        else if(alertToBranchSelect.style.display === 'block'){
            finishText.style.display = "none";
            finishText2.style.display = "none";
            finishText3.style.display = "none";
        }else{
            orderForm.style.display = "none";
            document.getElementById("accountWindow").style.display = "none";
            document.getElementById("createAccountWindow").style.display = "block";
        }
    }
});

const createAccountWindow = document.getElementById("createAccountWindow");
const accountWindow = document.getElementById("accountWindow");
const returnButton = document.getElementById("returnButton");
const returnButton2 = document.getElementById("returnButton2");
const createButton = document.getElementById("createButton");
const createAccountButton = document.getElementById("createAccountButton");
returnButton.addEventListener("click", function() {
    createAccountWindow.style.display = "none";
    orderForm.style.display = "block";
    validateForm2();
});

returnButton2.addEventListener("click", function() {
    createAccountWindow.style.display = "block";
    accountWindow.style.display = "none";
    validateForm2();
});

document.getElementById("haveAccount").addEventListener("click", function() {
    createAccountWindow.style.display = "none";
    accountWindow.style.display = "block";
})

function validateForm2() {
    const emailInput = document.getElementById("emailInput");
    const passwordInput = document.getElementById("passwordInput");
    const confirmPasswordInput = document.getElementById("confirmPasswordInput");
    const usernameInput = document.getElementById("usernameInput");
    const passwordText = document.getElementById("passwordText");
    const confirmPasswordText = document.getElementById("confirmPasswordText");
    const includesAt = document.getElementById("includesAt");
    const usernameText = document.getElementById("usernameText");
    const accountsLengthText = document.getElementById("accountsLengthText");
    const existingEmailText = document.getElementById("existingEmailText");
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();
    const username = usernameInput.value.trim();
    const emailRegex = /^[a-zA-Z0-9_\-\.]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    const accounts = getAccounts();
    const existingEmail = accounts.find(a => a.email === email);
    
    if (accounts.length >= 4) {
        accountsLengthText.style.display = "block";
        passwordText.style.display = "none";
        confirmPasswordText.style.display = "none";
        includesAt.style.display = "none";
        usernameText.style.display = "none";
    }else{
        accountsLengthText.style.display = "none";
        if (password.length < 8) {
            passwordText.style.display = "block";
        }else{
            passwordText.style.display = "none";
        }
        if (password !== confirmPassword) {
            confirmPasswordText.style.display = "block";
        }else{
            confirmPasswordText.style.display = "none";
        }
        if (!email.includes("@")) {
            includesAt.style.display = "block";
        }else{
            includesAt.style.display = "none";
        }
        if (!emailRegex.test(email)) {
            includesAt.style.display = "block";
        }else{
            includesAt.style.display = "none";
        }    
        if (!usernameRegex.test(username)) {
            usernameText.style.display = "block";
        }else{
            usernameText.style.display = "none";
        }
        if(existingEmail){
            existingEmailText.style.display = "block";
        }else{
            existingEmailText.style.display = "none";
        }
        
    }   
};
validateForm2(); 

function getAccounts() {
    const accountsJSON = localStorage.getItem("accounts");
    return accountsJSON ? JSON.parse(accountsJSON) : [];
}

function updateAccountList() {
    const accounts = getAccounts();
    const accountList = document.getElementById("accountList");
    accountList.innerHTML = "";

    accounts.forEach(function(account) {
        const accountElement = document.createElement("div");
        accountElement.textContent = `Користувач: ${account.username}`;
        accountElement.style.fontSize = "20px";
        accountElement.style.left = 310 + "px";
        accountElement.style.top = 55 + "px";
        accountElement.style.marginTop = -70 + "px";
        accountElement.style.position = "relative";
        accountList.appendChild(accountElement);

        const accountElement2 = document.createElement("div");
        accountElement2.textContent = `Пошта: ${account.email}`;
        accountElement2.style.fontSize = "20px";
        accountElement2.style.left = 309 + "px";
        accountElement2.style.top = -25 + "px";
        accountElement2.style.position = "relative";
        accountList.appendChild(accountElement2);

        const accountElement3 = document.createElement("div");
        accountElement3.textContent = `Баланс: ${account.balance}UAH`;
        accountElement3.style.fontSize = "20px";
        accountElement3.style.left = 309 + "px";
        accountElement3.style.top = -39 + "px";
        accountElement3.style.scale = 1;
        accountElement3.style.position = "relative";
        accountList.appendChild(accountElement3);

        const topUpButton = document.createElement("button");
        topUpButton.textContent = "Поповнити";
        topUpButton.style.fontSize = "30px";
        topUpButton.style.marginLeft = -35 + "px";
        topUpButton.style.top = 4 + "px";
        topUpButton.style.width = 240 + "px";
        topUpButton.style.scale = 0.55;
        topUpButton.style.cursor = "pointer";
        topUpButton.style.position = "relative";
        topUpButton.addEventListener("click", function() {
            accountWindow.style.display = "none";
            cardWindow.style.display = "block";
        
            const selectAccount = document.getElementById("emailSelect");
            selectAccount.innerHTML = "";
        
            accounts.forEach(function(account) {
                const option = document.createElement("option");
                option.style.fontSize = "20px";
                option.value = account.email;
                option.textContent = account.email;
                selectAccount.appendChild(option);
            });
        });
        accountElement2.appendChild(topUpButton);

        const accountIcon = document.createElement("img");
        accountIcon.src = "../Mochi/images/account-icon.png";
        accountIcon.style.width = '90px';
        accountIcon.style.height = '90px';
        accountIcon.style.scale = 0.7;
        accountIcon.style.position = "absolute";
        accountIcon.style.marginLeft = "205px";
        accountIcon.style.marginTop = "-120px";
        accountList.appendChild(accountIcon);

        const deleteButton = document.createElement("img");
        deleteButton.src = "../Mochi/images/delete.png";
        deleteButton.style.width = '80px';
        deleteButton.style.height = '100px';
        deleteButton.style.scale = 0.45;
        deleteButton.style.position = "relative";
        deleteButton.style.marginLeft = "-55px";
        deleteButton.style.top = "42px"
        deleteButton.style.cursor = "pointer";
        deleteButton.addEventListener("click", function() {
            const index = accounts.findIndex(a => a.email === account.email);
            if (index !== -1) {
                accounts.splice(index, 1);
                localStorage.setItem("accounts", JSON.stringify(accounts));
                updateAccountList();
            }
        });
        accountElement2.appendChild(deleteButton);
    });

    if (accounts.length === 0) {
        const noAccountsText = document.createElement("p");
        noAccountsText.textContent = "Ви не створили жодного аккаунту...";
        noAccountsText.style.position = "relative";
        noAccountsText.style.fontSize = "20px";
        noAccountsText.style.left = "280px";
        noAccountsText.style.top = "77px";
        const unsmileIcon = document.createElement("img");
        unsmileIcon.src = "../Mochi/images/unsmile-icon.png";
        unsmileIcon.style.position = "relative";
        unsmileIcon.style.height = "120px";
        unsmileIcon.style.left = "417px";
        unsmileIcon.style.top = "77px";
        accountList.appendChild(unsmileIcon);
        accountList.appendChild(noAccountsText);
    }
}
updateAccountList();

createButton.addEventListener("click", function() {
    const emailInput = document.getElementById("emailInput");
    const passwordInput = document.getElementById("passwordInput");
    const usernameInput = document.getElementById("usernameInput");
    const passwordText = document.getElementById("passwordText");
    const confirmPasswordText = document.getElementById("confirmPasswordText");
    const includesAt = document.getElementById("includesAt");
    const usernameText = document.getElementById("usernameText");
    const accountsLengthText = document.getElementById("accountsLengthText");
    const existingEmailText = document.getElementById("existingEmailText");
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const username = usernameInput.value.trim();
    const accounts = getAccounts();

    if(passwordText.style.display === 'block' || confirmPasswordText.style.display === 'block' || includesAt.style.display === 'block'|| 
    usernameText.style.display === 'block' || 
    accountsLengthText.style.display === 'block'|| 
    existingEmailText.style.display === "block") {
        accountWindow.style.display = "none";
    } else {
        const account = {
            email: email,
            password: password,
            username: username,
            balance: 0
        };
        accounts.push(account);
        localStorage.setItem("accounts", JSON.stringify(accounts));
        createAccountWindow.style.display = "none";
        accountWindow.style.display = "block";
        updateAccountList();
    }
})

createAccountWindow.addEventListener("change", function() {
    validateForm2();
});

document.addEventListener("DOMContentLoaded", function() {
    validateForm2(); 
});

createAccountWindow.addEventListener("input", function() {
    validateForm2(); 
});

closeButton3.addEventListener('click', () => {
    const confirmCancelBtn2 = document.getElementById("confirmCancel2");
    const cancelCancelBtn2 = document.getElementById("cancelCancel2");
    const cancelCreateAccount = document.getElementById("cancelCreateAccount");
    cancelCreateAccount.style.display = "block";

    confirmCancelBtn2.addEventListener("click", function() {
        cancelCreateAccount.style.display = "none";
        createAccountWindow.style.display = "none";
        cartButton.style.display = "block";
    });

    cancelCancelBtn2.addEventListener("click", function() {
        cancelCreateAccount.style.display = "none";
    });
});


closeButton4.addEventListener('click', () => {
    const confirmCancelBtn3 = document.getElementById("confirmCancel3");
    const cancelCancelBtn3 = document.getElementById("cancelCancel3");
    const cancelAccountWindow = document.getElementById("cancelAccountWindow");
    cancelAccountWindow.style.display = "block";

    confirmCancelBtn3.addEventListener("click", function() {
        cancelAccountWindow.style.display = "none";
        accountWindow.style.display = "none";
        cartButton.style.display = "block";
    });

    cancelCancelBtn3.addEventListener("click", function() {
        cancelAccountWindow.style.display = "none";
    });
});

closeButton5.addEventListener('click', () => {
    const confirmCancelBtn4 = document.getElementById("confirmCancel4");
    const cancelCancelBtn4 = document.getElementById("cancelCancel4");
    const cancelCardWindow = document.getElementById("cancelCardWindow");
    cancelCardWindow.style.display = "block";

    confirmCancelBtn4.addEventListener("click", function() {
        cancelCardWindow.style.display = "none";
        cardWindow.style.display = "none";
        cartButton.style.display = "block";
    });

    cancelCancelBtn4.addEventListener("click", function() {
        cardWindow.style.display = "block";
        cancelCardWindow.style.display = "none";
    });
});

returnButton3.addEventListener('click', function() {
    cardWindow.style.display = 'none';
    accountWindow.style.display = 'block';
});

document.getElementById("updateBalance").addEventListener("click", function() {
    const accounts = getAccounts();
    const selectedEmail = document.getElementById("emailSelect").value;
    const amount = document.getElementById("customAmount").value;
    const selectedAccount = accounts.find(account => account.email === selectedEmail);
    const cardText = document.getElementById("cardText");
    const expiryDateText = document.getElementById("expiryDateText");
    const pinCodeText = document.getElementById("pinCodeText");
    const cvvText = document.getElementById("cvvText");
    const amountText = document.getElementById("amountText");
    if(cardText.style.display === "block" || expiryDateText.style.display === "block" || pinCodeText.style.display === "block"|| 
    cvvText.style.display === "block" || amountText.style.display === "block"){
        accountWindow.style.display = "none";
    }
    else {
        selectedAccount.balance += parseFloat(amount);
        localStorage.setItem("accounts", JSON.stringify(accounts));
        updateAccountList();
        cardWindow.style.display = "none";
        accountWindow.style.display = "block";
    }
});

function validateForm3() {
    const cardNumberInput = document.getElementById("cardNumber");
    const expiryDateInput = document.getElementById("expiryDate");
    const cvvInput = document.getElementById("cvv");
    const pinCodeInput = document.getElementById("pin-code");
    const amountInput = document.getElementById("customAmount");    
    const cardText = document.getElementById("cardText");
    const cardNumber = cardNumberInput.value.trim();
    const expiryDateText = document.getElementById("expiryDateText");
    const expiryDate = expiryDateInput.value.trim();
    const pinCodeText = document.getElementById("pinCodeText");
    const pinCode = pinCodeInput.value.trim();
    const cvvText = document.getElementById("cvvText");
    const cvv = cvvInput.value.trim();
    const amountText = document.getElementById("amountText");
    const amount = amountInput.value.trim();
    
    if (!/^\d{16}$/.test(cardNumber)) {
        cardText.style.display = "block";
    } else {
        cardText.style.display = "none";
    }
    if (!/^\d{2}\/\d{2}$/.test(expiryDate) || !isDateValid(expiryDate)) {
        expiryDateText.style.display = "block";
    } else {
        expiryDateText.style.display = "none";
    }
    if (!/^\d{3}$/.test(cvv)) {
        cvvText.style.display = "block";
    } else {
        cvvText.style.display = "none";
    }
    if (!/^\d{4}$/.test(pinCode)) {
        pinCodeText.style.display = "block";
    } else {
        pinCodeText.style.display = "none";
    }  
    if (!/^\d+$/.test(amount)) {
        amountText.style.display = "block";
    } else {
        amountText.style.display = "none";
    }
}

cardWindow.addEventListener("change", function() {
    validateForm3();
});

document.addEventListener("DOMContentLoaded", function() {
    validateForm3(); 
});

cardWindow.addEventListener("input", function() {
    validateForm3(); 
});

function isDateValid(dateString) {
    const [month, year] = dateString.split("/");
    const currentDate = new Date();
    const inputDate = new Date(parseInt("20" + year), parseInt(month));
    const lastDayOfMonth = new Date(inputDate.getFullYear(), inputDate.getMonth() + 1, 0).getDate();
    const isValidMonth = parseInt(month) >= 1 && parseInt(month) <= 12;
    return isValidMonth && inputDate >= currentDate && currentDate.getDate() <= lastDayOfMonth;
}

orderTotal.textContent = totalPrice.text;

createAccountButton.addEventListener("click", function() {
    createAccountButton.addEventListener("click", function() {
        const selectedEmail = document.getElementById("emailSelectPayment").value;
        if (!selectedEmail) {
            alert("Будь ласка оберіть аккаунт для оплати.");
            return;
        }
    });
    
    const totalAmount = parseFloat(orderTotal.textContent.replace(/[^\d.]/g, ''));
    document.getElementById("totalAmount").textContent = `Сума до оплати: ${totalAmount.toFixed(2)} UAH`;
    const accounts = getAccounts();
    const emailSelectPayment = document.getElementById("emailSelectPayment");
    emailSelectPayment.innerHTML = "";
    accounts.forEach(function(account) {
        const option = document.createElement("option");
        option.style.fontSize = "23px";
        option.text = account.email;
        emailSelectPayment.add(option);
    });

    accountWindow.style.display = "none";
    paymentWindow.style.display = "block";
});

function validateForm4() {
    const accounts = getAccounts();
    const selectedEmail = document.getElementById("emailSelectPayment").value;
    const password = document.getElementById("passwordInputPayment");
    const balanceText = document.getElementById("balanceText");
    const wrongPasswordText = document.getElementById("wrongPasswordText");
    const totalAmount = parseFloat(orderTotal.textContent.replace(/[^\d.]/g, ''));
    const selectedAccount = accounts.find(account => account.email === selectedEmail);
    if (selectedAccount && selectedAccount.password !== password.value) {
        wrongPasswordText.style.display = "block";
    } else {
        wrongPasswordText.style.display = "none";
    }
    if (selectedAccount && selectedAccount.balance < totalAmount) {
        balanceText.style.display = "block";
    } else {
        balanceText.style.display = "none";
    }
}

paymentWindow.addEventListener("change", function() {
    validateForm4();
});

document.addEventListener("DOMContentLoaded", function() {
    validateForm4(); 
});

paymentWindow.addEventListener("input", function() {
    validateForm4(); 
});

payButton.addEventListener("click", function(){
    const accounts = getAccounts();
    const selectedEmail = document.getElementById("emailSelectPayment").value;
    const balanceText = document.getElementById("balanceText");
    const wrongPasswordText = document.getElementById("wrongPasswordText");
    const totalAmount = parseFloat(orderTotal.textContent.replace(/[^\d.]/g, ''));
    const selectedAccount = accounts.find(account => account.email === selectedEmail);
    validateForm4();
    if (wrongPasswordText.style.display === "block" || balanceText.style.display === "block") {
        accountWindow.style.display = "none";
    } else {
        selectedAccount.balance -= totalAmount;
        localStorage.setItem("accounts", JSON.stringify(accounts));
        document.getElementById("totalAmount").style.display = "none";
        document.getElementById("emailSelectPayment").style.display = "none";
        document.getElementById("passwordInputPayment").style.display = "none";
        document.getElementById("balanceText").style.display = "none";
        document.getElementById("wrongPasswordText").style.display = "none";
        document.getElementById("tittlePaymentWindow").style.display = "none";
        document.getElementById("labelEmailSelect").style.display = "none";
        document.getElementById("labelPasswordInputPayment").style.display = "none";
        returnButton4.style.display = "none";
        payButton.style.display = "none";


        const paymentMessage = document.getElementById("paymentMessage");
        paymentMessage.textContent = `З аккаунту ${selectedAccount.email} було списано ${totalAmount.toFixed(2)}UAH.`;
        const paymentMessage2 = document.getElementById("paymentMessage2");
        paymentMessage.style.display = "block";
        paymentMessage2.style.display = "block";
        setTimeout(function() {
            cartButton.style.display = "block";
            paymentWindow.style.display = "none";
            location.reload()
        }, 10000);
    }
});

returnButton4.addEventListener('click', function() {
    accountWindow.style.display = 'block';
    paymentWindow.style.display = "none";
    
});

closeButton6.addEventListener('click', () => {
    const confirmCancelBtn5 = document.getElementById("confirmCancel5");
    const cancelCancelBtn5 = document.getElementById("cancelCancel5");
    const cancelPaymentWindow = document.getElementById("cancelPaymentWindow");
    cancelPaymentWindow.style.display = "block";

    confirmCancelBtn5.addEventListener("click", function() {
        cancelPaymentWindow.style.display = "none";
        paymentWindow.style.display = "none";
        cartButton.style.display = "block";
    });

    cancelCancelBtn5.addEventListener("click", function() {
        cancelPaymentWindow.style.display = "none";
    });
});