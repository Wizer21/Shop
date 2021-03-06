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
                <input id="r_username" class="spacing" type="text">
                <p class="text">
                    Password
                </p>
                <input id="r_password" class="spacing" type="text">
                <p class="text">
                    Confirm Password
                </p>
                <input id="r_password2" class="spacing" type="text">
                <button class="spacing" @click="registerClicked()">
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
const db = require('../lowdb/lowdb.js')
export default {
    name: 'Login'
    ,
    mounted(){
        const button_slide = document.getElementById("swap_button")
        const register = document.getElementById("register")
        const login = document.getElementById("login")
        let onLogin = true

        button_slide.addEventListener("click", () => {
            if (onLogin){
                onLogin = false

                login.style.transform = "translate(-100vw, -100vh)"
                register.style.transform = "translate(0vw, 0vh)"
                button_slide.style.transform = "translate(10vw, 60vh)"
            }
            else{
                onLogin = true

                login.style.transform = "translate(0vw, 0vh)"
                register.style.transform = "translate(200vw, 200vh)"
                button_slide.style.transform = "translate(70vw, 20vh)"
            }
        })
    },
    methods: {
        registerClicked() {
            // Button not clickable if one the input is empty
            const r_username = document.getElementById("r_username").value
            const r_password = document.getElementById("r_password").value
            const r_password2 = document.getElementById("r_password2").value
            if (r_password != r_password2){
                return
            }
            else{               
                if (db.getUserFromName(r_username) == undefined){
                    db.registerUser(r_username, r_password)
                    window.location.href = '/main'

                    this.$store.commit("login")
                }
                else{
                    console.log("username not avaible")
                }
            }
        }
    },
}
</script>

<style scoped>
#main
{
    position: relative;
    height: 100vh;
    width: 100vw;
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

    transform: translate(0vw, 0vh);
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
    margin-top: 5em;
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

    margin: 2em;
    margin-bottom: 0em;
}
#register-title
{
    position: relative;
    text-align: left;
    left: 50vw;
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

    transform: translate(70vw, 20vh);
}
</style>
