let currentQuestion = 0;
let score = 0;


//let timeinterval;

//Name of the City

const questions = [
    {
        //question 1
        Question:"Tell the name of a City in Delhi ?",
        Options: 
        ["Rohini", //
        "Allahabad ",
        "Kanpur ",
        "Bhuj"],
        Ans: "Rohini"
    },
    {
        //question 2
        Question:"Tell the name of a City in Punjab ?",
        Options: 
        ["Ahmedabad ",
        "Mohali", //
        "Panipat ",
        "Sonipat "],
        Ans:"Mohali"
    },
    {
        //question 3
        Question:"Tell the name of a City in Haryana ?",
        Options: 
        ["Panipat", //
        "Bathinda ",
        "Amritsar ",
        "Bhagalpur"],
        Ans: "Panipat"
    },
    {
        //question 4
        Question:"Tell the name of a City in Jammu-Kashmir ?",
        Options: 
        ["Srinagar", //
        "Pathankot ",
        "Agra ",
        "Kachh"],
        Ans: "Srinagar"
    },
    {
        //question 5
        Question:"Tell the name of a City not in Bihar ?",
        Options:
        ["Patna ",
        "Shanti Niketan", //
        "Bhagalpur ",
        "Gaya"],
        Ans:"Shanti Niketan"
    },
    {
        //question 6
        Question:"Tell the name of a City in Jharkhand ?",
        Options:
        ["Raurkela ",
        "Bhubneshwar",
        "Ranchi", //
        "Katak"],
        Ans:"Ranchi"
    },
    {
        //question 7
        Question:"Tell the name of a City in Gujarat ?",
        Options: 
        ["Gandhinagar", //
        "Arawali ",
        "Jaipur ",
        "Udaypur "],
        Ans: "Gandhinagar"
    },
    {
        //question 8
        Question:"Tell the name of a City in Chhatisgarh ?",
        Options: 
        ["Gwalior ",
        "Balod", //
        "Nagpur ",
        "Reva "],
        Ans: "Balod"
    },
    {
        //question 9
        Question:"Tell the name of a City in Maharashtra ?",
        Options: 
        ["Medinipur ",
        "Kolhapur", //
        "Sarojini ",
        "Lucknow "],
        Ans: "Kolhapur"
    },
    {
        //question 10
        Question:"Tell the name of a City not in Uttar Pradesh ?",
        Options: 
        ["Agra ",
        "Allahabad ",
        "Balia",
        "Buxar"], //
        Ans: "Buxar"
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