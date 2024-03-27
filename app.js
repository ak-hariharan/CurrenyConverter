let select = document.querySelectorAll('.currency') // selecting the currency class by querySelectorAll and assings it to select
// normally querySelectorAll will return a nodelist so inside the nodelist there are two elements [select.curreny, select.currency]
let btn = document.getElementById('btn')            // selecting the button by getElementById with their id "btn"
let input = document.getElementById('input')        // selecting the input box by getElementById with their id "input"

// We fetch the api using the given for currency converter 
// and convert into a JSON (key:value pair) 
// and pass the JSON value to a function called displayDropDown()

fetch('https://api.frankfurter.app/currencies')
.then(res=>res.json())
.then(res=>displayDropDown(res))

// we have the parameter res in the displayDropDown function which has been passed from the above line
function displayDropDown(res){
  // Here Object.entries() a static method returns the an array which totally made of [key:value] pair
  // it assings to the curr
  let curr = Object.entries(res)
  // using a loop we traverse the elements of the curr
  for(let i=0;i<curr.length;i++){
    // we assings the curr[i]th value of [0]th value to the opt everytime using for loop 
    // Ex: ' AUD ' is first element of 'i'th value of 0th value and its retrieve from this syntax "${} - template literals"
    let opt = `<option value="${curr[i][0]}">${curr[i][0]}</option>`
    // and opt is assings to the select array 0th index and 1st index using innerHTML property 
    // the innerHTML gives the opt value present option tag ${curr[i][0]} which is equal to the value like 'AUD'
    select[0].innerHTML += opt
    select[1].innerHTML += opt
  }
}

// Here we use arrow function ()=>
// addEventListener is used here. Because whenever the user clicks it the function will call ()=>
btn.addEventListener('click',()=>{
  // assinging the select first index value to curr1
  let curr1 = select[0].value
  // assinging the select second index value to curr2
  let curr2 = select[1].value
  // getting the input value from the user and assings it to the inputVal
  let inputVal = input.value
  // here cross verfication happens to avoid the same currency has been selected
  if(curr1===curr2)
    alert("Choose different currencies")
  else
    // the three values curr1,curr2,inputVal will call the function convert
    convert(curr1,curr2,inputVal)
});


// here converts receives the values curr1,curr2,inputVal
function convert(curr1,curr2,inputVal){
  // assinging the domain value to the host constant 
  const host = 'api.frankfurter.app';
  // fetching the api happens " amount=${inputVal} input value from the user" 
  // ${curr1} changing the currency1 to currency2 ${curr2}
  fetch(`https://${host}/latest?amount=${inputVal}&from=${curr1}&to=${curr2}`)
  // here the response is changes to the JSON format 
  .then(resp => resp.json())
  .then((data) => {
    // result id is get by getElementById and their value is assings from Object.values(data.rates)[0]
    // initially we got the all value from data and their ratesand their time etc (Check with console.log(data.rates))
    // so we change into a simplest form array using Object.values and gets the data.rates we will get like [54.8785]
    // its in the array so we put (data.rates)[0] to access the value
    document.getElementById('result').value = Object.values(data.rates)[0]
  });

}
