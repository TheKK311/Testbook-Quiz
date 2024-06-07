 // Extract query parameters
 const urlParams = new URLSearchParams(window.location.search);
 const totalTime = urlParams.get('totalTime');
 const totalQuestions = urlParams.get('totalQuestions');
 const attemptedQuestions = urlParams.get('attemptedQuestions');
 const passFail = urlParams.get('passFail');
 const correctAnswers = urlParams.get('correctAnswers');
 const wrongAnswers = urlParams.get('wrongAnswers');
 const percentage = urlParams.get('percentage');

 // Display result

 document.getElementById('totalTime').textContent = `${totalTime} seconds`;
 document.getElementById('totalQuestions').textContent = totalQuestions;
 document.getElementById('attemptedQuestions').textContent = attemptedQuestions;
 document.getElementById('passFail').textContent = passFail;
 document.getElementById('correctAnswers').textContent = correctAnswers;
 document.getElementById('wrongAnswers').textContent = wrongAnswers;
 document.getElementById('percentage').textContent = percentage;
 
 
 
 