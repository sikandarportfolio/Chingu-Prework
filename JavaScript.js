
//Make the url here 
var url="https://www.googleapis.com/books/v1/volumes?q=jon+snow&callback=handleResponse";
var url2="";
var url3="";
var script = document.createElement("script");
script.src = url
document.body.appendChild(script);
//Make the url here

var nameField;
function getUserName() {
nameField = document.getElementById('nameField').value;
var result = document.getElementById('result');

if (nameField.length < 3) {
result.textContent = 'Book name must contain at least 3 characters';
//alert('Username must contain at least 3 characters');
} else {
result.textContent = 'Your Book name is: ' + nameField;
//alert(nameField);
}
}

var subButton = document.getElementById('subButton');   //Adss book name in dispaly
subButton.addEventListener('click', getUserName, false); 



function handleResponse(response) {
for (var i = 0; i < response.items.length; i++) {
  var item = response.items[i];
  // in production code, item.text should have the HTML entities escaped.
  document.getElementById("content").innerHTML += "<br>" + item.volumeInfo.title;
}
}



