import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaygroundComponent } from './playground.component';
import { QuizGameComponent } from './quiz-game/quiz-game.component';
import { VuaTiengVietComponent } from './vua-tieng-viet/vua-tieng-viet.component';
import { HuntingSnakeComponent } from './hunting-snake/hunting-snake.component';

const routes: Routes = [
  {
    path: '',
    component: PlaygroundComponent
  },
  {
    path: 'quiz',
    component: QuizGameComponent
  },
  {
    path: 'vua-tieng-viet',
    component: VuaTiengVietComponent
  },
  {
    path: 'hunting-snake',
    component: HuntingSnakeComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaygroundRoutingModule { }
