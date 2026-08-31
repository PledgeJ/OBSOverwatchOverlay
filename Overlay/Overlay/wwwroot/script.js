const ws = new WebSocket("ws://localhost:4590");

console.log("WebSocket initialised")

ws.onmessage = (event) => {
    console.log("Message received")

    const res = JSON.parse(event.data);
    const elem = document.getElementById(res.target);

    if (res.target.startsWith("img-"))
    {
        if (elem) elem.src = res.value;
    }
    else 
    {
        if(elem) elem.textContent = res.value;
    }
};

ws.onclose = () => setTimeout(() => location.reload(), 2000);
