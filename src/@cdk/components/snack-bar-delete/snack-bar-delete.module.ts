import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackBarDeleteComponent } from './snack-bar-delete.component';
import {MatIconModule} from '@angular/material/icon';
import {FlexModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';



@NgModule({
  declarations: [SnackBarDeleteComponent],
    imports: [
        CommonModule,
        MatIconModule,
        FlexModule,
        MatButtonModule,
        MatProgressBarModule
    ],
    entryComponents: [
        SnackBarDeleteComponent
    ]
})
export class SnackBarDeleteModule { }
