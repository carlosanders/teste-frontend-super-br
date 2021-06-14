import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {MatButtonModule, MatIconModule, MatProgressBarModule} from '@cdk/angular/material';

import {CdkProgressBarComponent} from './progress-bar.component';

@NgModule({
    declarations: [
        CdkProgressBarComponent
    ],
    imports     : [
        CommonModule,
        RouterModule,

        MatButtonModule,
        MatIconModule,
        MatProgressBarModule
    ],
    exports     : [
        CdkProgressBarComponent
    ]
})
export class CdkProgressBarModule
{
}
