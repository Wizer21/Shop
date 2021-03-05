<template>
    <div id="main">            
        <button id="swap_button">
            Swap
        </button>
        <div id="login">
            <h1 id="login_title">
                Login
            </h1>
            <div id="body_top">
                <p class="text">
                    Username
                </p>
                <input class="spacing" type="text" name="">
                <p class="text">
                    Password
                </p>
                <input class="spacing" type="text" name="">
                <button class="spacing">
                    Connection
                </button>
            </div>
        </div>
        <div id="register">
            <div id="body_bottom">
                <p class="text">
                    Username
                </p>
                <input class="spacing" type="text" name="">
                <p class="text">
                    Password
                </p>
                <input class="spacing" type="text" name="">
                <button class="spacing">
                    Connection
                </button>
            </div>
            <h1 id="register-title">
                Register
            </h1>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login'
    ,
    mounted(){
        const main = document.getElementById("main")
        main.parentNode.style.overflow = "hidden"
        main.parentNode.parentNode.style.overflow = "hidden"

        const button_slide = document.getElementById("swap_button")
        const register = document.getElementById("register")
        const login = document.getElementById("login")
        let onLogin = true

        button_slide.addEventListener("click", () => {
            if (onLogin){
                onLogin = false

                login.style.transform = "translate(-100vh, -100vh)"
                register.style.transform = "translate(-15vh, -15vh)"
            }
            else{
                onLogin = true

                login.style.transform = "translate(15vh, 15vh)"
                register.style.transform = "translate(200vh, 200vh)"
            }
        })
    }
}
</script>

<style scoped>
#main.
{
    height: 90vh;
    width: 90vw;
    overflow: hidden;
    background-color: aqua;
}
#login
{
    position: absolute;
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;

    transition-duration: 2s;

    pointer-events: none;
    transform: translate(15vh, 15vh);
}
#register
{    
    position: absolute;
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;

    transition-duration: 2s;
    transform: translate(200vh, 100vh);

    pointer-events: none;
}
#body_top
{
    position: relative;
    margin: 0px;
    display: grid;
    grid-template-rows: repeat(3, 0fr);
    width: 40vw;
    
    margin: 5em;
    margin-right: auto;
    margin-bottom: 40vh;
}
#body_bottom
{
    position: relative;
    margin: 0px;
    display: grid;
    grid-template-rows: repeat(3, 0fr);
    width: 40vw;    

    margin: 5em;
    margin-left: auto;
    margin-top: 40vh;
}
.spacing
{
    margin-top: 0em;
    margin-bottom: 0.5em;
}
.text
{
    position: relative;
    margin: 0em;
    margin-top: 1em;
    align-self: baseline;
}
#login_title
{
    position: relative;
    text-align: left;
    padding: 1em;
    padding-bottom: 0em;
    margin: 0em;
}
#register-title
{
    position: relative;
    text-align: right;
    margin: 0em;
    padding: 1em;
}
#swap_button
{
    margin: 4em;
    left: 80vw;

    position: absolute;
    height: 10vh;
    align-self: center;
}
</style>
