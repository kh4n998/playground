import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nhanh-nhu-chop',
  templateUrl: './nhanh-nhu-chop.component.html',
  styleUrls: ['./nhanh-nhu-chop.component.scss']
})
export class NhanhNhuChopComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  exitGame() {
    this.router.navigate(["/.."])
  }

}
