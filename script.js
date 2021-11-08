async function odesliZPravu() {
  let p = document.getElementById("prezdivka").value;
  let z = document.getElementById("zprava").value;
  document.getElementById("zprava").value = "";
  document.getElementById("zprava").focus();

  let url = "https://nodejs-3260.rostiapp.cz/chat2x/addMsg";
  let body = {};
  body.chat = "test";
  body.nick = p;
  body.msg = z;
  let odpoved = await fetch(url, {method:"POST", body:JSON.stringify(body)});
  let data = await odpoved.json();  
}

async function obnovZpravy() {
  let url = "https://nodejs-3260.rostiapp.cz/chat2x/listMsgs";
  let body = {};
  body.chat = "test";
  let odpoved = await fetch(url, {method:"POST", body:JSON.stringify(body)});
  let data = await odpoved.json();  

  let s = "";
  for (let zprava of data) {
    s = zprava.time + " " + zprava.nick + "<br>" + zprava.msg + "<br>" + s;
  }
  document.getElementById("seznamZprav").innerHTML = s;
}

function stiskKlavesyDolu(event) {
  //console.log(event.key);
  if (event.key == "Enter") {
    odesliZPravu();
  }
}

function ukazPrihlaseni() {
  document.getElementById("oblast_registrace").style.display = "none";
  document.getElementById("oblast_prihlaseni").style.display = "block";
  document.getElementById("oblast_chat").style.display = "none";
}


function poNacteni() {
  document.getElementById("zprava").addEventListener("keydown", stiskKlavesyDolu);

  //setInterval(obnovZpravy, 1000);
  ukazPrihlaseni();
}