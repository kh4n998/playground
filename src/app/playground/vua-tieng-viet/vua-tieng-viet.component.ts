import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface QuizVTV {
  answer: string;
  hint?: string;
  // correct: boolean;
}

@Component({
  selector: 'app-vua-tieng-viet',
  templateUrl: './vua-tieng-viet.component.html',
  styleUrls: ['./vua-tieng-viet.component.scss']
})
export class VuaTiengVietComponent implements OnInit {
  timeLeft: number = 20;
  currentQuiz!: QuizVTV;
  quizStep: string = "box_rules";
  userAnswer: string = "";
  listOfCharacters: string[] = [];
  listOfQuiz: QuizVTV[] = [
    {
      answer: "LỌ CỒN",
    },
    {
      answer: "ĐOÀN TỤ",
    },
    {
      answer: "MỨT CÓC",
    },
    {
      answer: "NỒI CÁ LÓC",
    },
    {
      answer: "ĐIỆN ẢNH",
    },
    {
      answer: "MẶC CẢM",
    },
    {
      answer: "KIỆT SỨC",
    },
    {
      answer: "CÁI BÓNG",
    },
    {
      answer: "CON LƯỜI",
    },
    {
      answer: "LÁNH VÀO ĐỒN",
    },
    {
      answer: "HÀ THỦ Ô",
    },
    {
      answer: "CAU CÓ",
    },
    {
      answer: "BÀN CHẢI",
    },
    {
      answer: "CHUA CAY",
    },
    {
      answer: "CON CÁO",
    },
    {
      answer: "BÚN CUA",
    },
    {
      answer: "CUNG ĐIỆN",
    },
    {
      answer: "GÂY CHIẾN",
    },
    {
      answer: "BỒ NÔNG",
    }
  ];
  countdownTimer: any;
  checked = false;
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  beginQuiz() {
    this.quizStep = "box_quiz";
    this.currentQuiz = this.listOfQuiz[Math.floor(Math.random()*this.listOfQuiz.length)];
    this.listOfCharacters = this.shuffleCharacter();
    this.countdown();
  }

  countdown() {
    this.countdownTimer = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft === 0) {
        clearInterval(this.countdownTimer);
        this.submit();
      }
    }, 1000)
  }

  submit() {
    if (this.userAnswer) {
      this.checkAnswer();
    }
    setTimeout(() => this.changeWord(), 1000)
  }

  shuffleCharacter(): string[] {
    let characters = this.currentQuiz.answer.replace(/\s/g, "").split("");
    for (let i = characters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [characters[i], characters[j]] = [characters[j], characters[i]];
    }
    return characters;
  }

  checkAnswer() {
    clearInterval(this.countdownTimer);
    this.checked = true;
    if (this.timeLeft > 0 && this.userAnswer.toLowerCase() === this.currentQuiz.answer.toLowerCase()) {
      this.listOfQuiz.splice(this.listOfQuiz.indexOf(this.currentQuiz), 1);
    }
  }

  changeWord() {
    clearInterval(this.countdownTimer);
    this.checked = false;
    const index = Math.floor(Math.random() * this.listOfCharacters.length);
    const newQuiz = this.listOfQuiz[index];
    this.userAnswer = "";
    if (this.currentQuiz?.answer !== newQuiz.answer) {
      this.currentQuiz = newQuiz;
      this.listOfCharacters = this.shuffleCharacter();
      this.timeLeft = 20;
      this.countdown();
    } else {
      this.changeWord();
    }
  }

  exitGame() {
    this.router.navigate(["/.."])
  }

}
