let currentQuestion = 0;
let score = 0;

//GK 

const questions =[
    {
        //question 1

        Question:"Who is the PM of India?",

        Options:
        ["Narendra Modi", //
         "Arvind Modi",
         "Rahul Modi",
         "Manoj Modi",],

        Ans: "Narendra Modi",
        
    },
    {
        //question 2
        Question:"Who is the first President of India ?",
        Options: 
        ["Rahul Prasad",
        "Rajendra Prasad", //
        "Manish Jha ",
        "Abdul Kalam "],
        Ans:"Rajendra Prasad",
    },
    {
        //question 3
        Question:"When removed a controvercial section of article 370 ?",
        Options: 
        ["2018 ",
        "2019", //
        "2020 ",
        "2016 ",],
        Ans: "2019",
    },
    {
        //question 4
        Question:"When Agniveer Yojana was launched ?",
        Options:
        ["2021 ",
         "2016 ",
         "2022", //
         "2023 ",],
        Ans: "2022",
    },
    {
        //question 5
        Question:"When Corona Pandemic came in India ?",
        Options:
        ["2018 ",
        "2019",
        "2020", //
        "2021",],
        Ans: "2020",
    },
    {
        //question 6
        Question:"What is another name of Corona Virus ?",
        Options:
        ["Covid-18",
        "Covi-3",
        "Covid-19", //
        "Coro-na",],
        Ans: "Covid-19",
    },
    {
        //question 7
        Question:"Largest mammale on the Earth ?",
        Options:
        ["Shark ",
        "Blue Whale", //
        "Pirana ",
        "Sea Fish ",],
        Ans: "Blue Whale",
    },
    {
        //question 8
        Question:"Which state divided from Andhra Pradesh ?",
        Options:
        ["Tamilnadu ",
        "Karnataka ",
        "Punjab ",
        "Telangana",], //
        Ans: "Telangana",
    },
    {
        //question 9
        Question:"Who was our PM from 2004 to 2014 ?",
        Options:
        ["Pawan Kheda ",
        "Narendra modi ",
        "Manmohan Singh", //
        "Moraraji Desai "],
        Ans: "Manmohan Singh",
    },
    {
        //question 10
        Question:"Who is the Home minister of India in 2024 ?",
        Options: 
        ["Rajnath Singh ",
        "Nitin Gadkari ",
        "Prakash Jawdrekar ",
        "Amit Shah",], //
        Ans:"Amit Shah",
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