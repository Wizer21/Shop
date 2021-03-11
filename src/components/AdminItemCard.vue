<template>
    <div id="main">
        <p id="title">
            {{ item.name }}
        </p>
        <p id="stocks">
            {{ getStockList }}
        </p>    
        <div id="details">
            <div v-for="size in getItemSizes" :key='size.s_name' class="line">
                <p>
                    {{ size.s_name }}
                </p>
                <div class="inline">
                    <p class="sub">Stock</p>
                    <input type="number" class="input" :value="size.stock">    
                </div>
                <div class="inline">
                    <p class="sub">BuyP</p>
                    <input type="number" class="input" :value="size.buy_p"> 
                </div>  
                <div class="inline">
                    <p class="sub">SellP</p>
                    <input type="number" class="input" :value="size.sell_p">  
                </div>   
                <div class="inline">
                    <p class="sub">TVA</p>
                    <input type="number" class="input" :value="size.tva">    
                </div>              
            </div>
        </div>  
    </div>
</template>

<script>
    export default {    
        name: 'AdminItemCard',
        props: {
            item: {
                type: Object,
                required: true,
            }
        },
        computed: {
            getStockList() {
                let text = ''

                for (let size of this.item.sizes){
                    text += size.stock 
                    text += " / "
                }
                
                return text.substring(0, text.length - 3)
            },
            getItemSizes() {
                return this.item.sizes
            }
        }
    }
</script>

<style scoped>
#main
{
    position: relative;
    overflow: hidden;
    margin: 1em;
    margin-left: 5vw;
    margin-right: 5vw;


    display: grid;

    border: 1px solid black;
    background-color: white;
}
#title
{
    font-size: 2em;
    margin: 0.5em;
}
#stocks
{
    position: absolute;
    font-size: 2em;
    width: 100%;
    text-align: center;

    margin: 0.5em;
    transition-duration: 400ms;
}
#details
{    
    position: relative;
    font-size: 0em;
    height: 0%;

    transition-duration: 400ms;
}
#main:hover #stocks
{
    transform: translate(0em, 2em);
    opacity: 0;
}
#main:hover #details
{
    font-size: 2em;
    height: 100%;
}
.line
{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items:flex-end;
    justify-content: space-between;

    margin: 0.5em;
    margin-bottom: 0.2em;
}
.line p 
{
    margin: 0.2em;
}
.input
{
    font-size: 0em;
    opacity: 0;
    border: 0px solid transparent;
    outline: none;
}
#main:hover .input
{
    font-size: 0.8em;
    opacity: 1;
}
.input:hover
{
    border: 1px solid black;
}
.sub
{    
    font-size: 0em;
    opacity: 0;
}
#main:hover .sub
{
    font-size: 0.6em;
    opacity: 1;
}
.inline
{
    display: flex;
    flex-direction: row;
}
</style>