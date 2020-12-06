// Wait for page to load
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#button-addon2').onclick = () => {
      let x = document.getElementById("n");
      let option = document.createElement("option");
      option.text = document.querySelector("#addFriend").value;
      x.add(option);
    }
   count = 0;
    // Select the submit button and input to be used later
    document.querySelector('#task').onsubmit = () => {
  
  validationCheck();
      
  return false;
    }
     
  });
  function Person(count, T0, T1, T2, T3, T4) {
    var persons = {};
    persons[count] = {id: count, Name: T0, Type: T1, Item: T2, Date: T3, Amount: T4};
    localStorage[count] = JSON.stringify(persons);
    console.log(localStorage.getItem(count));
    
    }
  
  // Funtion to add row in table
    function addRow(tableID) {
    // Get a reference to the table
    
    
    let tableRef = document.getElementById(tableID);
  
    // Insert a row in the table at row index 0
    let newRow   = tableRef.insertRow();
    
    // Insert a cell in the row at index 0
    
    let newCell0  = newRow.insertCell(0);
    let newCell1  = newRow.insertCell(1);
    let newCell2  = newRow.insertCell(2);
    let newCell3  = newRow.insertCell(3);
    let newCell4  = newRow.insertCell(4);
    
    let newCell5  = newRow.insertCell(5);
    newCell5.innerHTML = `<a id="btn" name="btn" type = "button" class = "btn btn-secondary" onclick= "deleteRow(this)" > Delete </a>`;
    
    // Append a text node to the cell
    
    let newText0  = document.createTextNode(document.querySelector('#n').value);
    newCell0.appendChild(newText0);
    let newText1  = document.createTextNode(document.querySelector('#t').value);
    newCell1.appendChild(newText1);
    let newText2  = document.createTextNode(document.querySelector('#i').value);
    newCell2.appendChild(newText2);
    let newText3  = document.createTextNode(document.querySelector('#d').value);
    newCell3.appendChild(newText3);
    
    currencyExchange(newCell4);
  }
  // Function to change any curruncey to USD  
  function currencyExchange(newCell4) {
    
  
    newCell4 = newCell4;
    let from = document.querySelector('#c').value;
    let to = document.querySelector('#exc').value;
    
    
    
    // Send a GET request to the URL
    fetch('https://api.exchangeratesapi.io/latest?'+'base=' + from)
    // Put response into json form
    
    .then(response => response.json())
    
    .then(data => {
        // Get currency from user input and convert to upper case
        // Get rate from data
        // Check if currency is valid:
        result = data.rates[to]
        console.log(result)
        
        
        
        let newText4  = document.createTextNode((document.querySelector('#a').value)*(result));
        newCell4.appendChild(newText4);
          });
        }
      function deleteRow(r) {
    let i = r.parentNode.parentNode.rowIndex;
    
    document.getElementById('tasks').deleteRow(i);
  }
  
  function validationCheck()
  
  {
    var T0  = document.querySelector('#n').value;
    var T1  = document.querySelector('#t').value;
    var T2  = document.querySelector('#i').value;
    var T3  = document.querySelector('#d').value;
    var T4  = document.querySelector('#a').value;
    let T5  = document.querySelector('#c').value;
    let T6  = document.querySelector('#exc').value;
    if (T0 == 0 || T1 == 0 || T2 == 0 || T3 == 0 || T4 == 0 || T5 == 0 || T6 == 0 )
  
  {
    alert ("All fields are mandatory!")
  }
     else
     
  {
    
  
  
  addRow('tasks');
  count = count+1;
  Person(count, T0,T1,T2,T3,T4);
  
  }
  }
  function filterByName() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("tasks");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }
  