import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'

const adapter = new LocalStorage('db.json')
const db = low(adapter)

db.defaults({
    users_count: 1,
    objects_count: 3,
    order_count: 1,
    users: [     
        {
            id: 0,
            name: 'Admin',
            password: '123',
            isAdmin: true,
            cart: [],
            history: []
        },
        {
            id: 1,
            name: 'Simon',
            password: '123',
            isAdmin: false,
            cart: [
                {
                    id: 0,
                    sizes: [
                        {
                            size: "S",
                            quantity: 2
                        }
                    ]
                }
            ],
            history: []
        },
    ],
    orders: [
        {
            id: 0,
            user_id: 1,
            order: [
                {
                    object_id: 0,
                    object_size: 'M',
                    quantity: 5,
                },
            ]
        }
    ],
    objects: [
        {
            id: 0,
            name: 'Monstera Deliciosa',
            description: 'The specific epithet deliciosa means "delicious", referring to the edible fruit, while monstera means "monstrous", in reference to the size that this plant can grow to, over 9 m.',
            sizes: [
                {
                    s_name: 'S',
                    buy_p: '15.34',
                    tva: '20',
                    sell_p: '18.94',
                    image: 'monstera_s.jpg',
                    stock: 8,
                },
                {
                    s_name: 'M',
                    buy_p: '24.24',
                    tva: '20',
                    sell_p: '35.12',
                    image: 'monstera_s.jpg',
                    stock: 12,
                },
                {
                    s_name: 'L',
                    buy_p: '45.34',
                    tva: '20',
                    sell_p: '67.54',
                    image: 'monstera_l.jpg',
                    stock: 0,
                },
            ]
        },
        {
            id: 1,
            name: 'Dieffenbachia',
            description: 'Dieffenbachia is a genus of plants in the family Araceae. They are plants with mottled leaves, also called canes of the dumb in the common language.',
            sizes: [
                {
                    s_name: 'M',
                    buy_p: '3.34',
                    tva: '20',
                    sell_p: '7.84',
                    image: 'dieffenbachia_m.jpg',                    
                    stock: 18,
                }
            ]
        },
        {
            id: 2,
            name: 'Dracaena',
            description: 'Dracaena is a genus of plants of the family Asparagaceae. This genus was created by Linnaeus in 1767 in Systema Naturae.',
            sizes: [
                {
                    s_name: 'M',
                    buy_p: '2.34',
                    tva: '20',
                    sell_p: '5.84',
                    image: 'dracaena_m.jpg',
                    stock: 60,
                }
            ]
        }
    ]
}).write()

export function getUserFromName(username){   
    return db.get('users')
          .find({name: username})
          .value()
}

export function loginUser(l_username, l_password){
    let user = db.get('users')
                    .find({name: l_username})
                    .value()

    if (user != undefined && user.password == l_password){
        return [true, user]
    }
    else{
        return [false]
    }
}

export function registerUser(username, password){   
    let current_id = db.get('users_count').value()

    db.get('users')
        .push({
            id: current_id,
            name: username,
            password: password,
            isAdmin: false,
            cart: [],
            history: []
            }
        )
        .write()    
    
    db.update('users_count', n => n + 1).write()
    return current_id
}

export function getObjectList(){
    return db.get('objects')
        .value()
}

export function getUserCart(id){
    return db.get('users')
        .find({id: id})
        .get('cart')
        .value()
}

export function addToCart(user_id, item_id, item_size){
    let plantExist = db.get('users')
                    .find({id: user_id})
                    .get('cart')
                    .find({id: item_id})
                    .value()

    // Plant Exist
    if (plantExist){
        let sizeExist = db.get('users')
                        .find({id: user_id})
                        .get('cart')
                        .find({id: item_id})
                        .get('sizes')
                        .find({size: item_size})
                        .value()
        
        // Size Exist
        if (sizeExist){
            db.get('users')
            .find({id: user_id})
            .get('cart')
            .find({id: item_id})
            .get('sizes')
            .find({size: item_size})
            .update('quantity', n => n + 1).write()
        }
        // Size Do not exist
        else{
            db.get('users')
            .find({id: user_id})
            .get('cart')
            .find({id: item_id})
            .get('sizes')
            .push({
                size: item_size,
                quantity: 1
            })
            .write()            
        }
    }
    // Plant Do not exist
    else{
        db.get('users')
        .find({id: user_id})
        .get('cart')
        .push({
            id: item_id,
            sizes: [
                {
                    size: item_size,
                    quantity: 1
                }
            ]
        })
        .write() 
    }
}

export function removeFromCart(user_id, item_id, item_size){     
    db.get('users')
    .find({id: user_id})
    .get('cart')
    .find({id: item_id})
    .get('sizes')
    .find({size: item_size})
    .update('quantity', n => n - 1)
    .write()
}

export function deleteItemFromCart(user_id, item_id, item_size){
    db.get('users')
    .find({id: user_id})
    .get('cart')
    .find({id: item_id})
    .get('sizes')
    .remove({size: item_size})
    .write()

    let cart = db.get('users')
                .find({id: user_id})
                .get('cart')
                .find({id: item_id})
                .get('sizes')
                .value()

    if (cart.length == 0){
        db.get('users')
        .find({id: user_id})
        .get('cart')
        .remove({id: item_id})
        .write()
    }
}

export function getCardLength(user_id){
    const cart = db.get('users')
                .find({id: user_id})
                .get('cart')
                .value()

    let count = 0
    for(let item of cart){
        for (let size of item.sizes){
            count += size.quantity
        }
    }
    
    return count
}

export function getImageSrc(item_id, item_size){
    return db.get('objects')
            .find({id: item_id})
            .get('sizes')
            .find({s_name: item_size})
            .get('image')
            .value()
}

export function getItemFromId(item_id){    
    return db.get('objects')
            .find({id: item_id})
            .value()
}

export function getUserFromId(user_id){
    return db.get('users')
            .find({id: user_id})
            .value()
}

export function getItemSellPrice(item_id, item_size){
    return db.get('objects')
            .find({id: item_id})
            .get('sizes')
            .find({s_name: item_size})
            .get('sell_p')
            .value()
}

export function getQuantityAvaible(item_id, item_size){
    return db.get('objects')
            .find({id: item_id})
            .get('sizes')
            .find({s_name: item_size})
            .get('stock')
            .value()
}

export function pushOrder(new_order){
    console.log(db.get('order_count').value())
    new_order['id'] = db.get('order_count').value()
    db.update('order_count', n => n + 1).write()

    db.get('orders').push(new_order).write()

    let item_list = new_order['order']
    for (let item of item_list){
        db.get('objects')
            .find({id: item.object_id})
            .get('sizes')
            .find({s_name: item.object_size})
            .update('stock', n => n - item.quantity)
            .write()
    }

    db.get('users')
    .find({id: new_order.user_id})
    .assign({'cart': []})
    .write()
}

export function getOrders(){
    return db.get('orders').value()
}