var Everything = {
    "type":"Everything",
    "content":"",
    "from":"",
    "to":"",
    "language":""
}

var Top_headlines = {
    "type":"Top_headlines",
    "content":"",
    "country":"",
    "category":""
}

var Sources = {
    "type":"Sources",
    "category":"",
    "language":"",
    "country":""
}

var Temp = {
    "type":"temperature",
    "city":"",
    "country":"",
    "thersold":"",
}


var EverythingBtn = document.getElementById("Everything-btn");
var TopHeadBtn = document.getElementById("Top-headlines-btn");
var SourceBtn = document.getElementById("Sources-btn");
var TempBtn = document.getElementById("temp-btn");

var serverMessage = {type: "temperature", value: 29.8};

EverythingBtn.addEventListener("click", ()=> {
    Everything.content = document.getElementById("Everything-content").value;
    Everything.from = document.getElementById("Everything-from").value;
    Everything.to = document.getElementById("Everything-to").value;
    Everything.language = document.getElementById("Everything-lanuage").value;
    sendrequest(Everything);
    console.log(Everything);
})
TopHeadBtn.addEventListener("click", ()=> {
    Top_headlines.content = document.getElementById("Top-headlines-content").value;
    Top_headlines.country = document.getElementById("Top-headlines-country").value;
    Top_headlines.category = document.getElementById("Top-headlines-category").value;
    sendrequest(Top_headlines);
    console.log(Top_headlines);
})

SourceBtn.addEventListener("click", ()=> {
    Sources.category = document.getElementById("Sources-category").value;
    Sources.language = document.getElementById("Sources-lanuage").value;
    Sources.country = document.getElementById("Sources-country").value;
    sendrequest(Sources);
    console.log(Sources);
})

TempBtn.addEventListener("click", ()=> {
    Temp.city = document.getElementById("city-select").value;
    Temp.country = document.getElementById("Country-select").value;
    Temp.thersold = document.getElementById("temp-select").value;
    sendrequest(Temp);
    console.log(Temp);
})

/*receive data from node MCU to webpage*/
var Socket;
function init(){
    Socket = new WebSocket('ws://' + window.location.hostname + ':81/');
    Socket.onmessage = function(event){
        server_message = event.data;
        server_message = server_message.slice(0,-1);
        server_json = JSON.parse(server_message);
        if (server_json.length == 1){
            updateTemp(server_json);
        }
        else{
            showrest(server_json);
        }
        server_message = "";
    }
    
}
/*send data to node MCU*/
function sendrequest(item){
    Socket.send(JSON.stringify(item));
    console.log("sent data");
}


function showrest(){
    serverMessage.forEach(el=> {
        console.log(el);
        document.getElementById('result').innerHTML +=
        `<div class="row newsrow">
            <div class = "col-md-4">
                <img class= "newsimg" src="${el.urlImage}" alt="newstnumnail" >
            </div> 
            
            <div class="news col-md-8">
                <h2>Title: ${el.title}</h2>
                <p>Description: ${el.description}</p>
                <p>Content: ${el.content}</p>
                <h6>Aurther: ${el.author}</h6>
                <h6>Pulblished at: ${el.publishAt}</h6>
                <h7><a href = "${el.url}">Read more...</a><h7>
            </div>
        </div>`;
    });
}
function updateTemp(server_json){
    document.getElementById('temp-out').innerHTML = `<div>${server_json[0].value}<span>&#8451;</span></div>`
    document.getElementById('weather-out').innerHTML = `<div>${server_json[0].description}</div>`
}