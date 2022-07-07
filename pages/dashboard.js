document.querySelector(".addicon").addEventListener("click", addIconClick);
function addIconClick()
{
    alert("ugur");
    // Find a <table> element with id="myTable":

    $(".table").append($(".tableNewLine").clone());
}

document.querySelector(".btn-submit").addEventListener("click", sendRequest);
function sendRequest()
{

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", 'http://127.0.0.1:34568', true ); // false for synchronous request
    xmlHttp.setRequestHeader("Accept", "application/json");
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.setRequestHeader('Access-Control-Allow-Origin', '*');

    xmlHttp.onreadystatechange = function () {
   if (xmlHttp.readyState === 4) {
      console.log(xmlHttp.status);
      console.log(xmlHttp.responseText);
   }};
    var data = `{
        "Id": 78912,
        "Customer": "Jason Sweet",
        "Quantity": 1,
        "Price": 18.00
      }`;
    xmlHttp.send(JSON.stringify(data) );
    return xmlHttp.responseText;

}