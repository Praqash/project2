document.addEventListener('DOMContentLoaded', function() {
  
  
  
  var len =   localStorage.getItem('key');

  
  if (len>0)
  {
  for(i=0 ; i <= len ; i ++)
  {
      
      
  key =   localStorage.key(i);
  
  
  
  val2 = JSON.parse(localStorage.getItem(key, 'value'));
  
  if (key !== NaN && key !== null && key !== "key" && key !== "key" && val2!=null )
  {
  let tableRef = document.getElementById('tasks');
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
    newCell5.innerHTML = `<a id="btn" name="btn"  type = "button" class = "btn btn-light" onclick= "deleterow(${value2[key].id}); deleteRow(this);" > Delete </a>`;
  }
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


 

function deleteRow(r) {
  let i = r.parentNode.parentNode.rowIndex;
  document.getElementById('tasks').deleteRow(i);
}
  function Person(T0, T1, T2, T3, T4, T5, T6) {
    let from = T5
    let to = T6
    let API_KEY = '851dee04d56ce7ed56ccf2085173ac12'
    
    
    // Send a GET request to the URL
    fetch('http://api.exchangeratesapi.io/v1/latest?access_key=e05e7df08da4732294a330b86838edb0&format=1')
    
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
        
       let key=  localStorage.getItem('key');
       
       val2 = JSON.parse(localStorage.getItem(key, 'value'));
       key = Math.ceil(Math.random()*100000);
       persons[key] = {id: key, Name: T0, Type: T1, Item: T2, Date: T3, Amount: curr};
        
        
        
        localStorage[key] = JSON.stringify(persons);
        localStorage.setItem('key', key);
        
   
        


        let tableRef = document.getElementById('tasks');

        // Insert a row in the table at row index 0
        let newRow   = tableRef.insertRow();
        
        // Insert a cell in the row at index 0
        
        let newCell0  = newRow.insertCell(0);
        let newCell1  = newRow.insertCell(1);
        let newCell2  = newRow.insertCell(2);
        let newCell3  = newRow.insertCell(3);
        let newCell4  = newRow.insertCell(4);
        
        
        
        // Append a text node to the cell
        
        let newText0  = document.createTextNode(document.querySelector('#n').value);
        newCell0.appendChild(newText0);
        let newText1  = document.createTextNode(document.querySelector('#t').value);
        newCell1.appendChild(newText1);
        let newText2  = document.createTextNode(document.querySelector('#i').value);
        newCell2.appendChild(newText2);
        let newText3  = document.createTextNode(document.querySelector('#d').value);
        newCell3.appendChild(newText3);
        let newText4  = document.createTextNode(curr);
        newCell4.appendChild(newText4);
        let newCell5  = newRow.insertCell(5);
        newCell5.innerHTML = `<a id="btn" name="btn" type = "button" class = "btn btn-light" onclick= "deleteRow(this) ; deleterow(${key})"; > Delete </a>`;
        localStorage.setItem('key', key);


        
        
        // Append a text node to the cell
        
       

});
  }
  

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
      function deleterow(key) {
       
         
        window.localStorage.removeItem(key);
        
        key=  localStorage.getItem('key');
        key--;
        localStorage.setItem('key', key);
       
      
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
    
    else 
    
    {
  
      
      
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
  
  
  
