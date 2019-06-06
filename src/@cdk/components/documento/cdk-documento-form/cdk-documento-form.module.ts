import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatTabsModule,
    MatTableModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {TipoDocumentoService} from '@cdk/services/tipo-documento.service';
import {CdkDocumentoFormComponent} from './cdk-documento-form.component';
import {CdkTipoDocumentoAutocompleteModule} from '@cdk/components/tipo-documento/cdk-tipo-documento-autocomplete/cdk-tipo-documento-autocomplete.module';
import {CdkTipoDocumentoGridsearchModule} from '@cdk/components/tipo-documento/cdk-tipo-documento-autocomplete/cdk-tipo-documento-gridsearch/cdk-tipo-documento-gridsearch.module';
import {CdkSetorAutocompleteModule} from '../../setor/cdk-setor-autocomplete/cdk-setor-autocomplete.module';
import {CdkSetorGridsearchModule} from '../../setor/cdk-setor-autocomplete/cdk-setor-gridsearch/cdk-setor-gridsearch.module';
import {CdkPessoaAutocompleteModule} from '../../pessoa/cdk-pessoa-autocomplete/cdk-pessoa-autocomplete.module';
import {CdkPessoaGridsearchModule} from '../../pessoa/cdk-pessoa-autocomplete/cdk-pessoa-gridsearch/cdk-pessoa-gridsearch.module';
import {CdkProcessoAutocompleteModule} from '../../processo/cdk-processo-autocomplete/cdk-processo-autocomplete.module';
import {CdkProcessoGridsearchModule} from '../../processo/cdk-processo-autocomplete/cdk-processo-gridsearch/cdk-processo-gridsearch.module';
import {CdkComponenteDigitalGridModule} from '../../componente-digital/cdk-componente-digital-grid/cdk-componente-digital-grid.module';
import {CdkComponenteDigitalGridsearchModule} from '../../componente-digital/cdk-componente-digital-autocomplete/cdk-componente-digital-gridsearch/cdk-componente-digital-gridsearch.module';
import {CdkComponenteDigitalAutocompleteModule} from '../../componente-digital/cdk-componente-digital-autocomplete/cdk-componente-digital-autocomplete.module';

@NgModule({
    declarations: [
        CdkDocumentoFormComponent,
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
        MatSlideToggleModule,
        MatRadioModule,
        MatTabsModule,
        MatTableModule,

        CdkTipoDocumentoAutocompleteModule,
        CdkTipoDocumentoGridsearchModule,
        CdkSetorAutocompleteModule,
        CdkSetorGridsearchModule,
        CdkPessoaAutocompleteModule,
        CdkPessoaGridsearchModule,
        CdkProcessoAutocompleteModule,
        CdkProcessoGridsearchModule,
        CdkPessoaAutocompleteModule,
        CdkPessoaGridsearchModule,
        CdkComponenteDigitalAutocompleteModule,
        CdkComponenteDigitalGridsearchModule,
        CdkComponenteDigitalGridModule,

        FuseSharedModule,
    ],
    providers: [
        TipoDocumentoService,
    ],
    exports: [
        CdkDocumentoFormComponent
    ]
})
export class CdkDocumentoFormModule {
}
