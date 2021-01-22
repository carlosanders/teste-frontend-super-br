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
    MatRadioModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkValidacaoTransicaoWorkflowFormComponent} from './cdk-validacao-transicao-workflow-form.component';
import {CdkModeloAutocompleteModule} from '../../modelo/cdk-modelo-autocomplete/cdk-modelo-autocomplete.module';
import {CdkModeloGridsearchModule} from '../../modelo/cdk-modelo-autocomplete/cdk-modelo-gridsearch/cdk-modelo-gridsearch.module';
import { CdkTipoDocumentoAutocompleteModule } from '@cdk/components/tipo-documento/cdk-tipo-documento-autocomplete/cdk-tipo-documento-autocomplete.module';
import { CdkTipoDocumentoGridModule } from '@cdk/components/tipo-documento/cdk-tipo-documento-grid/cdk-tipo-documento-grid.module';
import { CdkTipoDocumentoGridsearchModule } from '@cdk/components/tipo-documento/cdk-tipo-documento-autocomplete/cdk-tipo-documento-gridsearch/cdk-tipo-documento-gridsearch.module';
import {CdkSetorAutocompleteModule} from '../../setor/cdk-setor-autocomplete/cdk-setor-autocomplete.module';
import {CdkSetorGridsearchModule} from '../../setor/cdk-setor-autocomplete/cdk-setor-gridsearch/cdk-setor-gridsearch.module';
import {CdkUsuarioAutocompleteModule} from '../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkUsuarioGridsearchModule} from '../../usuario/cdk-usuario-autocomplete/cdk-usuario-gridsearch/cdk-usuario-gridsearch.module';

@NgModule({
    declarations: [
        CdkValidacaoTransicaoWorkflowFormComponent,
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
        CdkModeloAutocompleteModule,
        CdkModeloGridsearchModule,
        CdkSetorAutocompleteModule,
        CdkSetorGridsearchModule,
        
        CdkUsuarioAutocompleteModule,
        CdkUsuarioGridsearchModule,
        CdkSharedModule,
    ],
    providers: [
    ],
    exports: [
        CdkValidacaoTransicaoWorkflowFormComponent
    ]
})
export class CdkValidacaoTransicaoWorkflowFormModule {
}
