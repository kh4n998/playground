import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.scss']
})
export class PuzzleComponent implements OnInit {
  quizStep: string = "box_rules";
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  exitGame() {
    this.router.navigate(["/.."])
  }

  beginQuiz() {

  }

  uploadFile(evt: any) {
    console.log(evt.target.files[0]);
    const numColsToCut = 3;
    const numRowsToCut = 4;
//     let image = new Image();
// image.onload = cutImageUp;
// image.src = 'myimage.png';

    // var imagePieces = [];
    // for(var x = 0; x < numColsToCut; ++x) {
    //     for(var y = 0; y < numRowsToCut; ++y) {
    //         var canvas = document.createElement('canvas');
    //         canvas.width = 40;
    //         canvas.height = 40;
    //         var context = canvas.getContext('2d');
    //         context?.drawImage(image, x * widthOfOnePiece, y * heightOfOnePiece, widthOfOnePiece, heightOfOnePiece, 0, 0, canvas.width, canvas.height);
    //         imagePieces.push(canvas.toDataURL());
    //     }
    // }

    // // imagePieces now contains data urls of all the pieces of the image

    // // load one piece onto the page
    // var anImageElement = document.getElementById('myImageElementInTheDom');
    // anImageElement.src = imagePieces[0];
  }

}
