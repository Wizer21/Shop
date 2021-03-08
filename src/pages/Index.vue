<template>
    <div id="main">
        <a href="/main"> 
            <h1 id="title">
                PlantShop
            </h1>
            <p id="sub">
                because we love plants 
            </p>
        </a>
    </div>
</template>

<script>
export default {
    name: 'Index',
}

</script>

<style scoped>
@font-face {
    font-family: Caveat;
    src: url(../font/Caveat-Regular.ttf) format('Caveat');
}
#main
{
    position: relative;
    overflow: hidden;

    display: flex;
    justify-content: center;
    padding-top: 40vh;
}

#title
{
    font-size: 4em;
    margin: 0em;
    transition-duration: 3000ms;
    overflow: visible;
}
#title:hover
{
    transition-duration: 3000ms;
    transform: scale(1.5) rotate(-2deg);
}
a
{
    color: black;
    text-decoration: none;
}
#sub
{
    text-align: center;
    font-family: 'Caveat';
}
</style>

