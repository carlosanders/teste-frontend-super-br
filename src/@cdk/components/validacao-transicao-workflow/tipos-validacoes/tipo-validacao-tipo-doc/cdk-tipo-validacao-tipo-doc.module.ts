import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkTipoValidacaoTipoDocComponent} from './cdk-tipo-validacao-tipo-doc.component';
import {CdkTipoDocumentoAutocompleteModule} from '@cdk/components/tipo-documento/cdk-tipo-documento-autocomplete/cdk-tipo-documento-autocomplete.module';
import {CdkTipoDocumentoGridModule} from '@cdk/components/tipo-documento/cdk-tipo-documento-grid/cdk-tipo-documento-grid.module';
import {CdkTipoDocumentoGridsearchModule} from '@cdk/components/tipo-documento/cdk-tipo-documento-autocomplete/cdk-tipo-documento-gridsearch/cdk-tipo-documento-gridsearch.module';


@NgModule({
    declarations: [
        CdkTipoValidacaoTipoDocComponent,
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
        MatRadioModule,
        MatTooltipModule,
        CdkTipoDocumentoAutocompleteModule,
        CdkTipoDocumentoGridModule,
        CdkTipoDocumentoGridsearchModule,
        CdkSharedModule,
    ],
    providers: [
    ],
    exports: [
        CdkTipoValidacaoTipoDocComponent
    ]
})
export class CdkTipoValidacaoTipoDocModule {
}
