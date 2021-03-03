import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'

const adapter = new LocalStorage('./db.json')
const db = low(adapter)

db.defaults({ 
    users: {
        0: {
            name: 'Simon',
            password: '123',
            isAdmin: true,
            cart: [],
            history: []
        },
    },
    objects: {
        0: {
            name: 'Monstera Deliciosa',
            description: 'The specific epithet deliciosa means "delicious", referring to the edible fruit, while monstera means "monstrous", in reference to the size that this plant can grow to, over 9 m.',
            stock: 0,
            size: [
                {
                    s_name: 'M',
                    buy_p: '5.34',
                    tva: '20%',
                    sell_: '8.94',
                    image: 'url'
                }
            ]
        }
    }
}).write()

exports.getUserFromName = function getUserFromName(newPseudo){   
return db.get('users')
        .find({pseudo: newPseudo})
        .value()
}

exports.getObjectList = function getObjectList(){   
    return db.get('objects')
            .value()
    }