import { Finish } from "./finish.js"

export class Quiz {
    constructor(questions) {
        this.questions = questions
        this.currentQuestion = 0
        this.score = 0
        this.showQuestions()
        document.querySelector("#next").addEventListener('click', this.nextQuestion.bind(this))
    }
    shuffle(array) {
        let currentIndex = array.length
        let randomIndex;
        while (currentIndex > 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }

        return array;
    }
    showQuestions() {
        document.querySelector('#question').innerHTML = this.questions[this.currentQuestion].question
        document.querySelector('#currentQuestion').innerHTML = this.currentQuestion + 1
        document.querySelector('#totalNumberOfQuestions').innerHTML = this.questions.length
        let correctAnswer = this.questions[this.currentQuestion].correct_answer;
        let IncorrectAnswers = this.questions[this.currentQuestion].incorrect_answers;
        let allAnswers = [correctAnswer, ...IncorrectAnswers]
        this.shuffle(allAnswers)
        let answersContainer = ``;
        for (let i = 0; i < allAnswers.length; i++) {
            answersContainer += `
                <label class="form-check-label mb-1 d-block">
                    <input type="radio" class="form-check-input  me-2" name="answer"  value="${allAnswers[i]}">
                     ${allAnswers[i]}
                </label>
            `
        }
        document.querySelector('#rowAnswer').innerHTML = answersContainer;
    }
    nextQuestion() {
        let correctAnswer = this.questions[this.currentQuestion].correct_answer;
        let userAnswer = Array.from(document.getElementsByName('answer')).find(element => element.checked)
        if (userAnswer != undefined) {

            let userAnswerValue = userAnswer.value
            console.log(correctAnswer, userAnswerValue)

            this.isCorrect(correctAnswer, userAnswerValue)
            $('#alert').fadeOut(0)
            this.currentQuestion++;
            if (this.currentQuestion < this.questions.length) {
                this.showQuestions();
            } else {
                $('#quiz').fadeOut(300, function () {
                    $('#finish').fadeIn(300)
                })
                let finish = new Finish(this.score)
            }
        }
        else {
            $('#alert').fadeIn(500)
        }
    }
    isCorrect(correctAnswer, userAnswer) {
        if (userAnswer == correctAnswer) {
            this.score++;
            $('#Correct').fadeIn(300).fadeOut(500)
        } else (
            $('#inCorrect').fadeIn(300).fadeOut(500)
        )

    }
}