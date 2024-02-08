import { Quiz } from "./quiz.js"

export class Setting{
    constructor() {
        this.chooseCategory = document.querySelector('#category')
        this.chooseDifficulty = document.getElementsByName('difficulty')
        this.chooseNum = document.querySelector('#numberOfQuestions')
        document.querySelector("#startBtn").addEventListener("click", this.startQuiz.bind(this))
    }
    async startQuiz() {
        let category = this.chooseCategory.value
        let difficulty = Array.from(this.chooseDifficulty).find(element => element.checked).value;
        let numOfQuiz = this.chooseNum.value
        if (numOfQuiz == "") {
            $('#questionsAlert').fadeIn(500)
            
        } else {
            $("#questionsAlert").fadeOut(200)
            console.log(category, difficulty, numOfQuiz)
            let apiUrl = `https://opentdb.com/api.php?amount=${numOfQuiz}&category=${category}&difficulty=${difficulty}`
            let questions = await this.fetchApi(apiUrl)
            console.log(questions)
            $('#settings').fadeOut(200, function () {
                $('#quiz').fadeIn(300)
            })
            let quiz = new Quiz(questions);
        }
    }
    async fetchApi(url) {
        let response = await fetch(url)
        let finalResponse = await response.json()
        return finalResponse.results;
    }
}
