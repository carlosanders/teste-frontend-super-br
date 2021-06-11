import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdkSharedModule} from '../../../shared.module';
import {CdkLoginDialogComponent} from './cdk-login-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {CdkLoginFormModule} from '../cdk-login-form/cdk-login-form.module';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@cdk/angular/material';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule, MatInputModule, MatProgressSpinnerModule, MatTooltipModule} from '../../../angular/material';
import {RouterModule} from '@angular/router';

@NgModule({
    declarations: [
        CdkLoginDialogComponent
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        MatDialogModule,
        MatRadioModule,
        MatProgressBarModule,

        CdkLoginFormModule,

        CommonModule,
        CdkSharedModule,
        RouterModule,
    ],
    entryComponents: [
        CdkLoginDialogComponent,
    ],
    exports: [
        CdkLoginDialogComponent
    ]
})
export class CdkLoginDialogModule {
}
