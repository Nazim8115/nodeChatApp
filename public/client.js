const socket = io()
let name_1;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector(".message__area"); 
do{
    name_1 = prompt('Please enter your name :')

}while(!name_1)

textarea.addEventListener('keyup',(e)=>{
    if(e.key === 'Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    let msg ={
        user:name_1,
        message:message.trim()
    }
    // appennd...............
    appendMessage(msg,'outgoing')
    textarea.value = '';
    scrollToBottum();
    // send to server
    socket.emit('message',msg)
}

function appendMessage(msg,type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className,'message')

    let markup =` 
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// receive messages

socket.on('message',(msg)=>{
    appendMessage(msg,'incoming')
    scrollToBottum();
})

function scrollToBottum(){
    messageArea.scrollTop = messageArea.scrollHeight;
}



