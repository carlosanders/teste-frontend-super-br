import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@cdk/angular/material';
import { MatIconModule } from '@cdk/angular/material';
import { MatProgressBarModule } from '@cdk/angular/material';

import { FuseProgressBarComponent } from './progress-bar.component';

@NgModule({
    declarations: [
        FuseProgressBarComponent
    ],
    imports     : [
        CommonModule,
        RouterModule,

        MatButtonModule,
        MatIconModule,
        MatProgressBarModule
    ],
    exports     : [
        FuseProgressBarComponent
    ]
})
export class FuseProgressBarModule
{
}
