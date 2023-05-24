const buttons = document.querySelectorAll('button'); 
const numberRenderer = document.querySelector('.numberRenderer');

let numberStored = ''; //used to store the last input for calculations. this variable WILL move between being a number and a string.
let operatorStored = ''; //used to store the latest operator

let newInput = false;
/*
boolean check for when there are chain operations going on (12 + 34 + 15).
New input gets turned on and off for each different input.
*/

let didEquals = false; //boolean check for if the last calculation was an equals calculation

/*
One function to calculate all the math
Just make sure the inside text of your html operator buttons
matches with the string values in this function
*/
function operate(a, operator, b) {
    if (operator == '+') {
      return a+b;
    }
    else if (operator == '-') {
      return a-b;
    }
    else if (operator == 'x') {
      return a*b;
    }
    else if (operator == '÷') {
        return a/b;
    } 
    else {
      return null; 
    }
}

/*
This function is meant to clear the screen and set everything back to 0.
It will be called in two situations.
One: user presses all clear button
Two: user commits an error
*/
function clear() {
    numberRenderer.textContent = 0;
    numberStored = '';
    operatorStored = '';
}

/*
Adds an event listener function to every button in the calculator
*/

buttons.forEach(button => {
  button.addEventListener('click', function(){ //adds an event listener for when every button is clicked
    let buttonText = button.textContent;
    if (buttonText >= 0 && buttonText <= 9) { //is the text of the button a numerical digit?
      if (didEquals==true) {
        /*
        Meaning: is this button being pressed
        immediately after an equals operation was done?
        */
        setDisplay(buttonText);
        didEquals = false;
      }
      else {
        if (numberRenderer.textContent.includes('.')){
          if (numberRenderer.textContent.length < 10) {
            addToDisplay(buttonText);
          }   
        }
        else {
          addToDisplay(buttonText);
        }
      /*
      This is one of two times addToDisplay is called within the script
      It's called when a digit button, or the decimal button is pressed.
      Therefore in this program, pressing a digit button or the decimal button is the only way to extend an input.
      */
      }
    }
    else if (buttonText == 'AC') { //checks if it's the allClear button
      clear();
      /*
      One of two times the clear function is called. This is for when the AllClear button is pressed
      */
    }
    else if (buttonText == '=') {
      if (numberStored==false || operatorStored==false) {
        /*
        This is a check to make sure that the user has inputted both an operator and a number
        If the user inputs a number without an operator, an error will alert.
        */
        alert('Error: no number or operation entered. Clearing data');
        clear();
        /*
        The other of the two times the clear function is called. This is for when the user commits an error
        */
      }
      else { // but if there's both a number and an operator
        numberStored = operate(Number(numberStored), operatorStored, Number(numberRenderer.textContent));
        /*
        like the storeCalc operators, will perform a calculation when it's pressed
        */
        setDisplay(numberStored);
        /*
        sets the display to the result of that calculation immediately after doing so.
        */
        operatorStored = '';
        numberStored = '';
        /*resets everything back to original state*/
        didEquals = true;
        /*notifies that the last calculation made was an equals calculation*/
      }
    }
    else if (buttonText == '.'){
      if (!numberRenderer.textContent.includes('.') && didEquals == false) {
        /*
        !numberRenderer.textContent.includes('.') ensures that there can only be one decimal point in any input.
        didEquals==false ensures that you can't insert a decimal point immediately after an equals operation. You can only input digits after an equals operation
        */
        if (numberRenderer.textContent=='0') {
          addToDisplay('0.');
          /*
          numberRenderer.textContent=='0' means that numberStored is empty. '0.' has to be added instead of just '.', because of that
          This statement is for if a digit hasn't already been inputted.
          */
        }
        else {
          addToDisplay(buttonText);
          /*
          This statement is for if a digit is already present.
          */
        }
      }
    }
    else { //at this point, the only remaining buttons should be the four operator buttons
      storeCalc(buttonText);
    }
  });
});

// Function to store our calculation in the variable numberStored
function storeCalc(operator){
  /*
  see how the parameter name is now named operator? Above us, you can see storeCalc's argument as input.
  I guess this is a thing where we'll have to continuosly keep track of argument names.
  By the way, this is the only time storeCalc is called throughout the entire script.
  */
  if(numberStored==false) {
    numberStored = numberRenderer.textContent;
  }
  /*
  when you enter in a number (using the addToDisplay & setDisplay functions), that number will gradually change
  in the numberRenderer. This statement will store that number in the numberStored variable.
  */
  else { //meaning if there was already a number stored
    numberStored = operate(Number(numberStored), operatorStored, Number(numberRenderer.textContent));
    /*
    If there is a number stored in numberStored (meaning an operator button has already been pressed),
    this will perform a calculation between the numberStored and the number on the screen
    and set the numberStored to the result, while leaving room for more operations.
    This allows us to chain operations before hitting the equals sign.
    So we can do 1+2+3, and it will equal 6.
    */
  }
  /*
  Now regardless of which of these prior outcomes happen, these next statements are to make sure
  that the next time we start inputting a number for calculation
  the screen resets
  */
  operatorStored = operator; 
  /*
  since storeCalc is only called when pressing an operator button,
  obviously the operator button's operator value should be stored.
  */
  newInput = true;
  /*
  every time an operator is added to the overall calculation, new input is set to true.
  Like 34 + 22 + 12, the first digits for each of these (3, 2, 1) will be considered new inputs.
  Everything after won't be.
  */
  didEquals = false; // extra confirmation that this was not an equals calculation
}

/*
This function serves as an extra branching path check for what to do before calling the setDisplay function.
*/
function addToDisplay(number){
  /*
  the parameter is called number. In the button.forEach function, the argument passed is the text inside of the button.
  In that function, the only times this is called is when a digit button, or the decimal button, is pressed
  */
  let numberRendererNum = numberRenderer.textContent;

  /*
  the next three if/else if statements are meant to check for new chain inputs, or if the calculator is at it's base state,
  with 0 in the display but no number stored.
  */
  if(newInput==true){
    newInput = false;
    setDisplay(number);
  }
  else if(numberRendererNum=='0'){
    setDisplay(number);
  }
  else if(numberRendererNum=='0.')
  {
    numberRendererNum = numberRendererNum + number;
    setDisplay(numberRendererNum);
  }
  else {
    if (numberRendererNum.includes('e')){
      /*
      This checks if the displayNum (which is already the inside text of numberRender),
      is of scientific notation, due of the 'e'.
      */
      numberRendererNum = Number(numberRendererNum);
    }
    numberRendererNum = numberRendererNum + number;
    /*
    string concatenation
    This is how the number gets extended.
    Note that displayNum = displayNum + number does not automatically update the text content
    displayNum is just a snapshot value of numberRenderer's textContent at the time of addToDisplay being called.
    Ultimately, addToDisplay doesn't actually update the text on the screen itself.
    It just has a bunch of setDisplay function calls within itself.
    */
    setDisplay(numberRendererNum);
  }
}

//this is here in case the displayed number exceeds 9 numbers, at which point it goes to scientific notation
function setDisplay(numberRendererNum){
  numberRendererNum = numberRendererNum.toString();
  /*
  numberRendererNum gets converted to a String version of itself, just incase it hasn't already been converted.
  It needs to be a String to have a length property for the next statement.
  */
  if (numberRendererNum.length > 9) {
    if (!numberRendererNum.includes('.')) {
      //numbers with 10 or more digits will get converted to scientific notation, except decimals
      numberRendererNum = Number.parseFloat(numberRendererNum); //turns the displayNum back to it's original form
      numberRendererNum = numberRendererNum.toExponential(2); //turns displayNum to scientific notation.
      /*
      console.log(Number(2123456789).toExponential(2)); this returns 2.12e+9.
      So every Number value has the .toExponential() method inside of it.
      */
    }
  }
  numberRenderer.textContent = numberRendererNum;
  //the final piece. The statement that actually updates the text on the screen.
}



