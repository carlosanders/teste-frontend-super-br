import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatDatepickerModule, MatSlideToggleModule

} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {CdkSigiloFormComponent} from './cdk-sigilo-form.component';
import {CdkProcessoAutocompleteModule} from '../../processo/cdk-processo-autocomplete/cdk-processo-autocomplete.module';
import {CdkProcessoGridsearchModule} from '../../processo/cdk-processo-autocomplete/cdk-processo-gridsearch/cdk-processo-gridsearch.module';
import {ProcessoService} from '../../../services/processo.service';
import {CdkModalidadeCategoriaSigiloAutocompleteModule} from '../../modalidade-categoria-sigilo/cdk-modalidade-categoria-sigilo-autocomplete/cdk-modalidade-categoria-sigilo-autocomplete.module';
import {CdkDocumentoGridsearchModule} from '../../documento/cdk-documento-autocomplete/cdk-documento-gridsearch/cdk-documento-gridsearch.module';
import {CdkOrigemDadosGridsearchModule} from '../../origem-dados/cdk-origem-dados-autocomplete/cdk-origem-dados-gridsearch/cdk-origem-dados-gridsearch.module';
import {CdkDocumentoAutocompleteModule} from '../../documento/cdk-documento-autocomplete/cdk-documento-autocomplete.module';
import {CdkOrigemDadosAutocompleteModule} from '../../origem-dados/cdk-origem-dados-autocomplete/cdk-origem-dados-autocomplete.module';
import {CdkTipoSigiloAutocompleteModule} from '../../tipo-sigilo/cdk-tipo-sigilo-autocomplete/cdk-tipo-sigilo-autocomplete.module';
import {CdkModalidadeCategoriaSigiloGridsearchModule} from '../../modalidade-categoria-sigilo/cdk-modalidade-categoria-sigilo-autocomplete/cdk-modalidade-categoria-sigilo-gridsearch/cdk-modalidade-categoria-sigilo-gridsearch.module';
import {CdkTipoSigiloGridsearchModule} from '../../tipo-sigilo/cdk-tipo-sigilo-autocomplete/cdk-tipo-sigilo-gridsearch/cdk-tipo-sigilo-gridsearch.module';
import {ModalidadeCategoriaSigiloService} from '../../../services/modalidade-categoria-sigilo.service';
import {TipoSigiloService} from '../../../services/tipo-sigilo.service';
import {DocumentoService} from '../../../services/documento.service';
import {OrigemDadosService} from '../../../services/origem-dados.service';

@NgModule({
    declarations: [
        CdkSigiloFormComponent,
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

        CdkProcessoAutocompleteModule,
        CdkProcessoGridsearchModule,
        CdkModalidadeCategoriaSigiloAutocompleteModule,
        CdkModalidadeCategoriaSigiloGridsearchModule,
        CdkTipoSigiloAutocompleteModule,
        CdkTipoSigiloGridsearchModule,
        CdkDocumentoAutocompleteModule,
        CdkDocumentoGridsearchModule,
        CdkOrigemDadosAutocompleteModule,
        CdkOrigemDadosGridsearchModule,

        FuseSharedModule,
    ],
    providers: [
        ProcessoService,
        ModalidadeCategoriaSigiloService,
        TipoSigiloService,
        DocumentoService,
        OrigemDadosService
    ],
    exports: [
        CdkSigiloFormComponent
    ]
})
export class CdkSigiloFormModule {
}
