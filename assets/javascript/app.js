// PSEUDOCODE
// Question Bank is an array of length-5 arrays (question and 4 answers)
// randomly choose a question from the word bank,
// display question and potential answers
// begin 
// if Player chooses correct answer 
//		display Yay! 
//		and add a point
//		wait a few seconds (timeOut)
// else if Player chooses incorrect
// 		display correct answer
//		wait a few seconds (timeOut)
// else if timeOut
// 		display correct answer
//		wait a few seconds (timeOut)
// Move question from bank to a usedQuestions array
// Choose new question randomly from bank
// When there are no more questions
//		display # of correct, # of incorrect
//		display replay button

$(document).ready(function() {

// ------------- variables ---------------
	var questionBank = [
		["What is the only manmade object that is observable from the moon?", ["The Great Wall of China", "Stonehenge", "Panama Canal", "Denver International Airport"]],
		["What is the capital of Australia?", ["Canberra", "Sydney", "Brisbane", "Perth"]],
		["Who was the 'Mad Monk' of Russian history?", ["Rasputin", "Peter the Great", "Nicolas", "Stalin"]],
		["What is the largest fish in the ocean?", ["whale shark", "sunfish", "great white shark", "megadolphin"]],
		["Which artist painted a mustache and goatee on the Mona Lisa?", ["Marcel Duchamp", "Andy Warhol", "Frida Kahlo", "Rene Magritte"]],
	];
	var numCorrect = 0;
	// var numWrong = 0;
	var count = 0;
	var timerId;

// ------------- functions ---------------
	function initialize() {
		numCorrect = 0
		// numWrong = 0;
		count = 0
		$(".replay-button").hide();
		$(".start-button").show();
		console.log("initialized!")
	}
	// Handles displaying question and answers to DOM, according to 
	function displayQuestion() {
		console.log(questionBank.length)
		$(".question-box").html(questionBank[count][0]);
		
		// randomly assign answers (start at index 0) to divs by randomly choosing one, splice it, repeat...
		for (var i = 0; i < 4; i++) {
			//get a random index, 0 to 3
			randomAnsIndex = Math.floor(Math.random() * questionBank[count][1].length);
			//get ans from the random index
			randomAns = questionBank[count][1][randomAnsIndex];
			//assign random ans to ans div 
			$(".ans" + i).html(randomAns);
			//assign value attr to div, for checking for correct ans on click
			if (i === 0) {
				$(".ans" + i).attr("value", "correct");
			} else {
				$(".ans" + i).attr("value", "incorrect");
			}
			//splice the ans out of the question's ans array
			questionBank[count][1].splice(randomAnsIndex, 1);
		}
		return;
		
	}

	function startGame() {
		timerId = setInterval(nextQuestion, 7000);
	}

	// increments 
	function nextQuestion() {
		//increment some count?
		count++

		// ends the game if count reaches end of questionBank
		if (count === questionBank.length) {
			clearInterval(timerId);
			showFinalPage();
		} else {
			//if not at the end, then display the next question
			displayQuestion();
		}

	}

	// Display total correct, total incorrect, and replay button to DOM 
	function showFinalPage() {
		$(".question-box").html("Nice! You got " + numCorrect + " correct out of " + questionBank.length);
		$(".replay-button").show();

	}
// ------------- main logic ---------------

	initialize();
	$(".start-button").on("click", function() {
		startGame();
		nextQuestion();
	});

	$(".ans").on("click", function() {
		//clear interval
		clearInterval(timerId);
		//check ans, update numCorrect
		if ($(this).attr("value") === "correct") {
			numCorrect++;
		}
		//display correct ans
		$(".question-box").html("The correct answer was " );

		//wait five seconds
		setTimeout(function() { startGame(); }, 5000);
		//set interval (call start game?)

	})
		//Run one-round



})