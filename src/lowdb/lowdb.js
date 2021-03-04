import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'

const adapter = new LocalStorage('db.json')
const db = low(adapter)

db.defaults({ 
    users: [
        {
            id: 0,
            name: 'Simon',
            password: '123',
            isAdmin: true,
            cart: [],
            history: []
        },
    ],
    objects: [
        {
            id: 0,
            name: 'Monstera Deliciosa',
            description: 'The specific epithet deliciosa means "delicious", referring to the edible fruit, while monstera means "monstrous", in reference to the size that this plant can grow to, over 9 m.',
            stock: 8,
            sizes: [
                {
                    s_name: 'S',
                    buy_p: '15.34',
                    tva: '20%',
                    sell_: '18.94',
                    image: 'monstera_s.jpg'
                },
                {
                    s_name: 'M',
                    buy_p: '24.24',
                    tva: '20%',
                    sell_: '35.12',
                    image: 'monstera_s.jpg'
                },
                {
                    s_name: 'L',
                    buy_p: '45.34',
                    tva: '20%',
                    sell_: '67.54',
                    image: 'monstera_s.jpg'
                },
            ]
        },
        {
            id: 1,
            name: 'Dieffenbachia ',
            description: 'Dieffenbachia is a genus of plants in the family Araceae. They are plants with mottled leaves, also called canes of the dumb in the common language.',
            stock: 10,
            sizes: [
                {
                    s_name: 'M',
                    buy_p: '3.34',
                    tva: '20%',
                    sell_: '7.84',
                    image: 'url'
                }
            ]
        },
        {
            id: 2,
            name: 'Dracaena ',
            description: 'Dracaena is a genus of plants of the family Asparagaceae. This genus was created by Linnaeus in 1767 in Systema Naturae.',
            stock: 80,
            sizes: [
                {
                    s_name: 'M',
                    buy_p: '2.34',
                    tva: '20%',
                    sell_: '5.84',
                    image: 'url'
                }
            ]
        }
    ]
}).write()

export function getUserFromName(newPseudo){   
    return db.get('users')
        .find({pseudo: newPseudo})
        .value()
}

export function getObjectList(){
    return db.get('objects')
        .value()
}
