const btnAdc = document.getElementById("btnAdc");
const inputNum = document.getElementById("inputNum");
const inputSom = document.getElementById("inputSom");

let sum = 0;

btnAdc.onclick = () => {
    
    let num = parseInt(inputNum.value);

    if (isNaN(num)) {
        alert("Digite um número inteiro!");
        return;
    }

    sum += num;
    inputSom.value = sum;
    inputNum.value = "";
    inputNum.focus()
}