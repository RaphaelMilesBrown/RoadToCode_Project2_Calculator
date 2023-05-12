let currentResult = 0;
function calculate()
{
    return (Number(document.getElementById("firstValueDataField").value) + Number(document.getElementById("secondValueDataField").value))
}
function setResult()
{
    document.getElementById("resultOnScreen").innerHTML = currentResult;
}
function fullCalc(){currentResult = calculate();setResult();}

/**/