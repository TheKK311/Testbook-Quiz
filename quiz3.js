let currentQuestion = 0;
let score = 0;

//Chemistry Questions

const questions = [
    {
        //question 1
        Question:"What is the Symbol of Sodium ?",
        Options:
        ["So ",
        "Co ",
        "Na", //
        "Ma "],
        Ans:"Na"
    },
    {
        //question 2
        Question:"What is the Symbol of Bromine ?",
        Options:
        ["Bo ",
        "Br", //
        "Bromine ",
        "Bar"],
        Ans: "Br"
    },
    {
        //question 3
        Question:"What is the chemical formula of salt ?",
        Options:
        ["MgCl2 ",
        "NaCl", //
        "H2O ",
        "KOH"],
        Ans: "NaCl"
    },
    {
        //question 4
        Question:"What is the number of shells in any atom ?",
        Options:
        ["1 ",
        "2 ",
        "3 ",
        "4"], //
        Ans: "4"
    },
    {
        //question 5
        Question:"What is the formula of eating chuna ?",
        Options:
        ["CaCo3", //
        "CacO5 ",
        "CaCo2 ",
        "CaCo4"],
        Ans:"CaCo3"
    },
    {
        //question 6
        Question:"What is the Symbol of Potassium ?",
        Options:
        ["Po ",
        "Pt ",
        "K", //
        "Kt"],
        Ans:"K"
    },
    {
        //question 7
        Question:"What is the Symbol Argon ?",
        Options:
        ["Arg ",
        "Argon ",
        "Ar", //
        "Argo"],
        Ans:"Ar"
    },
    {
        //question 8
        Question:"What is the Symbol of Magnesium ?",
        Options:
        ["Mg", //
        "Mng ",
        "Mag ",
        "MiG "],
        Ans: "Mg"
    },
    {
        //question 9
        Question:"What is the Symbol of Aluminium ?",
        Options:
        ["Alu ",
        "Ai ",
        "Al", //
        "Al2"],
        Ans: "Al"
    },
    {
        //question 10
        Question:"What is the Symbol of Iron ?",
        Options:
        ["Iron ",
        "Ir ",
        "Fe", //
        "Fe2"],
        Ans: "Fe",
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