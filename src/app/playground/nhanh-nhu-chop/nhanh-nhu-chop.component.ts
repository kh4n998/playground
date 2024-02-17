import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Answer } from 'src/app/_common/const';

@Component({
  selector: 'app-nhanh-nhu-chop',
  templateUrl: './nhanh-nhu-chop.component.html',
  styleUrls: ['./nhanh-nhu-chop.component.scss']
})
export class NhanhNhuChopComponent implements OnInit {
  timeLeft: number = 5;
  quizStep: string = "box_rules";
  numberOfQuiz: number = 0;
  score: number = 0;
  chosenOption: boolean = false;
  listAnswers: Answer[] = [];
  countdownTimer: any;
  firstNumber: number = 0;
  secondNumber: number = 0;
  operators: string[] = ['-', '+'];
  currentOperator: string = "+";
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  countdown() {
    this.countdownTimer = setInterval(() => {
      if (this.timeLeft === 0) {
        clearInterval(this.countdownTimer);
        this.chosenOption = true;
        setTimeout(() => this.getQuiz(), 1000)
        this.countdownTimer = null;
      } else {
        this.timeLeft--;
      }
    }, 1000)
  }

  checkAnswer(option: Answer) {
    clearInterval(this.countdownTimer);
    this.countdownTimer = null;
    option.selected = true;
    this.chosenOption = true;
    if (option.correct) {
      this.score++;
    }
  }

  genRandomNumber(max = 100, min = 0): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  back() {
    this.router.navigate(["/.."])
  }

  beginQuiz() {
    this.quizStep = "box_quiz";
    this.getQuiz();
  }

  getQuiz() {
    this.timeLeft = 5;
    this.numberOfQuiz++;
    this.firstNumber = this.genRandomNumber();
    this.secondNumber = this.genRandomNumber(this.firstNumber + 5);
    this.currentOperator = this.operators[Math.floor(Math.random() * this.operators.length)];
    this.genAnswers();
    this.countdown();
  }

  genAnswers() {
    this.chosenOption = false;
    const correctAnswer: Answer = {
      value: this.currentOperator === '+' ? this.firstNumber + this.secondNumber : this.firstNumber - this.secondNumber,
      correct: true,
      selected: false
    }
    this.listAnswers = [correctAnswer];
    for (let index = 0; index < 3; index++) {
      const value = this.genUniqueNumber(correctAnswer.value || 1);
      let answer: Answer = {
        value: value,
        correct: false,
        selected: false
      }
      this.listAnswers.push(answer);
    }
    this.listAnswers = this.shuffleAnswers(this.listAnswers);
  }

  genUniqueNumber(correctValue: number): number {
    // if answer is 100, get 5 number less than 100 & 5 number greater than 100 => [95..100..105]
    let value = this.genRandomNumber(correctValue + 5, correctValue - 5)
    const existing = this.listAnswers.find(answer => answer.value === value);
    if (existing) {
      value = this.genUniqueNumber(correctValue);
    }
    return value
  }


  shuffleAnswers(list: Answer[]): Answer[] {
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
  }
}
