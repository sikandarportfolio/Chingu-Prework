

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
script.src = url + url2 + url3
document.body.appendChild(script);

}

var subButton = document.getElementById('subButton');   //Adss book name in dispaly
subButton.addEventListener('click', getUserName, false); 




function handleResponse(response) {                   //populates search results
for (var i = 0; i < response.items.length; i++) {
  var item = response.items[i];
  // in production code, item.text should have the HTML entities escaped.
  document.getElementById("picId").src=item.volumeInfo.imageLinks.thumbnail;
  document.getElementById("content").innerHTML += "<br>" + item.volumeInfo.title;
  document.getElementById("content").innerHTML += "<br>" +"Written by: "+ item.volumeInfo.authors;
  document.getElementById("content").innerHTML += "<br>" +"Published by: "+ item.volumeInfo.publisher+                                                                         
                                                "<p>--------------------------------------------------</p>";
 


}
}
//Each item in the list should include the book's author, title, and publishing company, as well as a picture of the book.