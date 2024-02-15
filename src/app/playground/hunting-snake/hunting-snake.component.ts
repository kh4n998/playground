import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

type TPosition = {
  x: number,
  y: number
}

@Component({
  selector: 'app-hunting-snake',
  templateUrl: './hunting-snake.component.html',
  styleUrls: ['./hunting-snake.component.scss']
})
export class HuntingSnakeComponent implements OnInit {
  @ViewChild('gameBoard', {static: true}) gameBoard!: ElementRef<HTMLDivElement>;
  readonly gameBoardSize: number = 20;
  readonly SNAKE_SPEED: number = 1;
  readonly EXPANSION_RATE: number = 1;
  paused: boolean = true;
  sub$ = Subscription.EMPTY;
  snakeBody: TPosition[] = [{x: 3, y: 1},{x: 2, y: 1},{x: 1, y: 1}];
  lastInputDirection: TPosition = { x: 1, y: 0 }
  inputDirection: TPosition = { x: 1, y: 0 }
  food: TPosition = this.getRandomFoodPosition();
  gameOver: boolean = false;
  lastRenderTime: number = 0;
  currScore: number = 0;
  newSegments = 0;
  moving: boolean = false;
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  @HostListener('window:keydown', ['$event'])
  onKeypress(e: KeyboardEvent) {
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) return
    switch (e.key) {
      case 'ArrowUp':
        if (this.lastInputDirection.y !== 0) break
        this.inputDirection = { x: 0, y: -1 }
        break
      case 'ArrowDown':
        if (this.lastInputDirection.y !== 0) break
        this.inputDirection = { x: 0, y: 1 }
        break
      case 'ArrowLeft':
        if (this.lastInputDirection.x !== 0) break
        this.inputDirection = { x: -1, y: 0 }
        break
      case 'ArrowRight':
        if (this.lastInputDirection.x !== 0) break
        this.inputDirection = { x: 1, y: 0 }
        break
    }
  }

  getInputDirection() {
    this.lastInputDirection = this.inputDirection;
    return this.inputDirection;
  }


  ngAfterViewInit(): void {
    this.draw();
  }

  /**
   * The function returns a random position on a grid.
   * @returns An object with properties `x` and `y` representing a random grid position.
   */
  randomGridPosition(): TPosition {
    return {
      x: Math.floor(Math.random() * this.gameBoardSize) + 1,
      y: Math.floor(Math.random() * this.gameBoardSize) + 1
    }
  }

  getRandomFoodPosition() {
    let newFoodPosition: TPosition | null = null;
    while (newFoodPosition === null || this.onSnake(newFoodPosition)) {
      newFoodPosition = this.randomGridPosition();
    }
    return newFoodPosition
  }

  onSnake(position: TPosition, { ignoreHead = false } = {}) {
    return this.snakeBody.some((segment, index) => {
      if (ignoreHead && index === 0) return false
      return this.equalPositions(segment, position)
    })
  }

  equalPositions(pos1: TPosition, pos2: TPosition) {
    return pos1.x === pos2.x && pos1.y === pos2.y
  }

  /**
   * The function checks if a given position is outside the game board grid.
   * @param position - The position parameter is an object with two properties: x and y. These properties
   * represent the coordinates of a position on a grid.
   * @returns a boolean value.
   */
  outsideGrid(position: { x: number, y: number }):boolean {
    return position.x < 1 || position.x > this.gameBoardSize || position.y < 1 || position.y > this.gameBoardSize
  }

  drawSnake() {
    this.snakeBody.forEach(segment => {
      const snakeElement = document.createElement('div');
      snakeElement.style.gridRowStart = segment.y.toString();
      snakeElement.style.gridColumnStart = segment.x.toString();
      snakeElement.classList.add('snake')
      this.gameBoard.nativeElement.appendChild(snakeElement);
    })
  }

  drawFood() {
    const foodElement = document.createElement('div')
    foodElement.style.gridRowStart = this.food.y.toString();
    foodElement.style.gridColumnStart = this.food.x.toString();
    foodElement.classList.add('food')
    this.gameBoard.nativeElement.appendChild(foodElement);
  }

  startGame(currentTime: any) {
    if (this.gameOver || this.paused) {
      return
    }
    window.requestAnimationFrame(this.startGame.bind(this))
    const secondsSinceLastRender = (currentTime - this.lastRenderTime) / 1000
    if (secondsSinceLastRender < 1 / this.snakeSpeed) return
    this.lastRenderTime = currentTime;

    this.update();
    this.draw();
  }

  get snakeSpeed() {
    if(this.currScore < 10) return 4;
    if(this.currScore > 10 &&  this.currScore < 20 ) return 5;
    if(this.currScore > 20 && this.currScore < 30 ) return 7;
    return 7;
  }

  update() {
    this.updateSnake();
    this.updateFood();
    this.checkDeath();
  }

  updateSnake() {
    this.addSegments();
    const inputDirection = this.getInputDirection();
    for (let i = this.snakeBody.length - 2; i >= 0; i--) {
      this.snakeBody[i + 1] = { ...this.snakeBody[i] }
    }
    this.snakeBody[0].x += inputDirection.x;
    this.snakeBody[0].y += inputDirection.y;
  }

  updateFood() {
    if (this.onSnake(this.food)) {
      this.expandSnake(this.EXPANSION_RATE);
      this.food = this.getRandomFoodPosition();
      this.currScore++;
    }
  }

  expandSnake(amount: any) {
    this.newSegments += amount
  }

  checkDeath() {
    this.gameOver = this.outsideGrid(this.snakeBody[0]) || this.onSnake(this.snakeBody[0], { ignoreHead: true });
    if(!this.gameOver) return;
    this.gameBoard.nativeElement.classList.add("blur");
  }


  draw() {
    this.gameBoard.nativeElement.innerHTML = '';
    this.drawSnake();
    this.drawFood();
  }

  addSegments() {
    for (let i = 0; i < this.newSegments; i++) {
      this.snakeBody.push({ ...this.snakeBody[this.snakeBody.length - 1] });
    }

    this.newSegments = 0;
  }

  resetGame() {
    this.snakeBody = [{x: 3, y: 1},{x: 2, y: 1},{x: 1, y: 1}];
    this.lastInputDirection = { x: 1, y: 0 };
    this.inputDirection = { x: 1, y: 0 };
    this.moving = false;
    this.pauseGame();
    this.draw();
  }


  pauseGame(value = true) {
    this.paused = value;
    if (!value) {
      this.moving = true;
      window.requestAnimationFrame(this.startGame.bind(this))
    }
  }

  exitGame() {
    this.router.navigate(["../"])
  }
}
