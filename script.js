async function odesliZPravu() {
  let z = document.getElementById("zprava").value;
  document.getElementById("zprava").value = "";
  document.getElementById("zprava").focus();

  let url = "https://nodejs-3260.rostiapp.cz/chat/addMsg";
  let body = {};
  body.token = token;
  body.chat = "id45cfc16edb31cce90a6ad113b688cc";
  body.msg = z;
  let odpoved = await fetch(url, {method:"POST", body:JSON.stringify(body)});
  let data = await odpoved.json();  
}

async function obnovZpravy() {
  let url = "https://nodejs-3260.rostiapp.cz/chat/listMsgs";
  let body = {};
  body.token = token;
  body.chat = "id45cfc16edb31cce90a6ad113b688cc";
  let odpoved = await fetch(url, {method:"POST", body:JSON.stringify(body)});
  let data = await odpoved.json();  

  let s = "";
  for (let zprava of data) {
    s = zprava.time + " " + zprava.user + "<br>" + zprava.msg + "<br>" + s;
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

function ukazRegistraci() {
  document.getElementById("oblast_registrace").style.display = "block";
  document.getElementById("oblast_prihlaseni").style.display = "none";
  document.getElementById("oblast_chat").style.display = "none";
}

function ukazChat() {
  document.getElementById("oblast_registrace").style.display = "none";
  document.getElementById("oblast_prihlaseni").style.display = "none";
  document.getElementById("oblast_chat").style.display = "block";
 
  casovac = setInterval(obnovZpravy, 1000);
}

async function registruj() {
  let fn = document.getElementById("fullname").value;
  let un = document.getElementById("username").value;
  let pw = document.getElementById("password").value;
  let em = document.getElementById("email").value;

  let url = "https://nodejs-3260.rostiapp.cz/users/registry";
  let body = {};
  body.fullname = fn;
  body.username = un;
  body.password = pw;
  body.email = em;
  let odpoved = await fetch(url, {method:"POST", body:JSON.stringify(body)});
  let data = await odpoved.json();
  if (data.status == "OK") {
    ukazPrihlaseni();
  } else {
    alert(data.error);
  }
}

let token;
let casovac;

async function prihlas() {
  let un = document.getElementById("loginusername").value;
  let pw = document.getElementById("loginpassword").value;

  let url = "https://nodejs-3260.rostiapp.cz/users/login";
  let body = {};
  body.username = un;
  body.password = pw;
  let odpoved = await fetch(url, {method:"POST", body:JSON.stringify(body)});
  let data = await odpoved.json();
  
  if (data.status == "OK") {
    token = data.token;
    ukazChat();
  } else {
    alert(data.error);
  }
}

async function odhlas() {
  if (!confirm("Fakt odhlasit?!")) return; //pri stornu vyskoci z funkce

  let url = "https://nodejs-3260.rostiapp.cz/users/logout";
  let body = {};
  body.token = token;
  let odpoved = await fetch(url, {method:"POST", body:JSON.stringify(body)});
  let data = await odpoved.json();
  
  if (data.status == "OK") {
    clearInterval(casovac); //vypnuti obnovovani seznamu zprav
    token = undefined;
    ukazPrihlaseni();
  } else {
    alert(data.error);
  }
}


function poNacteni() {
  document.getElementById("zprava").addEventListener("keydown", stiskKlavesyDolu);

  ukazPrihlaseni();
}