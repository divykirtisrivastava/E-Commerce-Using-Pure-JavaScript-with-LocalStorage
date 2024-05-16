let root = document.getElementById('root')
let sp = document.getElementById('sp')
let cartBox = document.querySelector('.cartBox')
let btn = document.getElementById('btn')

async function getData() {
    let raw = await fetch('https://fakestoreapi.com/products')
    let data = await raw.json()
    return data
}
getData()
    .then((data) => {
        console.log(data)

    function displayData(){
        root.innerHTML = ''
        data.map((item) => {
            let x = ''
            for(let i=1; i<=Math.round(item.rating.rate); i++){
                x += '⭐'
            }
            let card = document.createElement('div')
            card.classList.add('card')
            card.innerHTML = `<img src="${item.image}" alt="">
        <h2>${item.title}</h2>
        <h3>Category:- ${item.category}</h3>
        <h2>Price:- ${Math.ceil(item.price) * 10} Rs.</h2>
        <h3>Rating:- ${item.rating.rate} ${x}</h3>
        <button onclick="addToCart(${item.id})">Add to Cart</button>`
            root.appendChild(card)
        })
    }

        window.addToCart = (pId) => {

            // add item to cart when click on addToCart 

            let product = data.find((item) => pId === item.id)
            if (product) {
                let row = document.createElement('div')
                row.classList.add('row')
                row.innerHTML = `
            <div>
            <h2>${product.title}</h2>
            <h3>Price:- ${Math.ceil(product.price) * 10}</h3>
            </div>
            <button onclick="removeToCart(${product.id})">Remove</button>
            `
                cartBox.prepend(row)

            // add item to localstorage when click on addToCart

                let cartItem = JSON.parse(localStorage.getItem('cart')) || []
                cartItem.push(product)
                localStorage.setItem('cart', JSON.stringify(cartItem))

            // increase cart length when click on addToCart

                sp.innerHTML = `${cartItem.length}`
            
            // calculate total price when click on addToCart
            
                let final = cartItem.reduce((x, y) => x + (Math.ceil(y.price) * 10), 0)
                let tp = document.getElementById('tp')
                tp.innerHTML = `${final}`
            }
        }

       // for display the cartLength by default 
        let cartItem = JSON.parse(localStorage.getItem('cart')) || []
        sp.innerHTML = `${cartItem.length}`

        // to display the cart default

        function displayCart() {
            cartBox.innerHTML = ''
            cartItem.map((item, index) => {
                let row = document.createElement('div')
                row.classList.add('row')
                row.innerHTML = `
            <div>
            <h2>${item.title}</h2>
            <h3>Price:- ${Math.ceil(item.price) * 10}</h3>
            </div>
            <button onclick="removeToCart(${index})">Remove</button>
            `
                cartBox.appendChild(row)
            })

            let last = document.createElement('div')
            last.classList.add('last')
            last.innerHTML = `
            <h2>Total Price:- </h2>
            <h2 id='tp'></h2>
            `
            cartBox.appendChild(last)
            let final = cartItem.reduce((x, y) => x + (Math.ceil(y.price) * 10), 0)
            let tp = document.getElementById('tp')
            tp.innerHTML = `${final}`


        }

        window.removeToCart = (index) => {

            // set the cartItems after delete the target item

            let cartItem = JSON.parse(localStorage.getItem('cart'))
            cartItem.splice(index, 1)
            localStorage.setItem('cart', JSON.stringify(cartItem))

            // show the cartLength after delete the target item

            sp.innerHTML = `${cartItem.length}`

            // show the cartItems after delete the target item

            cartBox.innerHTML = ''
            cartItem.map((item, index) => {
                let row = document.createElement('div')
                row.classList.add('row')
                row.innerHTML = `
            <div>
            <h2>${item.title}</h2>
            <h3>Price:- ${Math.ceil(item.price) * 10}</h3>
            </div>
            <button onclick="removeToCart(${index})">Remove</button>
            `
                cartBox.appendChild(row)
            })

            // show the totalPrice after delete the target item

            let last = document.createElement('div')
            last.classList.add('last')
            last.innerHTML = `
            <h2>Total Price:- </h2>
            <h2 id='tp'></h2>
            `
            cartBox.appendChild(last)
            let final = cartItem.reduce((x, y) => x + (Math.ceil(y.price) * 10), 0)
            let tp = document.getElementById('tp')
            tp.innerHTML = `${final}`
        }

        displayCart()
        displayData()

        // toggle the cart display

        let flag = 0
        btn.addEventListener('click', () => {
            if (flag == 0) {
                cartBox.classList.add('show')
                flag = 1
            } else {
                cartBox.classList.remove('show')
                flag = 0
            }
        })

// show all data
        window.allData = ()=>{
            root.innerHTML = ''
            data.map((item) => {
                let x = ''
                for(let i=1; i<=Math.round(item.rating.rate); i++){
                    x += '⭐'
                }
                let card = document.createElement('div')
                card.classList.add('card')
                card.innerHTML = `<img src="${item.image}" alt="">
            <h2>${item.title}</h2>
            <h3>Category:- ${item.category}</h3>
            <h2>Price:- ${Math.ceil(item.price) * 10} Rs.</h2>
            <h3>Rating:- ${item.rating.rate} ${x}</h3>
            <button onclick="addToCart(${item.id})">Add to Cart</button>`
                root.appendChild(card)
            })
        }
// show Mens data
        window.mens = ()=>{
            let result = data.filter((item)=> item.category == "men's clothing")
            console.log(result)
            root.innerHTML = ''
            result.map((item) => {
                let x = ''
                for(let i=1; i<=Math.round(item.rating.rate); i++){
                    x += '⭐'
                }
                let card = document.createElement('div')
                card.classList.add('card')
                card.innerHTML = `<img src="${item.image}" alt="">
            <h2>${item.title}</h2>
            <h3>Category:- ${item.category}</h3>
            <h2>Price:- ${Math.ceil(item.price) * 10} Rs.</h2>
            <h3>Rating:- ${item.rating.rate} ${x}</h3>
            <button onclick="addToCart(${item.id})">Add to Cart</button>`
                root.appendChild(card)
            })
        }
// show Jewelery data    
        window.jewelery = ()=>{
            let result = data.filter((item)=> item.category == "jewelery")
            console.log(result)
            root.innerHTML = ''
            result.map((item) => {
                let x = ''
                for(let i=1; i<=Math.round(item.rating.rate); i++){
                    x += '⭐'
                }
                let card = document.createElement('div')
                card.classList.add('card')
                card.innerHTML = `<img src="${item.image}" alt="">
            <h2>${item.title}</h2>
            <h3>Category:- ${item.category}</h3>
            <h2>Price:- ${Math.ceil(item.price) * 10} Rs.</h2>
            <h3>Rating:- ${item.rating.rate} ${x}</h3>
            <button onclick="addToCart(${item.id})">Add to Cart</button>`
                root.appendChild(card)
            })
        }
// show electronics data
        window.electronics = ()=>{
            let result = data.filter((item)=> item.category == "electronics")
            console.log(result)
            root.innerHTML = ''
            result.map((item) => {
                let x = ''
                for(let i=1; i<=Math.round(item.rating.rate); i++){
                    x += '⭐'
                }
                let card = document.createElement('div')
                card.classList.add('card')
                card.innerHTML = `<img src="${item.image}" alt="">
            <h2>${item.title}</h2>
            <h3>Category:- ${item.category}</h3>
            <h2>Price:- ${Math.ceil(item.price) * 10} Rs.</h2>
            <h3>Rating:- ${item.rating.rate} ${x}</h3>
            <button onclick="addToCart(${item.id})">Add to Cart</button>`
                root.appendChild(card)
            })
        }

    })
    .catch((err) => {
        console.log(err)
    })

