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
	var questionBank = [];

	var numCorrect = 0;
	// var numWrong = 0;
	// variable for tracking the current question 
	var count = 0;
	// variable for saving the question display setInterval
	var questionTimerId;
	// variable for saving the answer display setTimeout
	var ansTimeoutTimerId;
	// variable for saving the answer display setInterval
	var ansIntervalTimerId;
	// variable for saving the correct answer in each round
	var savedCorrectAns = "";

	var gameLocked = false;
	var ansLocked = false;

// ------------- functions ---------------
	function initialize() {
		numCorrect = 0
		// numWrong = 0;
		count = 0

		questionBank = [
			["dummy question: ***DONT TOUCH ME***"],
			["What is the only manmade object that is observable from the moon?", ["The Great Wall of China", "Stonehenge", "Panama Canal", "Denver International Airport"]],
			["What is the capital of Australia?", ["Canberra", "Sydney", "Brisbane", "Perth"]],
			["Who was the 'Mad Monk' of Russian history?", ["Rasputin", "Peter the Great", "Nicolas", "Stalin"]],
			["What is the largest fish in the ocean?", ["whale shark", "sunfish", "great white shark", "megadolphin"]],
			["Which artist painted a mustache and goatee on the Mona Lisa?", ["Marcel Duchamp", "Andy Warhol", "Frida Kahlo", "Rene Magritte"]],
		];

		$(".replay-button").hide();
		$(".ans").show();
		$(".glyphicon").hide();
		console.log("initialized!")
	}

	// Handles displaying question to DOM, and answers randomly to DOM
	function displayQuestion() {
		

		$("#question").text(questionBank[count][0]);
		savedCorrectAns = questionBank[count][1][0];

		// randomly assign answers (start at index 0) to divs by randomly choosing one, splice it, repeat...
		for (var i = 0; i < 4; i++) {

			//get a random index, 0 to 3
			randomAnsIndex = Math.floor(Math.random() * questionBank[count][1].length);
			
			//get ans from the random index
			randomAns = questionBank[count][1][randomAnsIndex];
			
			//assign random ans to ans div 
			$(".ans" + i).text(randomAns);
			
			//assign correct/incorrect value attr to div, for checking for correct ans on click
			
			if ((!ansLocked) && (randomAnsIndex === 0)) {   
				$(".ans" + i).attr("value", "correct");
				ansLocked = true;
			} else {
				$(".ans" + i).attr("value", "incorrect");
			}
			
			//take the ans out of the question's ans array
			questionBank[count][1].splice(randomAnsIndex, 1);
		}
		return;
	}

	//displays Correct Ans to DOM
	function displayCorrectAns() {
		// Locks game so that answer can't be chosen while displaying the correct ans
		gameLocked = true;
		
		$("#question").text("The correct answer was " + savedCorrectAns);
		
		//put 'check' glyphicons on correct answer
		//put 'x' glyphicons on incorrect answers
		for (var i = 0; i < 4; i++) {
			if ($(".ans" + i).attr("value") === "correct") {
				console.log($(".ans"+i).text() + " is correct")
				$(".correct-" + i).show();

				//change color to green for a few secs, by adding btn-submit
				

			} else if ($(".ans" + i).attr("value") === "incorrect") {
				$(".incorrect-" + i).show();
			
				//change color to red for a few secs, by adding btn-danger
				
    
			}
			
		}
		
	}

	//
	function startGame() {
		$(".ans").show();

		//set timeout for displayAns, to be cleared in ans click handler
		ansTimeoutTimerId = setTimeout(function() {
			displayCorrectAns();
			ansIntervalTimerId = setInterval(function() {
				displayCorrectAns();
			}, 10000);
		}, 7000);	
		
		questionTimerId = setInterval(function() {
			nextQuestion();
		}, 10000);
	}

	//this function ...
	function nextQuestion() {
		$(".glyphicon").hide();
		//increment count
		count++
		gameLocked = false;	
		ansLocked = false;

		// ends the game if count reaches end of questionBank
		if (count === questionBank.length) {
			clearTimeout(ansTimeoutTimerId);
			clearInterval(ansIntervalTimerId);
			clearInterval(questionTimerId);
			showFinalPage();
		} else {
			//if not at the end, then display the next question
			displayQuestion();
		}

	}

	// Display total correct, total incorrect, and replay button to DOM 
	function showFinalPage() {
		
		$("#question").text("Nice! You got " + numCorrect + " correct out of " + (questionBank.length-1));
		$(".replay-button").show();
		$(".ans").hide();
	}

// ------------- main logic ---------------

	$(".start-button").show();
	initialize();

	$(".start-button").on("click", function() {
		startGame();
		nextQuestion();
		$(".start-button").hide();
	});

	$(".ans").on("click", function() {
		console.log(gameLocked)
		if (!gameLocked) {
			
			clearTimeout(ansTimeoutTimerId);
			clearInterval(ansIntervalTimerId);
			clearInterval(questionTimerId);

			//check ans, update numCorrect
			if ($(this).children( ".answer" ).attr("value") === "correct") {    // +++++ FIX THIS LINE +++
				numCorrect++;
			}
			displayCorrectAns();

			//wait three seconds to continue to next question
			if (count !== questionBank.length) {
				setTimeout(function() { startGame(); nextQuestion() }, 3000);
			}
		}
		gameLocked = true;
	});

	$(".replay-button").on("click", function () {
		initialize();

		startGame(); 
		nextQuestion();
		
		$(".replay-button").hide();
	})

})