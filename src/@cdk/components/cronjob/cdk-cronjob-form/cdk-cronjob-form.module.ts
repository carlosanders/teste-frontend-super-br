import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkCronjobFormComponent} from './cdk-cronjob-form.component';
import {
    CdkLogentryGridsearchModule
} from '../../logentry/cdk-logentry-grid/cdk-logentry-gridsearch/cdk-logentry-gridsearch.module';
import {CdkCronjobExpressionParserService} from '../service/cdk-cronjob-expression-parser.service';

@NgModule({
    declarations: [
        CdkCronjobFormComponent,
    ],
    imports: [
        MatAutocompleteModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        CdkSharedModule,
        CdkLogentryGridsearchModule,
    ],
    providers: [
        CdkCronjobExpressionParserService
    ],
    exports: [
        CdkCronjobFormComponent
    ]
})
export class CdkCronjobFormModule {
}
