

var nameField;
var hold;
var url="https://www.googleapis.com/books/v1/volumes?q=";
var url2;
var url3="&callback=handleResponse";


function getUserName() {
nameField = document.getElementById('nameField').value;
var result = document.getElementById('result');
result.textContent = 'Your searched for: ' +"'"+ nameField+"'";
url2=nameField;
//upto here gets user input

// after this generates URL with user input
var script = document.createElement("script");
//alert('bookAsk');
script.src = url + url2 + url3
document.body.appendChild(script);
// 
}

var subButton = document.getElementById('subButton');   //Adss book name in dispaly
subButton.addEventListener('click', getUserName, false); 




function handleResponse(response) {                   //populates search results
for (var i = 0; i < response.items.length; i++) {
  var item = response.items[i];
  // in production code, item.text should have the HTML entities escaped.
  document.getElementById("content").innerHTML += "<br>" + item.volumeInfo.title;
}
}
