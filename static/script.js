if (!localStorage.getItem('counter'))
localStorage.setItem('counter', 0);
document.addEventListener('DOMContentLoaded', function() {
 
  var len =   localStorage.getItem('counter');

  

  console.log(len);
  if (len>0)
  
  for(i=0 ; i <= len ; i ++)
  {
      
      
  key =   localStorage.key(i);
  
  console.log(key)
  
  val2 = JSON.parse(localStorage.getItem(key, 'value'));
  {
  if (key !== NaN && key !== null && key !== "counter" && val2!=null )
  buildTable('tasks',val2,key)
  }
}


  


document.querySelector('#button-addon2').onclick = () => {
      let x = document.getElementById("n");
      let option = document.createElement("option");
      option.text = document.querySelector("#addFriend").value;
      x.add(option);
    }
   
    // Select the submit button and input to be used later
    document.querySelector('#task').onsubmit = () => {
  
     validationCheck() ;
     
     return false;
     
     

    }
    
    

});
  
 

  function Person(T0, T1, T2, T3, T4, T5, T6) {
    let from = T5
    let to = T6
    
    
    
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
        
        
        
        let curr  = (T4*(result));
        var persons = {};
        
       let counter=  localStorage.getItem('counter');
       counter++;
        persons[counter] = {id: counter, Name: T0, Type: T1, Item: T2, Date: T3, Amount: curr};
        localStorage[counter] = JSON.stringify(persons);
       
      
        localStorage.setItem('counter', counter);

                      // Update counter
                      
                      
      location.reload();
        
        
        
       }
    )};
    



  
  
  

    
  // Funtion to add row in table
    
    // Get a reference to the table
    
    
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
      newCell5.innerHTML = `<a id="btn" name="btn" type = "button" class = "btn btn-secondary" onclick= "deleteRow(${value2[key].id})" > Delete </a>`;
      
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
      function deleteRow(a) {

      var len = localStorage.length;
        
        if (len>=0)    
        window.localStorage.removeItem(a);
        let counter=  localStorage.getItem('counter');
        counter--;
        localStorage.setItem('counter', counter);
        location.reload();
        
        
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
    return false;
    }
    
    else {
  
      
      
      Person( T0,T1,T2,T3,T4,T5,T6); 
     
   
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
  function buildTable(tableId,val2,key) {
  let tableRef = document.getElementById(tableId);
  value2 = val2;
  let newRow   = tableRef.insertRow();
    let newCell0  = newRow.insertCell(0);
    newCell0.innerHTML = value2[key].Name;
    let newCell1  = newRow.insertCell(1);
    newCell1.innerHTML = value2[key].Type;
    let newCell2  = newRow.insertCell(2);
    newCell2.innerHTML = value2[key].Item;
    let newCell3  = newRow.insertCell(3);
    newCell3.innerHTML = value2[key].Date;
    let newCell4  = newRow.insertCell(4);
    newCell4.innerHTML = value2[key].Amount;
    
    let newCell5  = newRow.insertCell(5);
    newCell5.innerHTML = `<a id="btn" name="btn"  type = "button" class = "btn btn-secondary" onclick= "deleteRow(${value2[key].id})" > Delete </a>`;
    
    // Append a text node to the cell
    }
  
  
