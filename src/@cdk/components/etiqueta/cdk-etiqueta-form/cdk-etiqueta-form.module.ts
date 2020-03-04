import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatDatepickerModule

} from '@cdk/angular/material';

import { CdkSharedModule } from '@cdk/shared.module';
import { CdkEtiquetaFormComponent } from './cdk-etiqueta-form.component';
import {CdkModalidadeEtiquetaAutocompleteModule} from '../../modalidade-etiqueta/cdk-modalidade-etiqueta-autocomplete/cdk-modalidade-etiqueta-autocomplete.module';
import {CdkModalidadeEtiquetaGridsearchModule} from '../../modalidade-etiqueta/cdk-modalidade-etiqueta-autocomplete/cdk-modalidade-etiqueta-gridsearch/cdk-modalidade-etiqueta-gridsearch.module';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';
import {MccColorPickerModule} from 'material-community-components';

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
    ],
    providers: [

    ],
    exports: [
        CdkEtiquetaFormComponent
    ]
})
export class CdkEtiquetaFormModule {
}
