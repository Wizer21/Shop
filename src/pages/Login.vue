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
                <input id="l_username" class="spacing input" type="text">
                <p class="text">
                    Password
                </p>
                <input id="l_password" class="spacing input" type="text">
                <button class="spacing button" @click="connectionClicked()">
                    Connection
                </button>
            </div>
        </div>
        <div id="register">
            <div id="body_bottom">
                <p class="text">
                    Username
                </p>
                <input id="r_username" class="spacing input" type="text">
                <p class="text">
                    Password
                </p>
                <input id="r_password" class="spacing input" type="text">
                <p class="text">
                    Confirm Password
                </p>
                <input id="r_password2" class="spacing input" type="text">
                <button class="spacing button" @click="registerClicked()">
                    Register
                </button>
            </div>
            <h1 id="register_title">
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
                console.log("Passwords are not the same")
                return
            }
            else{               
                if (db.getUserFromName(r_username) == undefined){
                    let new_id = db.registerUser(r_username, r_password)
                    this.$store.commit("login", {
                        user_id: new_id
                    })      
                    window.location.href = '/main'
                }
                else{
                    console.log("username not avaible")
                }
            }
        },
        connectionClicked(){            
            const l_username = document.getElementById("l_username").value
            const l_password = document.getElementById("l_password").value
            let connectionAttempt = db.loginUser(l_username, l_password)

            if (connectionAttempt[0]){    
                this.$store.commit("login", {
                    user_id: connectionAttempt[1].id
                })    
                window.location.href = '/main'  
            }
            else{                
                console.log("Connection failed")
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
    display: grid;
    grid-template-rows: repeat(3, 0fr);
    width: 40vw;
    
    margin: 7em;
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
@keyframes floating{
    0%{
        transform: scale(0);
    }
    50%{        
        transform: scale(2.5);
    }
    100%{        
        transform: scale(2);
    }
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
    font-size: 2em;
}
#login_title
{
    position: relative;
    text-align: left;

    margin: 2em;
    margin-bottom: 0em;
    font-size: 4em;
}
#register_title
{
    position: relative;
    text-align: left;
    left: 50vw;
    font-size: 4em;
}
#swap_button
{
    margin: 4em;
    z-index: 2;
    width: 7vw;
    height: 7vw;
    top: -3.5vw;
    left: -3.5vw;
    border-radius: 50%;
    background-color: transparent;
    border: 1px solid black;
    outline: none;

    position: absolute;
    font-size: 2em;
    transition-duration: 2s;

    transform: translate(70vw, 20vh);
}
#swap_button:hover
{
    transition-duration: 0.5s;
    width: 8vw;
    height: 8vw;  
    top: -4vw;
    left: -4vw;  
}
#swap_button:active
{
    transition-duration: 0.5s;
    width: 6vw;
    height: 6vw;  
    top: -3vw;
    left: -3vw;  
}
.input
{
    height: 5vh;
    outline: none;
}
.button
{
    font-size: 2em;
    background-color: transparent;
    border: 1px solid black;
    transition-duration: 300ms;
    outline: none;
}
.button:hover
{
    transition-duration: 300ms;
    transform: scale(1.05);
}
.button:active
{
    transition-duration: 50ms;
    transform: scale(1.02);
}

</style>
