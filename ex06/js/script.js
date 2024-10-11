const form = document.getElementById('letterForm');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const word = document.getElementById('wordInput').value;
    resultDiv.innerHTML = '';

    // Separar a palavra e exibir cada letra
    word.split('').forEach(letter => {
        const letterSpan = document.createElement('span');
        letterSpan.textContent = letter;
        letterSpan.classList.add('letter');
        resultDiv.appendChild(letterSpan);
    });
});