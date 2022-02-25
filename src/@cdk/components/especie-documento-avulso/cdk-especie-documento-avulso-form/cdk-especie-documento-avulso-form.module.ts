import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdkEspecieDocumentoAvulsoFormComponent} from './cdk-especie-documento-avulso-form.component';
import {CdkSharedModule} from '@cdk/shared.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {CdkEspecieTarefaGridsearchModule} from '@cdk/components/especie-tarefa/cdk-especie-tarefa-autocomplete/cdk-especie-tarefa-gridsearch/cdk-especie-tarefa-gridsearch.module';
import {MatIconModule} from '@cdk/angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {
    CdkEspecieTarefaAutocompleteModule
} from '../../especie-tarefa/cdk-especie-tarefa-autocomplete/cdk-especie-tarefa-autocomplete.module';
import {
    CdkEspecieProcessoGridsearchModule
} from '../../especie-processo/cdk-especie-processo-autocomplete/cdk-especie-processo-gridsearch/cdk-especie-processo-gridsearch.module';
import {
    CdkEspecieProcessoAutocompleteModule
} from '../../especie-processo/cdk-especie-processo-autocomplete/cdk-especie-processo-autocomplete.module';
import {
    CdkGeneroDocumentoAvulsoGridsearchModule
} from '../../genero-documento-avulso/cdk-genero-documento-avulso-autocomplete/cdk-genero-documento-avulso-gridsearch/cdk-genero-documento-avulso-gridsearch.module';
import {
    CdkGeneroDocumentoAvulsoAutocompleteModule
} from '../../genero-documento-avulso/cdk-genero-documento-avulso-autocomplete/cdk-genero-documento-avulso-autocomplete.module';
import {CdkWorkflowAutocompleteModule} from '../../workflow/cdk-workflow-autocomplete/cdk-workflow-autocomplete.module';
import {
    CdkWorkflowGridsearchModule
} from '../../workflow/cdk-workflow-autocomplete/cdk-workflow-gridsearch/cdk-workflow-gridsearch.module';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
    declarations: [CdkEspecieDocumentoAvulsoFormComponent],
    exports: [
        CdkEspecieDocumentoAvulsoFormComponent
    ],
    imports: [
        CommonModule,
        CdkSharedModule,
        MatFormFieldModule,
        MatInputModule,
        NgxUpperCaseDirectiveModule,
        MatCheckboxModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatAutocompleteModule,
        CdkEspecieTarefaGridsearchModule,
        CdkEspecieTarefaAutocompleteModule,
        CdkEspecieProcessoGridsearchModule,
        CdkEspecieProcessoAutocompleteModule,
        CdkGeneroDocumentoAvulsoGridsearchModule,
        CdkGeneroDocumentoAvulsoAutocompleteModule,
        MatIconModule,
        MatTooltipModule,
        CdkWorkflowAutocompleteModule,
        CdkWorkflowGridsearchModule,
        MatSelectModule
    ]
})
export class CdkEspecieDocumentoAvulsoFormModule { }
