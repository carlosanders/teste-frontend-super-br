import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdkContaEmailFormComponent} from './cdk-conta-email-form.component';
import {CdkSharedModule} from '../../../shared.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {CdkContaEmailGridsearchModule} from '../cdk-conta-email-autocomplete/cdk-conta-email-gridsearch/cdk-conta-email-gridsearch.module';
import {MatIconModule} from '@cdk/angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatRadioModule} from '@angular/material/radio';
import {CdkServidorEmailAutocompleteModule} from '../../servidor-email/cdk-servidor-email-autocomplete/cdk-servidor-email-autocomplete.module';
import {CdkServidorEmailGridsearchModule} from '../../servidor-email/cdk-servidor-email-autocomplete/cdk-servidor-email-gridsearch/cdk-servidor-email-gridsearch.module';


@NgModule({
    declarations: [CdkContaEmailFormComponent],
    exports: [
        CdkContaEmailFormComponent
    ],
    imports: [
        CommonModule,
        CdkSharedModule,
        MatFormFieldModule,
        MatInputModule,
        NgxUpperCaseDirectiveModule,
        MatCheckboxModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatAutocompleteModule,
        CdkContaEmailGridsearchModule,
        MatIconModule,
        MatTooltipModule,
        MatRadioModule,
        CdkServidorEmailAutocompleteModule,
        CdkServidorEmailGridsearchModule
    ]
})
export class CdkContaEmailFormModule { }
