const form = document.querySelector("form")

const fullName = document.getElementById('name')
const email = document.getElementById('email')
const phone = document.getElementById('phone')
const subject = document.getElementById('subject')
const messages = document.getElementById('messages')

function sendEmail(){

    const bodymessages = 
    `Full Name: ${fullName.value}<br>
    Email: ${email.value}<br>
    Phone: ${phone.value}<br>
    Messages: ${messages.value}<br>`

    Email.send({
        // SecureToken: "bf4ce114-2177-44d7-a0ec-fe3f212c8ea1",
        Host : "smtp.elasticemail.com",
        Username : "koushiksaha0022@gmail.com",
        Password : "E1E3CE9C281A5D15C462C7DF3FE6FEA568D3",
        To : 'koushiksaha0022@gmail.com',
        From : "koushiksaha0022@gmail.com",
        Subject : subject.value,
        Body : bodymessages
    }).then(
      message => {
        if(message == "OK"){
            Swal.fire({
                title: "Success",
                text: "Message sent Successfully",
                icon: "success"
              });
        }
      }
    );
}

function checkInput(){
    const items = document.querySelectorAll(".item")

    for(const item of items){
        if(item.value == ""){
            item.classList.add("error")
            item.parentElement.classList.add("error")
        }

        if(items[1].value != ""){
            emailCheck()
        }

        items[1].addEventListener("keyup", ()=>{
            emailCheck()
        })

        item.addEventListener("keyup", ()=>{
            if(item.value != ""){
                item.classList.remove("error")
                item.parentElement.classList.remove("error")
            }else{
                item.classList.add("error")
                item.parentElement.classList.add("error")
            }
        })

    }
}

function emailCheck(){
    const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
    const errorTxtEmail = document.querySelector(".error-txt.email")

    if(!email.value.match(emailRegex)){
        email.classList.add("error")
        email.parentElement.classList.add("error")

        if(email.value != ""){
            errorTxtEmail.innerHTML = "Enter a vaild email address"
        }else{
            errorTxtEmail.innerHTML = "Email Address can't be blank"
        }   

    }else{
        email.classList.remove("error")
        email.parentElement.classList.remove("error")
    }
}

form.addEventListener("submit", (e)=>{
    e.preventDefault()

    checkInput()
    
    if(!fullName.classList.contains("error") && !email.classList.contains("error") && !phone.classList.contains("error") && !subject.classList.contains("error") && !messages.classList.contains("error")){
        sendEmail()

        form.reset();
        return false;
    }
    
})