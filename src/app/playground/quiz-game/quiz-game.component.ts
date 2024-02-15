import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Answer {
  label: string;
  correct: boolean;
  selected: boolean;
}
interface Quiz {
  index: number;
  question: string;
  option: Answer[];
}
@Component({
  selector: 'app-quiz-game',
  templateUrl: './quiz-game.component.html',
  styleUrls: ['./quiz-game.component.scss']
})
export class QuizGameComponent implements OnInit {
  timeLeft: number = 15;
  currentQuiz!: Quiz;
  quizStep: string = "box_rules";
  score: number = 0;
  chosenOption: boolean = false;
  listOfQuiz: Quiz[] = [
    {
      index: 1,
      question: "What does HTML stand for?",
      option: [
        {
          label: "Hyper Text Multiple Language",
          correct: false,
          selected: false,
        },
        {
          label: "Hyper Text Markup Language",
          correct: true,
          selected: false,
        },
        {
          label: "Hyper Tool Multi League",
          correct: false,
          selected: false,
        },
        {
          label: "Hyperlinks and Text Markup Language",
          correct: false,
          selected: false,
        },
      ]
    },
    {
      index: 2,
      question: "What does BEM stand for?",
      option: [
        {
          label: "Block Element Modifier",
          correct: true,
          selected: false,
        },
        {
          label: "Baby Elephant is Moving",
          correct: false,
          selected: false,
        },
        {
          label: "Bachelor of Engineering of Mines",
          correct: false,
          selected: false,
        },
        {
          label: "British Empire Medal",
          correct: false,
          selected: false,
        },
      ]
    },
    {
      index: 3,
      question: "Choose the incorrect input type?",
      option: [
        {
          label: "type='text'",
          correct: false,
          selected: false,
        },
        {
          label: "type='video'",
          correct: true,
          selected: false,
        },
        {
          label: "type='button'",
          correct: false,
          selected: false,
        },
        {
          label: "type='submit'",
          correct: false,
          selected: false,
        },
      ]
    },
    {
      index: 4,
      question: "What is the correct block element?",
      option: [
        {
          label: "<a> tag",
          correct: false,
          selected: false,
        },
        {
          label: "<span> tag",
          correct: false,
          selected: false,
        },
        {
          label: "<blockquote> tag",
          correct: true,
          selected: false,
        },
        {
          label: "<del> tag",
          correct: false,
          selected: false,
        },
      ]
    },
    {
      index: 5,
      question: "What does CSS stand for?",
      option: [
        {
          label: "Cascading Style Sheets",
          correct: true,
          selected: false,
        },
        {
          label: "Colorful Style Sheets",
          correct: false,
          selected: false,
        },
        {
          label: "Computer Science Subjects",
          correct: false,
          selected: false,
        },
        {
          label: "Common Style Sheets",
          correct: false,
          selected: false,
        },
      ]
    }
  ]
  quizCount: number = 1;
  timeline: number = 0;
  countdownTimer: any;
  calculateProcessing: any;
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  countdown() {
    this.countdownTimer = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft === 0) {
        clearInterval(this.countdownTimer);
      }
    }, 1000)
    this.calculateProcessing = setInterval(() => {
      this.timeline += 1;
      if (this.timeline >= 600) {
        clearInterval(this.calculateProcessing);
      }
    }, 25)
  }

  checkAnswer(option: Answer) {
    clearInterval(this.countdownTimer);
    clearInterval(this.calculateProcessing);
    option.selected = true;
    this.chosenOption = true;
    if (option.correct) {
      this.score++;
    }

  }

  back() {
    this.router.navigate(["/.."])
  }

  showTheNext() {
    if (this.quizCount < this.listOfQuiz.length) {
      this.timeline = 0;
      this.currentQuiz = this.listOfQuiz[this.currentQuiz.index];
      this.timeLeft = 15;
      this.chosenOption = false;
      this.quizCount++;
      this.countdown();
    }
  }

  beginQuiz() {
    this.quizCount = 1;
    this.quizStep = "box_quiz";
    this.currentQuiz = this.listOfQuiz[0];
    this.countdown();
  }

  exitQuiz() {
    this.router.navigate(["../"])
  }

  completeQuiz() {
    this.quizStep = "box_score";
  }

}
