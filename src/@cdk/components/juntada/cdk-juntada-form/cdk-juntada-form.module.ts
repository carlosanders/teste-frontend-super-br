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

} from '@cdk/angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {CdkJuntadaFormComponent} from './cdk-juntada-form.component';
import {SetorService} from '@cdk/services/setor.service';
import {VolumeService} from '@cdk/services/volume.service';
import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import {AtividadeService} from '@cdk/services/atividade.service';
import {TarefaService} from '@cdk/services/tarefa.service';
import {OrigemDadosService} from '@cdk/services/origem-dados.service';
import {DocumentoService} from '@cdk/services/documento.service';
import {CdkDocumentoAvulsoAutocompleteModule} from '../../documento-avulso/cdk-documento-avulso-autocomplete/cdk-documento-avulso-autocomplete.module';
import {CdkDocumentoGridsearchModule} from '../../documento/cdk-documento-autocomplete/cdk-documento-gridsearch/cdk-documento-gridsearch.module';
import {CdkDocumentoAvulsoGridsearchModule} from '../../documento-avulso/cdk-documento-avulso-autocomplete/cdk-documento-avulso-gridsearch/cdk-documento-avulso-gridsearch.module';
import {CdkOrigemDadosGridsearchModule} from '../../origem-dados/cdk-origem-dados-autocomplete/cdk-origem-dados-gridsearch/cdk-origem-dados-gridsearch.module';
import {CdkVolumeAutocompleteModule} from '../../volume/cdk-volume-autocomplete/cdk-volume-autocomplete.module';
import {CdkAtividadeGridsearchModule} from '../../atividade/cdk-atividade-autocomplete/cdk-atividade-gridsearch/cdk-atividade-gridsearch.module';
import {CdkDocumentoAutocompleteModule} from '../../documento/cdk-documento-autocomplete/cdk-documento-autocomplete.module';
import {CdkOrigemDadosAutocompleteModule} from '../../origem-dados/cdk-origem-dados-autocomplete/cdk-origem-dados-autocomplete.module';
import {CdkAtividadeAutocompleteModule} from '../../atividade/cdk-atividade-autocomplete/cdk-atividade-autocomplete.module';
import {CdkVolumeGridsearchModule} from '../../volume/cdk-volume-autocomplete/cdk-volume-gridsearch/cdk-volume-gridsearch.module';
import {CdkTarefaAutocompleteModule} from '../../tarefa/cdk-tarefa-autocomplete/cdk-tarefa-autocomplete.module';
import {CdkTarefaGridsearchModule} from '../../tarefa/cdk-tarefa-autocomplete/cdk-tarefa-gridsearch/cdk-tarefa-gridsearch.module';

@NgModule({
    declarations: [
        CdkJuntadaFormComponent,
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

        CdkDocumentoAutocompleteModule,
        CdkDocumentoGridsearchModule,
        CdkOrigemDadosAutocompleteModule,
        CdkOrigemDadosGridsearchModule,
        CdkVolumeAutocompleteModule,
        CdkVolumeGridsearchModule,
        CdkDocumentoAvulsoAutocompleteModule,
        CdkDocumentoAvulsoGridsearchModule,
        CdkAtividadeAutocompleteModule,
        CdkAtividadeGridsearchModule,
        CdkTarefaAutocompleteModule,
        CdkTarefaGridsearchModule,

        FuseSharedModule,
    ],
    providers: [
        DocumentoService,
        OrigemDadosService,
        VolumeService,
        SetorService,
        DocumentoAvulsoService,
        AtividadeService,
        TarefaService
    ],
    exports: [
        CdkJuntadaFormComponent
    ]
})
export class CdkJuntadaFormModule {
}
