import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaygroundRoutingModule } from './playground-routing.module';
import { PlaygroundComponent } from './playground.component';
import { QuizGameComponent } from './quiz-game/quiz-game.component';
import { VuaTiengVietComponent } from './vua-tieng-viet/vua-tieng-viet.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PlaygroundComponent,
    QuizGameComponent,
    VuaTiengVietComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PlaygroundRoutingModule
  ]
})
export class PlaygroundModule { }
