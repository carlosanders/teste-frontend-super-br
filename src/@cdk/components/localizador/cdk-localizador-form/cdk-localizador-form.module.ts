import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatAutocompleteModule
} from '@cdk/angular/material';

import { CdkSharedModule } from '@cdk/shared.module';
import { CdkLocalizadorFormComponent } from './cdk-localizador-form.component';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';
import {CdkSetorGridsearchModule} from '../../setor/cdk-setor-autocomplete/cdk-setor-gridsearch/cdk-setor-gridsearch.module';
import {CdkSetorAutocompleteModule} from '../../setor/cdk-setor-autocomplete/cdk-setor-autocomplete.module';
@NgModule({
    declarations: [
        CdkLocalizadorFormComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        NgxUpperCaseDirectiveModule,
        CdkSharedModule,
        MatAutocompleteModule,
        CdkSetorAutocompleteModule,
        CdkSetorGridsearchModule,
    ],
    providers: [

    ],
    exports: [
        CdkLocalizadorFormComponent
    ]
})
export class CdkLocalizadorFormModule {
}
