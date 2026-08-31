const ws = new WebSocket("ws://localhost:4590");

// Startup colouring

document.getElementById("col-team1").style.backgroundColor = "#1e95c4";
document.getElementById("score-team1").style.backgroundColor = "color-mix(in srgb, #1e95c4, black 25%)";

document.getElementById("col-team2").style.backgroundColor = "#c56ac5";
document.getElementById("score-team2").style.backgroundColor = "color-mix(in srgb, #c56ac5, black 25%)";

// Receiving and handling changes to the overlay

console.log("WebSocket initialised");

ws.onmessage = (event) => {
    console.log("Message received")

    const res = JSON.parse(event.data);
    const elem = document.getElementById(res.target);

    if (res.target == "overlayMargin")
    {
        document.body.style.marginTop = `${res.value}px`;
        return;
    }

    if (res.target.startsWith("col-name"))
    {
        if (res.target == "col-name1") 
        {
            document.getElementById("name-team1").style.color = res.value;
            document.getElementById("score-team1").style.color = res.value;
        }
        else if (res.target == "col-name2") 
        {
            document.getElementById("name-team2").style.color = res.value;
            document.getElementById("score-team2").style.color = res.value;
        }
        return;
    }

    if (!elem) return;

    if (res.target.startsWith("img-ban-"))
    {
        if (res.value == "clear")
        {
            elem.parentElement.style.display = "none";
        }
        else 
        {
            elem.src = res.value;
            elem.parentElement.style.display = "block";
        }
    }
    else if (res.target.startsWith("img-"))
    {
        if (res.value == "clear")
        {
            elem.style.display = "none";
        }
        else 
        {
            elem.src = res.value;
            elem.style.display = "block";
        }
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
        } 
        else 
        {
            elem.style.display = "block";
            elem.textContent = res.value;
        }
    }
    else 
    {
        elem.textContent = res.value;
    }
};

ws.onclose = () => setTimeout(() => location.reload(), 2000);
