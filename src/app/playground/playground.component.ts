import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {
  listOfGames: {name: string, routing: string}[] = [
    {name: "Quiz Game", routing: "quiz"},
    {name: "Vua Tieng Viet", routing: "vua-tieng-viet"},
    {name: "Hunting snake", routing: "hunting-snake"},
    {name: "Quiz Game", routing: "quiz"},
    {name: "Quiz Game", routing: "quiz"},
    {name: "Quiz Game", routing: "quiz"},
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
