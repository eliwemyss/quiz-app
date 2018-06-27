let questionNum = 0;
let score = 0;
// function starts quiz on button click
function startQuiz() {
	$('.quizContainer').on('click', '.startButton', function(event) {
		renderQuestion();
		answerFeedback();
		nextQuestion();
	});
}

function renderQuestion() {
	if (questionNum < STORE.length) {
		$(`.questionNum`).text(questionNum + 1);
		$(`.quizContainer`).empty();
		$(`.quizContainer`).html(
			`<div class="question">${STORE[questionNum].question}    </div>
          <form>
            <fieldset>
            ${renderAnswers(STORE[questionNum].answers)}
            <br>
            <button type ='submit' class ='submitAnswerButton'>Submit</button> 
            </fieldset>
          </form>
    `
		);
		// will go to amount correct based on the number of questions in STORE
	} else {
		finalResults();
		restartQuiz();
	}
}
function renderAnswers(answers) {
	let answerHtml = '';
	for (let i = 0; i < answers.length; i++) {
		let currentAnswer = `<label class="possibleAnswer">
      <div class="answer"><input type="radio" value="${answers[
				i
			]}" name="answer" required>
      ${answers[i]}
    </div></label>`;
		answerHtml += currentAnswer;
	}
	return answerHtml;
}

function answerFeedback() {
	$('form').on('submit', function(event) {
		event.preventDefault();
		// this is what answer you choose
		let userAnswer = $('input:checked').val();
		let actualAnswer = STORE[questionNum].correctAnswer;
		// if user input matches answer
		if (userAnswer === actualAnswer) {
			isCorrect();
		} else {
			isIncorrect();
		}
	});
}

function isCorrect() {
	$('.quizContainer').empty();
	$('.quizContainer').html(`
    <h3>THAT'S CORRECT!</h3>
      <div class = "quizPic">
        <img src = "https://media1.tenor.com/images/d32e75105fab9f80b352e71a3ab7a815/tenor.gif?itemid=5917189" alt = "Jim and Pam high five">
      </div>
    <button type='submit' id='nextQuestionButton'>Next Question</button>
  `);
	updateScore();
	scoreCounter();
}

function isIncorrect() {
	$('.quizContainer').empty();
	$('.quizContainer').html(
		`<h3>Sorry, that's incorrect!</h3>
    <h4>The answer is ${STORE[questionNum].correctAnswer}</h4>
      <div class = "quizPic">
        <img src = "https://media.giphy.com/media/12XMGIWtrHBl5e/giphy.gif" alt="Michael Scott saying no">
      </div>
    <button type="submit" id="nextQuestionButton">Next Question</button>`
	);
}

// goes to next question when clicked

function nextQuestion() {
	$('.quizContainer').on('click', '#nextQuestionButton', function(event) {
		questionNum++;
		renderQuestion();
		answerFeedback();
	});
}

// updates the current question number
function changeQuestionNum() {
	questionNum++;
	updateQuestionNum();
}

function updateQuestionNum() {
	$('.questionNum').text(questionNum + 1);
}

// updates score
function updateScore() {
	score++;
}
function scoreCounter() {
	$('.score').text(score);
}

// displays final results
function finalResults() {
	if (score <= 3) {
		$('.quizContainer').html(
			`<p>With a score of ${score}, do you really expect
      Prison Mike to not push you against the wall?</p>
      <div class="quizPic">
        <img src="https://vignette.wikia.nocookie.net/theoffice/images/9/96/Prisonmike.png/revision/latest/scale-to-width-down/350?cb=20100327171549" alt="prison Mike">
      </div>
    <button type="reset" id="restartButton">Try Again?</button>`
		);
	} else if (score > 3 && score <= 6) {
		$('.quizContainer').html(
			`<p>You scored ${score} out of 10</p>
        <div class="quizPic">
          <img src="https://i.pinimg.com/originals/86/cf/b1/86cfb1d52783a5ee307d1e62643c5111.jpg" alt= "Dwight idiot">
        </div>
      <button type="reset" id="restartButton">Try Again?</button>`
		);
	} else {
		$('.quizContainer').html(
			`<p>With a score of ${score}, you're on your way to being the World's best boss!</p>
      <div class="quizPic">
        <img src="https://thoughtcatalog.files.wordpress.com/2015/06/michaelscott_theoffice.jpeg?w=698&h=400" alt="world's best boss">
      <button type= "reset" id="restartButton">Try Again?</button>`
		);
	}
}

function restartQuiz() {
	$('#restartButton').on('click', function(event) {
		location.reload();
	});
}
startQuiz();
