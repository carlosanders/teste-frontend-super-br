import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdkServidorEmailFormComponent} from './cdk-servidor-email-form.component';
import {CdkSharedModule} from '../../../shared.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {CdkServidorEmailGridsearchModule} from '../cdk-servidor-email-autocomplete/cdk-servidor-email-gridsearch/cdk-servidor-email-gridsearch.module';
import {MatIconModule} from '@cdk/angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatRadioModule} from '@angular/material/radio';


@NgModule({
    declarations: [CdkServidorEmailFormComponent],
    exports: [
        CdkServidorEmailFormComponent
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
        CdkServidorEmailGridsearchModule,
        MatIconModule,
        MatTooltipModule,
        MatRadioModule
    ]
})
export class CdkServidorEmailFormModule { }
