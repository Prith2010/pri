const questionElement = document.getElementById('question');
const answerInput = document.getElementById('answer');
const submitButton = document.getElementById('submit');
const resultElement = document.getElementById('result');
const scoreElement = document.getElementById('score-value');
const timerElement = document.getElementById('timer-value');
const restartButton = document.getElementById('restart'); // Add this line

let timeLeft = 10;
let timer;

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateProblem() {
  const num1 = getRandomNumber(1, 10);
  const num2 = getRandomNumber(1, 10);
  const operator = ['+', '-', '*', '/'][getRandomNumber(0, 3)];

  const problem = `${num1} ${operator} ${num2}`;
  const answer = eval(problem).toFixed(2);

  return { problem, answer };
}

let currentProblem = generateProblem();
let score = 0;

function updateQuestion() {
  currentProblem = generateProblem();
  questionElement.textContent = currentProblem.problem;
  answerInput.value = '';
}

function checkAnswer() {
  const userAnswer = parseFloat(answerInput.value);
  const correctAnswer = parseFloat(currentProblem.answer);

  if (!isNaN(userAnswer)) {
    if (userAnswer === correctAnswer) {
      score += 5;
      resultElement.textContent = 'Correct!';
    } else {
      resultElement.textContent = `Wrong! Correct answer was: ${correctAnswer}`;
    }

    scoreElement.textContent = score;
    updateQuestion();
    timeLeft = 10;
  }
}

function updateTime() {
  timeLeft--;
  timerElement.textContent = timeLeft;

  if (timeLeft <= 0) {
    clearInterval(timer);
    resultElement.textContent = `Time's up! Your score: ${score}`;
    submitButton.disabled = true;

    updateQuestion();
    timeLeft = 10;
  }
}

function resetGame() {
  score = 0;
  scoreElement.textContent = score;
  resultElement.textContent = '';
  submitButton.disabled = false;
  startGame();
}

submitButton.addEventListener('click', checkAnswer);

answerInput.addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    checkAnswer();
  }
});

restartButton.addEventListener('click', resetGame); // Add this line

function startGame() {
  updateQuestion();
  submitButton.disabled = false;
  answerInput.focus();

  timer = setInterval(updateTime, 1000);
}

startGame();





