const ws = new WebSocket("ws://localhost:4590");

// Startup colouring

document.getElementById("col-team1").style.backgroundColor = "#1e95c4";
document.getElementById("col-team2").style.backgroundColor = "#c56ac5";

// Receiving and handling changes to the overlay

console.log("WebSocket initialised");

ws.onmessage = (event) => {
    console.log("Message received")

    const res = JSON.parse(event.data);
    const elem = document.getElementById(res.target);

    if (!elem) return;

    if (res.target.startsWith("img-"))
    {
        elem.src = res.value;
    }
    else if (res.target.startsWith("col-"))
    {
        elem.style.backgroundColor = res.value;
    }
    else if (res.target.startsWith("ft-"))
    {
        if (res.value == "FT1")
        {
            elem.style.display = "none";
            document.getElementById("score-team1").style.display = "none";
            document.getElementById("score-team2").style.display = "none";
        } 
        else 
        {
            elem.style.display = "block";
            document.getElementById("score-team1").style.display = "flex";
            document.getElementById("score-team2").style.display = "flex";
            elem.textContent = res.value;
        }
    }
    else 
    {
        elem.textContent = res.value;
    }
};

ws.onclose = () => setTimeout(() => location.reload(), 2000);
