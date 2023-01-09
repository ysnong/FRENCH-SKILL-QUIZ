const QUESTIONS_NUM = 6

const question = document.getElementById('question-text');
const choices = Array.from(document.querySelectorAll('.choice-text'))
const progressText = document.getElementById('question-num')
const scoreText = document.getElementById('score')
const progressBarFull = document.getElementById('progressBarFull')

let goodAnswer = 0
let questionCounter = 0
let questions = []
let currentQuestion = {}
let availableQuestions = []
let QuestionsLeft = []
var mySound;

if (document.title == "Beginner Level Quiz"){
	console.log("hello")
	questions = [
		{   question: 'How do you say \"hello\"?',
			answers: [
				{ans: 'Hola', correct: false},
				{ans: 'Bonjour', correct: true},
				{ans: 'Au revoir', correct: false},
				{ans: 'Merci', correct: false},
			]
		},
		{   question: 'How do you say \"thank you\"?',
			answers: [
				{ans: 'Hola', correct: false},
				{ans: 'Bonjour', correct: false},
				{ans: 'De rien', correct: false},
				{ans: 'Merci', correct: true},
			]
		},
		{   question: 'How do you say \"good morning\"?',
			answers: [
				{ans: 'Bon nuit', correct: false},
				{ans: 'Bon matin', correct: true},
				{ans: 'Bonne nuit', correct: false},
				{ans: 'Bonne matin', correct: false},
			]
		},
		{   question: 'How do you say 14?',
			answers: [
				{ans: 'Quarante', correct: false},
				{ans: 'Quatre', correct: false},
				{ans: 'Quadrante', correct: false},
				{ans: 'Quatorze', correct: true},
			]
		},
		{   question: 'How do you say \"I have two brothers\"?',
			answers: [
				{ans: 'Je suis deux frères.', correct: false},
				{ans: 'J\'ai deu frères.', correct: false},
				{ans: 'J\'ai deux frères.', correct: true},
				{ans: 'Je suis deu frères', correct: false},
			]
		},
		{   question: 'Which set of words contains only fruits?',
			answers: [
				{ans: 'pomme, banane, bleuet, fraise', correct: true},
				{ans: 'bleuet, banane, poire, berri', correct: false},
				{ans: 'poire, aubergine, orange, raisin', correct: false},
				{ans: 'pomme, orange, raisin, poisson', correct: false},
			]
		}
	]
}
else if (document.title == "Intermediate Level Quiz"){
	questions = [
		{   question: 'Complete the sentence: Nous ________ finir nos devoirs.',
			answers: [
				{ans: 'dansons', correct: false},
				{ans: 'sommes', correct: false},
				{ans: 'devons', correct: true},
				{ans: 'parlons', correct: false},
			]
		},
		{   question: 'Which sentence has NO error',
			answers: [
				{ans: 'Je vais au Canada en avion.', correct: true},
				{ans: 'Je vais en Canada en avion.', correct: false},
				{ans: 'Je vais au Canada à l\'avion', correct: false},
				{ans: 'Je vais en Canada à l\'avion', correct: false},
			]
		},
		{   question: 'To describe a girl, which set of adjectives can be used',
			answers: [
				{ans: 'GRANDE, GENTIL, BELLE, CARRÉE', correct: false},
				{ans: 'BEAU, GENTILLE, BAVARD, CURIEUSE', correct: false},
				{ans: 'CURIEUSE, BELLE, GRANDE, GÉNÉREUSE ', correct: true},
				{ans: 'GÉNEREUX, BAVARDE, PETITE, LONGUE ', correct: false},
			]
		},
		{   question: 'How do you say \"I WAKE UP AT 7:00AM"?',
			answers: [
				{ans: 'Je me lève à 7h du matin.', correct: false},
				{ans: 'Je lève à 7h du matin.', correct: false},
				{ans: 'Je me réveille à 7h du matin.', correct: true},
				{ans: 'Je réveille à 7h du matin.', correct: false},
			]
		},
		{   question: 'How do you say \"MY MOM WENT TO NEWYORK\"?',
			answers: [
				{ans: 'Ma mère est allé à New York.', correct: false},
				{ans: 'Ma mère a allé à New York.', correct: false},
				{ans: 'Ma mère est allée à New York.', correct: true},
				{ans: 'Ma mère a allée à New York', correct: false},
			]
		},
		{   question: 'Which set of words contains only feminin words?',
			answers: [
				{ans: 'robe, fille, arbre, maison', correct: false},
				{ans: 'fille, garçon, arbre, livre', correct: false},
				{ans: 'pomme, école, femme, livre', correct: false},
				{ans: 'école, maison, femme, pomme', correct: true},
			]
		}
	]
}
else if (document.title == "Advanced Level Quiz"){
	questions = [
		{   question: 'Complete the sentence: Nous ________ descendre dans 15 minutes. ',
			answers: [
				{ans: 'venons de', correct: false},
				{ans: 'allons', correct: true},
				{ans: 'sommes allés', correct: false},
				{ans: 'sommes venus', correct: false},
			]
		},
		{   question: 'Which sentence is the most polite form to order a cup of coffee',
			answers: [
				{ans: 'Je voudrais avoir un grand café.', correct: false},
				{ans: 'Je vais prendre un grand café S.V.P', correct: false},
				{ans: 'Je voudrais prendre un grand café S.V.P.', correct: true},
				{ans: 'Je veux avoir un grand café S.V.P', correct: false},
			]
		},
		{   question: 'How do you say \"MERRY CHRISTMAS\"?',
			answers: [
				{ans: 'Bon Noël', correct: false},
				{ans: 'Joyeux Noël', correct: true},
				{ans: 'Joyeuse Noël', correct: false},
				{ans: 'Bonne Noël', correct: false},
			]
		},
		{   question: 'Which question is correctly formed?',
			answers: [
				{ans: 'Est-ce que il mange du chocolat chaque jour?', correct: false},
				{ans: 'Mange-il du chocolat chaque jour?', correct: false},
				{ans: 'Est-ce que mange-t-il du chocolat chaque jour?', correct: false},
				{ans: 'Mange-t-il du chocolat chaque jour?', correct: true},
			]
		},
		{   question: 'What is a good way to answer the question \"Es-tu déjà allé en France?\"?',
			answers: [
				{ans: 'Oui, j\'ai déjà allé en France.', correct: false},
				{ans: 'Non, je ne suis jamais allé en France.', correct: true},
				{ans: 'Oui, je suis allé déjà en Frence', correct: false},
				{ans: 'Non, je n\'ai allé jamais en France.', correct: false},
			]
		},
		{   question: 'Which sentence is correctly conjugated to conditionnel présent?',
			answers: [
				{ans: 'Nous voudrions voyager et ils faireraient le tour du monde.', correct: false},
				{ans: 'Nous voulions voyager et ils feraient le tour du monde.', correct: false},
				{ans: 'Nous voulions voyager et ils faireraient le tour du monde.', correct: false},
				{ans: 'Nous voudrions voyager et ils feraient le tour du monde.', correct: true},
			]
		}
	]
}

function startGame(){
	questionCounter = 0
	goodAnswer = 0
	QuestionsLeft = [...questions]
	wrong = new sound("wrong.mp3");
	bravo = new sound("bravo.mp3");
	getNewQuestion()
}

function getNewQuestion(){
	if (QuestionsLeft.length == 0){
		sessionStorage.setItem("finalScore", goodAnswer);
		return window.location.assign('C:/Users/yunsh/Documents/Projects/quiz/score.html')
	}
	questionCounter++
	progressText.innerText = `Question ${questionCounter}`
	if (questionCounter > 1){
		progressBarFull.style.width = `${((questionCounter-1)/QUESTIONS_NUM)*100}%`
	}
	const questionsIndex = Math.floor(Math.random() * QuestionsLeft.length)
	currentQuestion = QuestionsLeft[questionsIndex]
	
	question.innerText = currentQuestion.question
	
	choices.forEach(choice => {
		const number = choice.getAttribute('id')
		console.log(currentQuestion.answers[number].ans)
		choice.innerText = currentQuestion.answers[number].ans
	})
	
	QuestionsLeft.splice(questionsIndex, 1)
}

choices.forEach(choice =>{
	choice.addEventListener('click', e => {
		const selectedChoice = e.target
		const idnum = e.target.id
	
		let correctness = currentQuestion.answers[idnum].correct ? 'correct' : 'incorrect'
		
		if (correctness == "correct"){
			bravo.play();
			goodAnswer++;
		}
		else{
			wrong.play();
		}
		
		scoreText.innerText = `${goodAnswer}/${questionCounter}`
		selectedChoice.parentElement.classList.add(correctness)
		
		setTimeout(()=> {
			selectedChoice.parentElement.classList.remove(correctness)
			getNewQuestion()
		}, 900)
		
	})
})

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}

document.addEventListener("DOMContentLoaded", function() {
    startGame();
});