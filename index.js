    let socket = new ReconnectingWebSocket("ws://127.0.0.1:24050/ws");
let pp = document.getElementById('pp')
let ppIfFc = document.getElementById('ppIfFc')
let thing = document.getElementById('thing')

socket.onopen = () => {
    console.log("Successfully Connected");
};

socket.onclose = event => {
    console.log("Socket Closed Connection: ", event);
    socket.send("Client Closed!")
};

socket.onerror = error => {
    console.log("Socket Error: ", error);
};
let animation = {
    pp: new CountUp('pp', 0, 0, 2, 1, { decimalPlaces: 2, useEasing: true, useGrouping: false, separator: " ", decimal: "." }),
    ppIfFc: new CountUp('ppIfFc', 0, 0, 2, 1, { decimalPlaces: 2, useEasing: true, useGrouping: false, separator: " ", decimal: "." }),
};
let tempState;
socket.onmessage = event => {
    let data = JSON.parse(event.data);
    if (tempState !== data.menu.state) {
        tempState = data.menu.state;
        if (tempState == 2) {
            pp.style.opacity = 1
            ppIfFc.style.opacity = 1
            thing.style.opacity = 1
            
        } else {
            pp.style.opacity = 0
            ppIfFc.style.opacity = 0
            thing.style.opacity = 0
        }
    }
    if (data.gameplay.hits.unstableRate != '') {
        animation.pp.update(data.gameplay.pp.current)
        animation.ppIfFc.update(data.gameplay.pp.fc)
        
        
    } else {
        animation.pp.update(0)
        animation.ppIfFc.update(0)
        

    }
}