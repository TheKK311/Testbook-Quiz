let currentQuestion = 0;
let score = 0;

//Maths Questions


const questions = [
    {
        //question 1
        Question:"Calculate: (1.02+ 2.05)= ?",
        Options:
        ["3.25 ",
        "3.03 ",
        "3.07", //
        "3.09 "],
        Ans: "3.07"
    },
    {
        //question 2
        Question:"Calculate: (4*4)= ?",
        Options:
        ["4 ",
        "8 ",
        "16", //
        "44 "],
        Ans: "16"
    },
    {
        //question 3
        Question:"Calculate: (4-6)= ? ?",
        Options:
        ["2 ",
        "-2", //
        "4 ",
        "-4 "],
        Ans: "-2"
    },
    {
        //question 4
        Question:"Calculate: (16/8)= ?",
        Options:
        ["16 ",
        "8 ",
        "4 ",
        "2"], //
        Ans: "2"
    },
    {
        //question 5
        Question:"Calculate: (4*4+2)= ?",
        Options:
        ["16 ",
        "10 ",
        "18", //
        "6" ],
        Ans: "18"
    },
    {
        //question 6
        Question:"Calculate: (24*1.5+7-3)= ?",
        Options: 
        ["241.5 ",
        "157.3 ",
        "24.15 ",
        "40"], //
        Ans: "40"
    },
    {
        //question 7
        Question:"Calculate: (2+2-4-2+5)= ?",
        Options:
        ["2 ",
        "3", //
        "4 ",
        "5 "],
        Ans: "3",
    },
    {
        //question 8
        Question:"Calculate: (1-1+1-1+1-1+1)= ?",
        Options: 
        ["1", //
        "-1 ",
        "0 ",
        "3 ",],
        Ans:"1"
    },
    {
        //question 9
        Question:"Calculate: (2*2*2)= ?",
        Options:
        ["2 ",
        "4 ",
        "6 ",
        "8",], //
        Ans: "8",
    },
    {
        //question 10
        Question:"Calculate: (3.03*0.03)= ?",
        Options:
        ["0.0909", //
        "0.0303 ",
        "0.2727 ",
        "0.8181 ",],
        Ans: "0.0909"
    }
]


//answer checking logic

function checkAnswer(quizBtn) {
    const selectedAnswer = quizBtn.textContent;
    const correctAnswer = questions[currentQuestion].Ans;
    const answerButtons = document.querySelectorAll('.quizBtn');

    if (selectedAnswer === correctAnswer) {
        score++;
        document.querySelector('#score').textContent = score;
        quizBtn.style.backgroundColor = 'green';
    } else {
        for (let i = 0; i < answerButtons.length; i++) {
            if (answerButtons[i].textContent === correctAnswer) {
                answerButtons[i].style.backgroundColor = 'green';
            }else
            quizBtn.style.backgroundColor = 'red';
        }
    }

    // Disable buttons after an answer is selected
    answerButtons.forEach(button => {
        button.disabled = true;
    });
}

//next question function

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        const questionElement = document.getElementById('h2question');
        questionElement.textContent = `${questions[currentQuestion].Question}`;
        const answerButtons = document.querySelectorAll('.quizBtn');
        for (let i = 0; i < answerButtons.length; i++) {
            answerButtons[i].textContent = questions[currentQuestion].Options[i];
            answerButtons[i].style.backgroundColor = '';
            answerButtons[i].disabled = false;
        }
        // Update the progress
        updateProgress();
        // Reset the timer
        clearInterval(timeinterval);
        startTimer(30);
    } else {
        // Construct the result URL with query parameters
        const totalTime = 30 * (currentQuestion + 1); // Assuming each question takes 30 seconds
        const totalQuestions = questions.length;
        const attemptedQuestions = currentQuestion + 1;
        const passFail = score >= totalQuestions /4 ? 'Pass' : 'Fail';
        const correctAnswers = score;
        const wrongAnswers = totalQuestions - score;
        const percentage = ((score / totalQuestions) * 100).toFixed(2) + '%';
        const resultUrl = `result.html?totalTime=${totalTime}&totalQuestions=${totalQuestions}&attemptedQuestions=${attemptedQuestions}&passFail=${passFail}&correctAnswers=${correctAnswers}&wrongAnswers=${wrongAnswers}&percentage=${percentage}`;
        // Redirect to the result page
        window.location.href = resultUrl;
    }
}

//update progress function

function updateProgress() {
    const progressElement = document.getElementById('progress');
    progressElement.textContent = `${currentQuestion + 1}/${questions.length}`;
}

//Timer start function

function startTimer(duration) {
    let timeleft = duration;
    const timer = document.getElementById('timer');
    timer.textContent = `${timeleft}`;
    timeleft--;
    timeinterval = setInterval(function() {
        if (timeleft > 0) {
            timer.textContent = `${timeleft}`;
            timeleft--;
        } else {
            clearInterval(timeinterval);
            timer.innerHTML = `Time's up`;
            nextQuestion();
        }
    }, 1000);
}

updateProgress();
startTimer(30);