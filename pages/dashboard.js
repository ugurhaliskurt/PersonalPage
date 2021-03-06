document.querySelector(".addicon").addEventListener("click", addIconClick);
function addIconClick()
{
    // Find a <table> element with id="myTable":

    $(".table").append($("#tableNewLine").clone());
}

document.querySelector(".btn-submit").addEventListener("click", sendRequest);
function sendRequest()
{

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == XMLHttpRequest.DONE) {
            jsonArray = JSON.parse(xmlHttp.responseText);
            var dates = [];
            var values = [];
            var payments = [];
            for(var k in jsonArray) {
                dates.push(jsonArray[k]["Date"]);
                values.push(jsonArray[k]["Value"]);
                payments.push(jsonArray[k]["Paid"]);
            }
            drawChart(dates, values, payments);
            console.log(payments);
        }
    }
    xmlHttp.open( "POST", 'http://127.0.0.1:34568', true ); // false for synchronous request
    xmlHttp.setRequestHeader("Accept", "application/json");
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.setRequestHeader('Access-Control-Allow-Origin', '*');

    var numberOfelement = document.querySelectorAll(".stockInput").length;
    var data = [];
    var obj;
    for (let index = 0; index < numberOfelement; index++) {
        const element = document.querySelectorAll(".stockInput")[0].value;
        if( index % 3 === 0 )
        {
            obj = new Object();
            obj.Name = document.querySelectorAll(".stockInput")[index].value.toUpperCase();
        }
        else if( index % 3 === 1 )
        {
            obj.Money = document.querySelectorAll(".stockInput")[index].value;
        }
        else
        {
            obj.Date = document.querySelectorAll(".stockInput")[index].value;
            data.push(obj);
        }
    }
    console.log(JSON.stringify(data));
    xmlHttp.send(JSON.stringify(data) );
    return xmlHttp.responseText;
}

var myChart
function drawChart( Dates, Values, Paymets )
{
    if (myChart !== undefined)
        myChart.destroy();
    var ctx = document.getElementById("myChart");
    myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Dates,
        datasets: [{
          data: Values,
          lineTension: 0,
          backgroundColor: 'transparent',
          borderColor: "green",
          borderWidth: 4,
          pointBackgroundColor: '#007bff'
        },
        {
          data: Paymets,
          lineTension: 0,
          backgroundColor: 'transparent',
          borderColor: "red",
          borderWidth: 4,
          pointBackgroundColor: '#007bff'
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false
            }
          }]
        },
        legend: {
          display: false,
        }
      }
    });
}