import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatDatepickerModule, MatSlideToggleModule, MatTooltipModule

} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {CdkSigiloFormComponent} from './cdk-sigilo-form.component';
import {ProcessoService} from '../../../services/processo.service';
import {CdkModalidadeCategoriaSigiloAutocompleteModule} from '../../modalidade-categoria-sigilo/cdk-modalidade-categoria-sigilo-autocomplete/cdk-modalidade-categoria-sigilo-autocomplete.module';
import {CdkTipoSigiloAutocompleteModule} from '../../tipo-sigilo/cdk-tipo-sigilo-autocomplete/cdk-tipo-sigilo-autocomplete.module';
import {CdkModalidadeCategoriaSigiloGridsearchModule} from '../../modalidade-categoria-sigilo/cdk-modalidade-categoria-sigilo-autocomplete/cdk-modalidade-categoria-sigilo-gridsearch/cdk-modalidade-categoria-sigilo-gridsearch.module';
import {CdkTipoSigiloGridsearchModule} from '../../tipo-sigilo/cdk-tipo-sigilo-autocomplete/cdk-tipo-sigilo-gridsearch/cdk-tipo-sigilo-gridsearch.module';
import {ModalidadeCategoriaSigiloService} from '../../../services/modalidade-categoria-sigilo.service';
import {TipoSigiloService} from '../../../services/tipo-sigilo.service';
import {DocumentoService} from '../../../services/documento.service';
import {OrigemDadosService} from '../../../services/origem-dados.service';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';

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

        NgxUpperCaseDirectiveModule,

        CdkModalidadeCategoriaSigiloAutocompleteModule,
        CdkModalidadeCategoriaSigiloGridsearchModule,
        CdkTipoSigiloAutocompleteModule,
        CdkTipoSigiloGridsearchModule,

        FuseSharedModule,
        MatTooltipModule,
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
