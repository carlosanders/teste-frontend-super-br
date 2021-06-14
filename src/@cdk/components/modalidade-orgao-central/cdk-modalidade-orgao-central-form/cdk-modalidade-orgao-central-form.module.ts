import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdkModalidadeOrgaoCentralFormComponent} from './cdk-modalidade-orgao-central-form.component';
import {CdkSharedModule} from '../../../shared.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatIconModule} from '@cdk/angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CdkModalidadeOrgaoCentralGridsearchModule} from '../cdk-modalidade-orgao-central-autocomplete/cdk-modalidade-orgao-central-gridsearch/cdk-modalidade-orgao-central-gridsearch.module';


@NgModule({
    declarations: [CdkModalidadeOrgaoCentralFormComponent],
    exports: [
        CdkModalidadeOrgaoCentralFormComponent
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
        MatIconModule,
        MatTooltipModule,
        CdkModalidadeOrgaoCentralGridsearchModule,
    ]
})
export class CdkModalidadeOrgaoCentralFormModule { }
