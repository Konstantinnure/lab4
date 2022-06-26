let socket = io()
const form = document.getElementById('msg');
const messages = document.getElementById('messages');

form.send.onclick = function(e) {
    e.preventDefault();
    if (form.msg.value.trim()) {
        socket.emit('send', {id: window.localStorage.getItem('id'), msg: form.msg.value});
        form.msg.value = '';
    }
}
form.msg.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        form.send.dispatchEvent(new Event('click'));
    }
})

socket.on('send', (msg) => {
    displayMsg(msg, msg['id'])
})
socket.on('new', (msg) => {
    if(!window.localStorage.getItem('id')) {
        window.localStorage.setItem('id', Date.now());
    }
    msg.forEach(el => {
        displayMsg(el, el['id'])
    });
    socket.emit('checkID', window.localStorage.getItem('id'));
})

function displayMsg(el, id) {
    const message = document.createElement('p');
    id === window.localStorage.getItem('id') && message.setAttribute('id', 'my')
    message.innerHTML = el['msg']
    messages.append(message)
    messages.scrollBy(0, message.offsetHeight + parseInt(window.getComputedStyle(message).getPropertyValue('margin-top')))
}