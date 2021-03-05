<template>    
    <button id="swap_button">
        Swap
    </button>
    <div id="main">        
        <div id="login">
            <h1 id="login_title">
                Login
            </h1>
            <div id="body_top">
                <p class="text">
                    Username
                </p>
                <input class="spacing" type="text">
                <p class="text">
                    Password
                </p>
                <input class="spacing" type="text">
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
                <input class="spacing" type="text">
                <p class="text">
                    Password
                </p>
                <input class="spacing" type="text">
                <p class="text">
                    Confirm Password
                </p>
                <input class="spacing" type="text">
                <button class="spacing">
                    Register
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

                login.style.transform = "translate(-100vw, -100vh)"
                register.style.transform = "translate(-10vw, -20vh)"
                button_slide.style.transform = "translate(10vw, 60vh)"
            }
            else{
                onLogin = true

                login.style.transform = "translate(15vw, 15vh)"
                register.style.transform = "translate(200vw, 200vh)"
                button_slide.style.transform = "translate(80vw, 20vh)"
            }
        })
    }
}
</script>

<style scoped>
#main
{
    height: 90vh;
    width: 90vw;
    overflow: hidden;
}
#login
{
    position: absolute;
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;

    transition-duration: 2s;

    transform: translate(15vw, 15vh);
}
#register
{    
    position: absolute;
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;

    transition-duration: 2s;
    transform: translate(200vw, 100vh);

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
}
#swap_button
{
    margin: 4em;
    z-index: 2;
    width: 4em;
    height: 4em;
    border-radius: 50%;
    background-color: transparent;
    border: 1px solid black;
    outline: none;

    position: absolute;
    height: 10vh;
    align-self: center;
    transition-duration: 2s;

    transform: translate(80vw, 20vh);
}
</style>
