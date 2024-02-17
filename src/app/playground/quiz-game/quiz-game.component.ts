import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Answer, Quiz } from 'src/app/_common/const';

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
    },
    {
      index: 6,
      question: "Inside which HTML element do we put the JavaScript?",
      option: [
        {
          label: "script",
          correct: true,
          selected: false,
        },
        {
          label: "javascript",
          correct: false,
          selected: false,
        },
        {
          label: "JS",
          correct: false,
          selected: false,
        },
        {
          label: "link",
          correct: false,
          selected: false,
        },
      ]
    },
    {
      index: 7,
      question: "What is jQuery?",
      option: [
        {
          label: "A framework",
          correct: false,
          selected: false,
        },
        {
          label: "A library",
          correct: true,
          selected: false,
        },
        {
          label: "Function",
          correct: false,
          selected: false,
        },
        {
          label: "None of these",
          correct: false,
          selected: false,
        },
      ]
    },
    {
      index: 8,
      question: "'margin: 5px 10px 3px 8px;'. What value is given for the left margin?",
      option: [
        {
          label: "5px",
          correct: false,
          selected: false,
        },
        {
          label: "10px",
          correct: false,
          selected: false,
        },
        {
          label: "8px",
          correct: true,
          selected: false,
        },
        {
          label: "3px",
          correct: false,
          selected: false,
        }
      ]
    },
    {
      index: 9,
      question: "Which of the following function of String object returns the character at the specified index?",
      option: [
        {
          label: "charAt()",
          correct: true,
          selected: false,
        },
        {
          label: "charCodeAt()",
          correct: false,
          selected: false,
        },
        {
          label: "concat()",
          correct: false,
          selected: false,
        },
        {
          label: "indexOf()",
          correct: false,
          selected: false,
        }
      ]
    },
    {
      index: 10,
      question: "Which is not a Typescript data type?",
      option: [
        {
          label: "boolean",
          correct: false,
          selected: false,
        },
        {
          label: "undefined",
          correct: false,
          selected: false,
        },
        {
          label: "unknown",
          correct: false,
          selected: false,
        },
        {
          label: "double",
          correct: true,
          selected: false,
        }
      ]
    },
    {
      index: 11,
      question: "HTML ID's can only be used once",
      option: [
        {
          label: "True",
          correct: true,
          selected: false,
        },
        {
          label: "False",
          correct: false,
          selected: false,
        }
      ]
    },
  ]
  quizCount: number = 1;
  timeline: number = 0;
  countdownTimer: any;
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
  }

  checkAnswer(option: Answer) {
    clearInterval(this.countdownTimer);
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

  completeQuiz() {
    this.quizStep = "box_score";
  }

}
