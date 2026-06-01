let menu = [
    { name: "Фирменная", ingredients: "цыпленок, томаты, огурец, капуста", price300: 220, price400: 260, price500: 290 },
    { name: "Пикантная", ingredients: "халапеньо, цыпленок, овощи", price300: 230, price400: 270, price500: 310 },
    { name: "Сырная", ingredients: "сливочный сыр, цыпленок", price300: 250, price400: 295, price500: 340 },
    { name: "Гавайская", ingredients: "ананас, моцарелла", price300: 270, price400: 320, price500: 390 },
    { name: "Арабская", ingredients: "гранат, картофель фри", price300: 270, price400: 320, price500: 390 },
    { name: "Вегетарианская", ingredients: "овощи, картофель фри", price300: 195, price400: 235, price500: 275 },
    { name: "Кавказская", ingredients: "маринованный лук, картофель фри", price300: 240, price400: 285, price500: 330 }
];

let additions = [
    { name: "Шрирача", price: 25 },
    { name: "Халапеньо", price: 30 },
    { name: "Сыр", price: 45 },
    { name: "Картофель фри", price: 40 },
    { name: "Мясо цыпленка", price: 60 },
    { name: "Лук маринованный", price: 20 },
    { name: "Морковча", price: 25 }
];

let cart = [];

function showMenu() {
    let container = document.getElementById('menu');
    container.innerHTML = '';
    
    for (let i = 0; i < menu.length; i++) {
        let item = menu[i];
        let card = document.createElement('div');
        card.className = 'item';
        
        let title = document.createElement('h3');
        title.innerText = item.name;
        card.appendChild(title);
        
        let ingredients = document.createElement('div');
        ingredients.className = 'ingredients';
        ingredients.innerText = item.ingredients;
        card.appendChild(ingredients);
        
        let sizeBlock = document.createElement('div');
        sizeBlock.className = 'size-buttons';
        
        let btn300 = document.createElement('button');
        btn300.innerText = '300 г';
        btn300.className = 'size-btn active';
        let btn400 = document.createElement('button');
        btn400.innerText = '400 г';
        btn400.className = 'size-btn';
        let btn500 = document.createElement('button');
        btn500.innerText = '500 г';
        btn500.className = 'size-btn';
        
        sizeBlock.appendChild(btn300);
        sizeBlock.appendChild(btn400);
        sizeBlock.appendChild(btn500);
        card.appendChild(sizeBlock);
        
        let priceBlock = document.createElement('div');
        priceBlock.className = 'price';
        priceBlock.innerText = item.price300 + ' руб';
        card.appendChild(priceBlock);
        
        let additionsTitle = document.createElement('div');
        additionsTitle.className = 'toppings-title';
        additionsTitle.innerText = 'Добавки:';
        card.appendChild(additionsTitle);
        
        let selectedAdditions = [];
        
        for (let j = 0; j < additions.length; j++) {
            let add = additions[j];
            let addBlock = document.createElement('div');
            addBlock.className = 'topping';
            
            let addName = document.createElement('span');
            addName.className = 'topping-name';
            addName.innerText = add.name;
            
            let addPrice = document.createElement('span');
            addPrice.className = 'topping-price';
            addPrice.innerText = '+' + add.price + ' руб';
            
            let addBtn = document.createElement('button');
            addBtn.innerText = '+';
            addBtn.className = 'add-topping';
            
            addBtn.onclick = function() {
                selectedAdditions.push({ name: add.name, price: add.price });
                updateSelected(card, selectedAdditions, priceBlock, item, getCurrentSize(btn300, btn400, btn500));
            };
            
            addBlock.appendChild(addName);
            addBlock.appendChild(addPrice);
            addBlock.appendChild(addBtn);
            card.appendChild(addBlock);
        }
        
        let selectedBlock = document.createElement('div');
        selectedBlock.className = 'selected';
        
        let selectedTitle = document.createElement('div');
        selectedTitle.className = 'selected-title';
        selectedTitle.innerText = 'Выбрано:';
        selectedBlock.appendChild(selectedTitle);
        
        let selectedList = document.createElement('div');
        selectedList.className = 'selected-list';
        selectedBlock.appendChild(selectedList);
        card.appendChild(selectedBlock);
        
        let addToCart = document.createElement('button');
        addToCart.innerText = 'Добавить в заказ';
        addToCart.className = 'add-btn';
        addToCart.onclick = function() {
            let size = getCurrentSize(btn300, btn400, btn500);
            let basePrice = getPrice(item, size);
            let additionsSum = 0;
            for (let a = 0; a < selectedAdditions.length; a++) {
                additionsSum = additionsSum + selectedAdditions[a].price;
            }
            let total = basePrice + additionsSum;
            
            cart.push({
                name: item.name,
                size: size,
                additions: selectedAdditions.slice(),
                price: total
            });
            updateCart();
        };
        card.appendChild(addToCart);
        
        container.appendChild(card);
        
        btn300.onclick = function() {
            setActive(btn300, btn400, btn500);
            let size = 300;
            let basePrice = getPrice(item, size);
            let additionsSum = 0;
            for (let a = 0; a < selectedAdditions.length; a++) {
                additionsSum = additionsSum + selectedAdditions[a].price;
            }
            priceBlock.innerText = (basePrice + additionsSum) + ' руб';
            updateSelected(card, selectedAdditions, priceBlock, item, size);
        };
        
        btn400.onclick = function() {
            setActive(btn400, btn300, btn500);
            let size = 400;
            let basePrice = getPrice(item, size);
            let additionsSum = 0;
            for (let a = 0; a < selectedAdditions.length; a++) {
                additionsSum = additionsSum + selectedAdditions[a].price;
            }
            priceBlock.innerText = (basePrice + additionsSum) + ' руб';
            updateSelected(card, selectedAdditions, priceBlock, item, size);
        };
        
        btn500.onclick = function() {
            setActive(btn500, btn300, btn400);
            let size = 500;
            let basePrice = getPrice(item, size);
            let additionsSum = 0;
            for (let a = 0; a < selectedAdditions.length; a++) {
                additionsSum = additionsSum + selectedAdditions[a].price;
            }
            priceBlock.innerText = (basePrice + additionsSum) + ' руб';
            updateSelected(card, selectedAdditions, priceBlock, item, size);
        };
    }
}

function getCurrentSize(btn300, btn400, btn500) {
    if (btn300.className.includes('active')) return 300;
    if (btn400.className.includes('active')) return 400;
    return 500;
}

function setActive(active, b1, b2) {
    active.className = 'size-btn active';
    b1.className = 'size-btn';
    b2.className = 'size-btn';
}

function getPrice(item, size) {
    if (size == 300) return item.price300;
    if (size == 400) return item.price400;
    return item.price500;
}

function updateSelected(card, selected, priceBlock, item, size) {
    let list = card.querySelector('.selected-list');
    list.innerHTML = '';
    
    if (selected.length == 0) {
        let empty = document.createElement('span');
        empty.className = 'empty';
        empty.innerText = 'нет добавок';
        list.appendChild(empty);
    } else {
        for (let i = 0; i < selected.length; i++) {
            let tag = document.createElement('span');
            tag.className = 'selected-tag';
            tag.innerText = selected[i].name + ' +' + selected[i].price + ' руб ';
            
            let remove = document.createElement('button');
            remove.innerText = 'x';
            remove.className = 'remove-topping';
            remove.onclick = function() {
                selected.splice(i, 1);
                updateSelected(card, selected, priceBlock, item, size);
                let basePrice = getPrice(item, size);
                let sum = 0;
                for (let a = 0; a < selected.length; a++) {
                    sum = sum + selected[a].price;
                }
                priceBlock.innerText = (basePrice + sum) + ' руб';
            };
            
            tag.appendChild(remove);
            list.appendChild(tag);
        }
    }
}

function updateCart() {
    let cartDiv = document.getElementById('cart');
    let totalSpan = document.getElementById('total');
    cartDiv.innerHTML = '';
    
    if (cart.length == 0) {
        let empty = document.createElement('div');
        empty.style.padding = '20px';
        empty.style.textAlign = 'center';
        empty.style.color = '#999';
        empty.innerText = 'Корзина пуста';
        cartDiv.appendChild(empty);
        totalSpan.innerText = '0';
        return;
    }
    
    let total = 0;
    
    for (let i = 0; i < cart.length; i++) {
        let item = cart[i];
        total = total + item.price;
        
        let row = document.createElement('div');
        row.className = 'cart-item';
        
        let info = document.createElement('div');
        info.className = 'cart-item-info';
        
        let name = document.createElement('strong');
        name.innerText = item.name + ' (' + item.size + 'г)';
        info.appendChild(name);
        
        if (item.additions.length > 0) {
            let addDiv = document.createElement('div');
            addDiv.className = 'cart-toppings';
            let names = [];
            for (let a = 0; a < item.additions.length; a++) {
                names.push(item.additions[a].name);
            }
            addDiv.innerText = '+' + names.join(', ');
            info.appendChild(addDiv);
        }
        
        let price = document.createElement('div');
        price.innerText = item.price + ' руб';
        
        let remove = document.createElement('button');
        remove.innerText = 'Удалить';
        remove.className = 'remove-item';
        remove.onclick = function() {
            cart.splice(i, 1);
            updateCart();
        };
        
        row.appendChild(info);
        row.appendChild(price);
        row.appendChild(remove);
        cartDiv.appendChild(row);
    }
    
    totalSpan.innerText = total;
}

document.getElementById('clearCart').onclick = function() {
    cart = [];
    updateCart();
};

showMenu();
updateCart();