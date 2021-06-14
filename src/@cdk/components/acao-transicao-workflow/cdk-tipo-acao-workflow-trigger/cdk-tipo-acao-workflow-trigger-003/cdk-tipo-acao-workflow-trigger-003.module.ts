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
import {CommonModule} from '@angular/common';
import {CdkSharedModule} from '@cdk/shared.module';
import {RouterModule} from '@angular/router';
import {CdkTipoAcaoWorkflowTrigger003Component} from './cdk-tipo-acao-workflow-trigger-003.component';
import {CdkCompartilhamentoFormModule} from '../../../compartilhamento/cdk-compartilhamento-form/cdk-compartilhamento-form.module';

@NgModule({
    declarations: [
        CdkTipoAcaoWorkflowTrigger003Component,
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
        RouterModule,
        CommonModule,

        CdkCompartilhamentoFormModule,
        CdkSharedModule,
    ],
    exports: [
        CdkTipoAcaoWorkflowTrigger003Component
    ]
})
export class CdkTipoAcaoWorkflowTrigger003Module {
}
