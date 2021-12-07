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
    MatSlideToggleModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
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
import {CdkVolumeAutocompleteModule} from '../../volume/cdk-volume-autocomplete/cdk-volume-autocomplete.module';
import {CdkAtividadeGridsearchModule} from '../../atividade/cdk-atividade-autocomplete/cdk-atividade-gridsearch/cdk-atividade-gridsearch.module';
import {CdkDocumentoAutocompleteModule} from '../../documento/cdk-documento-autocomplete/cdk-documento-autocomplete.module';
import {CdkAtividadeAutocompleteModule} from '../../atividade/cdk-atividade-autocomplete/cdk-atividade-autocomplete.module';
import {CdkVolumeGridsearchModule} from '../../volume/cdk-volume-autocomplete/cdk-volume-gridsearch/cdk-volume-gridsearch.module';
import {CdkTarefaAutocompleteModule} from '../../tarefa/cdk-tarefa-autocomplete/cdk-tarefa-autocomplete.module';
import {CdkTarefaGridsearchModule} from '../../tarefa/cdk-tarefa-autocomplete/cdk-tarefa-gridsearch/cdk-tarefa-gridsearch.module';
import {CdkLogentryGridsearchModule} from '../../logentry/cdk-logentry-grid/cdk-logentry-gridsearch/cdk-logentry-gridsearch.module';

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
        MatTooltipModule,

        CdkDocumentoAutocompleteModule,
        CdkDocumentoGridsearchModule,
        CdkVolumeAutocompleteModule,
        CdkVolumeGridsearchModule,
        CdkDocumentoAvulsoAutocompleteModule,
        CdkDocumentoAvulsoGridsearchModule,
        CdkAtividadeAutocompleteModule,
        CdkAtividadeGridsearchModule,
        CdkTarefaAutocompleteModule,
        CdkTarefaGridsearchModule,

        CdkSharedModule,
        CdkLogentryGridsearchModule,
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
