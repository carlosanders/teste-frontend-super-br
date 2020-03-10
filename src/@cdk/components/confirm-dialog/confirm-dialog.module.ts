import { NgModule } from '@angular/core';
import { MatButtonModule } from '@cdk/angular/material';
import { MatDialogModule } from '@cdk/angular/material';

import { CdkConfirmDialogComponent } from '@cdk/components/confirm-dialog/confirm-dialog.component';

@NgModule({
    declarations: [
        CdkConfirmDialogComponent
    ],
    imports: [
        MatDialogModule,
        MatButtonModule
    ],
    entryComponents: [
        CdkConfirmDialogComponent
    ],
})
export class CdkConfirmDialogModule
{
}