<template>
    <div class="main">
        <p id="title">
            {{ item.name }}
        </p>
        <p id="stocks">
            {{ getStockList }}
        </p>      
    </div>
    <div class="details">
        Coucou
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
            }
        },
        mounted() {
            let details = document.getElementsByClassName("details")[this.item.id]
            let main = document.getElementsByClassName("main")[this.item.id]

            main.addEventListener('mouseover', () => {
                details.style.transform = "translate(0, 1.5em)"
            })
            main.addEventListener('mouseleave', () => {
                if (!details.matches(':hover')){
                    details.style.transform = "translate(0, 0em)"
                }
            })
            details.addEventListener('mouseleave', () => {
                if (!details.matches(':hover')){
                    details.style.transform = "translate(0, 0em)"
                }
            })
        }
    }
</script>

<style scoped>
.main
{
    margin: 2vw;
    margin-left: 5vw;
    margin-right: 5vw;

    display: flex;
    flex-direction: row;

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
}
.details
{    
    position: relative;
    margin-left: 6vw;
    margin-right: 6vw;
    font-size: 2em;

    top: -2.5em;
    transition-duration: 300ms;
    background-color: green;
    z-index: -1;
}
</style>