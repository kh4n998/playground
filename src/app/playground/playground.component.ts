import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {
  listOfGames: {name: string, routing: string, img: string}[] = [
    {name: "Quiz Game", routing: "quiz", img: "./assets/imgs/quiz.svg"},
    {name: "Vua Tieng Viet", routing: "vua-tieng-viet", img: "./assets/imgs/vuatiengviet.svg"},
    {name: "Hunting snake", routing: "hunting-snake", img: "./assets/imgs/hunting-snake.svg"},
    {name: "Mathematical", routing: "mathematical", img: "./assets/imgs/mathematical.svg"},
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
