import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SnackBarDesfazerComponent} from './snack-bar-desfazer.component';
import {MatIconModule} from '@cdk/angular/material';
import {FlexModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
    declarations: [SnackBarDesfazerComponent],
    imports: [
        CommonModule,
        MatIconModule,
        FlexModule,
        MatButtonModule,
        MatProgressBarModule
    ],
    entryComponents: [
        SnackBarDesfazerComponent
    ]
})
export class SnackBarDesfazerModule {
}
