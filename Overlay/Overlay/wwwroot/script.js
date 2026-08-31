const ws = new WebSocket("ws://localhost:4590");

console.log("WebSocket initialised")

ws.onmessage = (event) => {
    console.log("Message received")

    const res = JSON.parse(event.data);
    var elem;
    
    if (res.target.substring(4) === "img") 
    {
        elem = document.getElementById(res.target);

        if (elem) elem.src = res.value;
    }
    else {
        elem = document.getElementById(res.target);

        if(elem) elem.textContent = res.value;
    }
};

ws.onclose = () => setTimeout(() => location.reload(), 2000);
