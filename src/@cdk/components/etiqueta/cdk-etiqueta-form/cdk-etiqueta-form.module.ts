import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule
} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkEtiquetaFormComponent} from './cdk-etiqueta-form.component';
import {CdkModalidadeEtiquetaAutocompleteModule} from '../../modalidade-etiqueta/cdk-modalidade-etiqueta-autocomplete/cdk-modalidade-etiqueta-autocomplete.module';
import {CdkModalidadeEtiquetaGridsearchModule} from '../../modalidade-etiqueta/cdk-modalidade-etiqueta-autocomplete/cdk-modalidade-etiqueta-gridsearch/cdk-modalidade-etiqueta-gridsearch.module';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';
import {MccColorPickerModule} from 'material-community-components/color-picker';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';

@NgModule({
    declarations: [
        CdkEtiquetaFormComponent,
    ],
    imports: [
        MatAutocompleteModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,

        NgxUpperCaseDirectiveModule,
        MccColorPickerModule.forRoot({
            used_colors: ['#000000', '#123456', '#777666']
        }),

        CdkModalidadeEtiquetaAutocompleteModule,
        CdkModalidadeEtiquetaGridsearchModule,

        CdkSharedModule,
        MatRadioModule,
        MatCardModule,
    ],
    providers: [],
    exports: [
        CdkEtiquetaFormComponent
    ]
})
export class CdkEtiquetaFormModule {
}
