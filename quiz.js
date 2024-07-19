
let currentQuestionIndex = 0;
let questions = [];

let questiondiv = document.querySelector('#questiondiv')
const renderQuestion = (questions, index) => {
    if (index < questions.length) {
        questiondiv.innerHTML = `
            <h4 class="list-group-item list-group-item-action active" aria-current="true">
                ${questions[index].question.text}
            </h4>
        `;
    } else {
        console.log('No more questions available');
        questiondiv.innerHTML = "";
    }
};

const renderAnswers = (answers) => {
    answerdiv.innerHTML = `
        <ul class="list-group" id="listGroup">
            ${answers.map((answer, index) => `
                <li class="list-group-item">
                    <input class="form-check-input me-1" required type="radio" name="listGroupRadio" value="${answer}" id="radio${index + 1}">
                    <label class="form-check-label" for="radio${index + 1}">${answer}</label>
                </li>

            `).join('')}
        </ul>
        
    `;
};

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 1; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

let fullNumbers = 0
let percent = document.querySelector('#percent')
const submitAnswer = (correctAnswer) => {
    const selectedRadio = document.querySelector('input[name="listGroupRadio"]:checked');
    if (selectedRadio) {
        const selectedValue = selectedRadio.value;
        if (selectedValue === correctAnswer) {
            console.log('Correct');
        fullNumbers += 10
           

            
        } else {
            console.log('Incorrect');
           
        }
        // Change button text to "Next Question"
        document.getElementById('actionButton').innerText = 'Next Question';
    } 
    else {

        console.log("Please select an answer.");
    }
};
const handleActionButtonClick = () => {
    const actionButton = document.getElementById('actionButton');

    if (actionButton.innerText === 'Submit Answer') {
        // If the button says "Submit Answer", check the answer
        const correctAnswer = questions[currentQuestionIndex].correctAnswer;
        console.log(correctAnswer);
        submitAnswer(correctAnswer);

        setTimeout(()=>{

            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                renderQuestion(questions, currentQuestionIndex);
                const answers = [...questions[currentQuestionIndex].incorrectAnswers, questions[currentQuestionIndex].correctAnswer];
                console.log(answers);
                const shuffledAnswers = shuffleArray(answers);
                renderAnswers(shuffledAnswers);
                // Change button text back to "Submit Answer"
                actionButton.innerText = 'Submit Answer';
            } else {
                console.log('No more questions');

                console.log(fullNumbers);
                percent.innerHTML = `<h1>Your Quiz percentage is = ${fullNumbers}%</h1>`
                questiondiv.innerHTML = "";
                answerdiv.innerHTML = "";
                actionButton.style.display = 'none'; // Hide the button when done
            }
        },500)


    } else if (actionButton.innerText === 'Next Question') {
        // If the button says "Next Question", go to the next question
        // currentQuestionIndex++;
        // if (currentQuestionIndex < questions.length) {
        //     renderQuestion(questions, currentQuestionIndex);
        //     const answers = [...questions[currentQuestionIndex].incorrectAnswers, questions[currentQuestionIndex].correctAnswer];
        //     const shuffledAnswers = shuffleArray(answers);
        //     renderAnswers(shuffledAnswers);
        //     // Change button text back to "Submit Answer"
        //     actionButton.innerText = 'Submit Answer';
        // } else {
        //     console.log('No more questions');
        //     questiondiv.innerHTML = "All done! Great job!";
        //     answerdiv.innerHTML = "No more questions available.";
        //     actionButton.style.display = 'none'; // Hide the button when done
        // }
    }
};

const fetchQuestions = async () => {
    try {
        const data = await fetch('https://the-trivia-api.com/v2/questions');
        questions = await data.json();
        renderQuestion(questions, currentQuestionIndex);
        const answers = [...questions[currentQuestionIndex].incorrectAnswers, questions[currentQuestionIndex].correctAnswer];
        // console.log(answers);
        const shuffledAnswers = shuffleArray(answers);
        renderAnswers(shuffledAnswers);
    } catch (error) {
        console.log(error);
    }
};

document.getElementById('actionButton').addEventListener('click', handleActionButtonClick);

fetchQuestions();