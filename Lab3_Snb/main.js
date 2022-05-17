//Create a variable to reference the empty table body on the HTML document.
var prodRows = document.getElementById("tbodyRows") ;

/* Create a variable to store the XMLHTTPRequest object (tool available through browsers and is
   used to send and receive data via HTTP. */
var prodRequest ;

//Variable to store the data from the JSON file
var prodData;
//Variable to store the HTML that will create the table
var prodRowData = "";
//Variable to store the product info for the selected products (those with a Qty > 0)
var selectedProducts = "" ;
// variable to store sort order ("A" or "D")
var sortOrder = "D" ;

// Store the new XMLHTTPRequest object in the variable
prodRequest = new XMLHttpRequest( ) ;

// Open the request object to "GET" data from the server
prodRequest.open("GET", "products.json") ;

//send the request
prodRequest.send( ) ;

//create a function to read through the data from the JSON file and build the table when the XMLHttpRequest object loads
prodRequest.onload = function( )

{
	//Assign the data from the JSON file to a variable by parsing it
	prodData = JSON.parse(prodRequest.responseText) ;

	//call the function to render the table using the data from the JSON file
	renderTable(prodData) ;
}
	

function renderTable(data)
/*This function is being called in the onload event of the XMLHttpRequest object; it will read the data from the JSON file 
that was stored in the prodData variable.*/
    {
        prodRowData=""   
        for (i = 0; i<data.length; i++)
            {
                //Generate the HTML that will be used to create the table and store it in the prodRowData variable
                prodRowData += "<tr><td class='prod'>" + data[i].prodID + "</td><td class='prod'>" + "<img src=" +data[i].prodImg+ ">" + "</td><td class='prod' id='prodName"+i+"'>" 
                                + data[i].prodName + "</td><td class='prod'>" + data[i].prodDesc + "</td><td class='prod'>" + data[i].prodPrice + "</td><td class='prod'>" 
                                + "<input type='number' min ='0' max = '9' id='ProdQty"+i+"' value='0'" + "</td></tr>";
			}

        //insert the rows into the table body by assigning the HTML to it
	    prodRows.innerHTML = prodRowData ;
    }


function confirmQty( )
// This function is being called from the Confirm button under the table
{
    for (i = 0; i<prodData.length; i++)
    {   
        //variable to store the current row number
        var rowNum = i.toString( ) ;
        //variable to store the ID of the product quantity column in the current row
        var columnID = "ProdQty" + rowNum ;
        //variable to store the value from the product quantity column in the current row
	    var iQty = document.getElementById(columnID).value;
        
        if(iQty > 0)
        {
            //get the ID of the product name column in the current row
            columnID = "prodName" + rowNum ;
            //Build the string to display in the dialog box to show the products where the quantity > 0
            selectedProducts += document.getElementById(columnID).innerText + ": Qty " + iQty + "\n";
        }
    }

    //display qty>0 in alert
    //Remember this should be done with a confirm messagebox in your project, not an alert
    if (selectedProducts > "" && selectedProducts != null)
    {
    confirm("You have selected the following products: \n" + selectedProducts)
    }

    /*This example does not write the selected product info to local storage (it only displays it in a alert dialog box), but your 
     project has to do that.  Please see Example 8 for the applicable code.*/
 }   

/* The functions below are being called in the href property of each <a> element nested in the <th> elements of the table in the HTML 
document that's linked to this JavaScript file. */

function sortByID()
{
    if (sortOrder == "A")   //sort in ascending order
    {
        prodData.sort(function(a,b)
        {
            return a.prodID - b.prodID ;
        } ) ;
        sortOrder = "D" ;
    }
    else    //sort in descending order
    {
        prodData.sort(function(a,b)
        {
            return b.prodID - a.prodID ;
        }) ;
        sortOrder = "A" ;
    }
    renderTable(prodData) ;
}

function sortByName()
{
    if (sortOrder == "A")   //sort in ascending order
    {
        prodData.sort(function(a,b)
        {
            if (a.prodName < b.prodName)
            {
                return -1 ;
            }
        } ) ;
        sortOrder = "D" ;
    }
    else    //sort in descending order
    {
        prodData.sort(function(a,b)
        {
            if (a.prodName > b.prodName) 
            {
                return -1  
            }
        } ) ;
        sortOrder = "A" ;
    }
    renderTable(prodData) ;
}

function sortByPrice()
{
   if (sortOrder == "A")   //sort in ascending order
    {
        prodData.sort(function(a,b)
        {
            return a.prodPrice - b.prodPrice ;
        } ) ;
        sortOrder = "D" ;
    }
    else    //sort in descending order
    {
        prodData.sort(function(a,b)
        {
            return b.prodPrice - a.prodPrice ;
        }) ;
        sortOrder = "A" ;
    }
    renderTable(prodData) ;
}

