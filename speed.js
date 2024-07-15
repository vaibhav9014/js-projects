const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random';
const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');

let startTime;
let timerInterval;

quoteInputElement.addEventListener('input', () => {
    const arrayQuote = quoteDisplayElement.querySelectorAll('span');
    const arrayValue = quoteInputElement.value.split('');

    let correct = true;
    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index];
        if (character == null) {
            characterSpan.classList.remove('correct', 'incorrect');
            correct = false;
        } else if (character === characterSpan.innerText) {
            characterSpan.classList.remove('incorrect');
            characterSpan.classList.add('correct');
        } else {
            characterSpan.classList.remove('correct');
            characterSpan.classList.add('incorrect');
            correct = false;
        }
    });

    if (correct) endGame();
});

function endGame() {
    clearInterval(timerInterval);
    const elapsedTime = getTimerTime();
    const wordsTyped = quoteInputElement.value.trim().split(/\s+/).length;
    const wpm = Math.round((wordsTyped / elapsedTime) * 60);
    
    scoreElement.textContent = `${wpm} WPM`;
    scoreElement.style.display = 'block';
    
    setTimeout(() => {
        scoreElement.style.display = 'none';
        renderNewQuote();
    }, 3000);
}

async function renderNewQuote() {
    const quote = await getRandomQuote();
    quoteDisplayElement.innerHTML = '';
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span');
        characterSpan.innerText = character;
        quoteDisplayElement.appendChild(characterSpan);
    });
    quoteInputElement.value = '';
    startTimer();
}

async function getRandomQuote() {
    const response = await fetch(RANDOM_QUOTE_API_URL);
    const data = await response.json();
    return data.content;
}

function startTimer() {
    timerElement.innerText = '0';
    startTime = new Date();
    timerInterval = setInterval(() => {
        timerElement.innerText = getTimerTime();
    }, 1000);
}

function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000);
}

renderNewQuote();