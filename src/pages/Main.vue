<template>
    <div id="main">
        <div id="nav_bar">
            <button v-if="state.logged" class="buttons">
                Profile
            </button>
            <a v-else href="/login">
                <button class="buttons">
                    Login
                </button>
            </a>
            <a href="/shop">
                <button class="buttons">
                    Shop
                </button>
            </a>
            <button v-if="state.logged" class="buttons">
                Cart
            </button>
        </div>
        <div id="flux">
            <div class="container" v-for="(image, index) in itemList" :key="index" >
                <img :src="require(`../images/${image}`)" alt="Image">
            </div>            
        </div>        
    </div>
</template>

<script>
const db = require('../lowdb/lowdb.js')

export default {
    name: 'Main',
    computed: {
        state(){
            return this.$store.state
        },
        itemList(){
            let items = db.getObjectList()    
            let list = []

            for (let item of items){
                for (let size of item.sizes){
                    list.push(size.image)
                }
            }
            console.log(list)

            return list
        }
    },
}

</script>

<style scoped>
#main
{   
    display: flex;
}
#nav_bar
{
    position: fixed;
    top: 0px;
    left: 0px;

    display: flex;
    flex-direction: column;

    height: 100vh;
    width: 40vw;
    border: 1px solid black;
}
#flux
{
    margin-left: 40vw;
}
.buttons
{
    margin: 0em;
    background-color: transparent;
    padding: 1em;
    font-size: 2em;
    width: 100%;

    border: 0px solid transparent;
    border-bottom: 1px solid black;
    outline: none;
}
.container
{
    position: relative;
    height: 60vw;
    width: 60vw;

    overflow: hidden;
    background-color: aqua;
}
.container img
{
    object-fit: cover;
    height: 100%;
    width: 100%;
}
</style>