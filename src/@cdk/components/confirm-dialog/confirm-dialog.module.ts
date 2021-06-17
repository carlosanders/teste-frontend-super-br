import {NgModule} from '@angular/core';
import {MatButtonModule, MatDialogModule} from '@cdk/angular/material';

import {CdkConfirmDialogComponent} from './confirm-dialog.component';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [
        CdkConfirmDialogComponent
    ],
    imports: [
        MatDialogModule,
        MatButtonModule,
        CommonModule
    ],
    entryComponents: [
        CdkConfirmDialogComponent
    ],
})
export class CdkConfirmDialogModule
{
}
