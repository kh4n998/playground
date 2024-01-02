import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface QuizVTV {
  answer: string;
  hint: string;
}

@Component({
  selector: 'app-vua-tieng-viet',
  templateUrl: './vua-tieng-viet.component.html',
  styleUrls: ['./vua-tieng-viet.component.scss']
})
export class VuaTiengVietComponent implements OnInit {
  timeLeft: number = 30;
  currentQuiz!: QuizVTV;
  quizStep: string = "box_rules";
  userAnswer: string = "";
  listOfCharacters: string[] = [];
  listOfQuiz: QuizVTV[] = [
    {
      answer: "LỌ CỒN",
      hint: "Vừa đau vừa sạch"
    },
    {
      answer: "ĐOÀN TỤ",
      hint: "Một cặp đôi gặp nhau sau một quãng thời gian dài yêu xa"
    },
    {
      answer: "MỨT CÓC",
      hint: "Một số người cho rằng nó ngon, một số người thì không"
    },
    {
      answer: "NỒI CÁ LÓC",
      hint: "Vô nhà bà Tám ở Cần Thơ hỏi xin ăn"
    },
    {
      answer: "ĐIỆN ẢNH",
      hint: "Ngành công nghiệp không khói"
    },
    {
      answer: "MẶC CẢM",
      hint: "Thể hiện suy nghĩ tiêu cực"
    },
    {
      answer: "KIỆT SỨC",
      hint: "Trạng thái năng lượng thấp"
    },
    {
      answer: "CÁI BÓNG",
      hint: "Nhìn giống con voi, to như con voi, có vòi có mũi, nhưng lại đen thui"
    },
    {
      answer: "CON LƯỜI",
      hint: "Những ánh mắt ngô nghê, những nụ cười ngờ nghệch"
    },
    {
      answer: "LÁNH VÀO ĐỒN",
      hint: "Chạy nhanh đi trước khi mọi chuyện tồi tệ hơn"
    },
  ];
  countdownTimer: any;
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  beginQuiz() {
    this.quizStep = "box_quiz";
    this.currentQuiz = this.listOfQuiz[0];
    this.listOfCharacters = this.shuffleCharacter();
    this.countdown();
  }

  countdown() {
    this.countdownTimer = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft === 0) {
        clearInterval(this.countdownTimer);
      }
    }, 1000)
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
    if (this.timeLeft > 0 && this.userAnswer.toLowerCase() === this.currentQuiz.answer.toLowerCase()) {
      this.listOfQuiz.splice(this.listOfQuiz.indexOf(this.currentQuiz), 1)
    }
  }

  changeWord() {
    clearInterval(this.countdownTimer);
    const index = Math.floor(Math.random() * this.listOfCharacters.length);
    const newQuiz = this.listOfQuiz[index];
    this.userAnswer = "";
    if (this.currentQuiz.answer !== newQuiz.answer) {
      this.currentQuiz = newQuiz;
      this.listOfCharacters = this.shuffleCharacter();
      this.timeLeft = 30;
      this.countdown();
    } else {
      this.changeWord();
    }
  }

  exitGame() {
    this.router.navigate(["/.."])
  }

}
