const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {

e.preventDefault();

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

try{

const response = await fetch("http://localhost:5000/api/auth/login", {

method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({ email, password })

});

const data = await response.json();

console.log("RESPONSE:", data);   // 🔥 IMPORTANT

if(response.ok){

localStorage.setItem("token",data.token);
localStorage.setItem("user",JSON.stringify(data.user));

alert("Login successful");
window.location.href="dashboard.html";

}else{

alert(data);   // show actual backend error

}

}catch(error){

console.error("ERROR:", error);
alert("Server error");

}

});