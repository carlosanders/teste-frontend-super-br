import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkLoginFormComponent} from './cdk-login-form.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {RouterModule} from '@angular/router';

@NgModule({
    declarations: [
        CdkLoginFormComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTooltipModule,

        CdkSharedModule,
        MatRadioModule,
        MatProgressBarModule,
        RouterModule,
    ],
    providers: [],
    exports: [
        CdkLoginFormComponent
    ]
})
export class CdkLoginFormModule {
}
