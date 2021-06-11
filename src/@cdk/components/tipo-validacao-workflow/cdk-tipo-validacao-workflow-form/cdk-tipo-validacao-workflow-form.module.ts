import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdkTipoValidacaoWorkflowFormComponent} from './cdk-tipo-validacao-workflow-form.component';
import {CdkSharedModule} from '../../../shared.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {CdkGeneroProcessoAutocompleteModule} from '../../genero-processo/cdk-genero-processo-autocomplete/cdk-genero-processo-autocomplete.module';
import {MatIconModule} from '@cdk/angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
    declarations: [CdkTipoValidacaoWorkflowFormComponent],
    exports: [
        CdkTipoValidacaoWorkflowFormComponent
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
        CdkGeneroProcessoAutocompleteModule,
        MatIconModule,
        MatTooltipModule
    ]
})
export class CdkTipoValidacaoWorkflowFormModule { }
