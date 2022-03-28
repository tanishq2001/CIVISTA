const contactForm = document.querySelector('.contact-form');

let name = document.getElementById('name');
let email = document.getElementById('email');
let subject = document.getElementById('subject');
let message = document.getElementById('message');


contactForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log("submit clicked")

    let formData={
        name:name.value,
        email:email.value,
        subject:subject.value,
        message:message.value
    }
    console.log(formData);

    let mailRequest = new XMLHttpRequest();
    mailRequest.open('POST','/');
    mailRequest.setRequestHeader('content-type','application/json');
    mailRequest.onload=function(){
        console.log(mailRequest.responseText);
        if(mailRequest.responseText=='success'){
            alert("Email Sent");
            name.value='';
            email.value='';
            subject.value='';
            message.value='';
        }else{
            alert("Something Went Wrong");
        }
    }
    mailRequest.send(null);
    
});