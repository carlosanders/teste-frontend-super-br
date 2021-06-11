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
import {CdkAcaoTrigger004Component} from './cdk-acao-trigger-004.component';
import {CdkCompartilhamentoFormModule} from '../../../compartilhamento/cdk-compartilhamento-form/cdk-compartilhamento-form.module';
import {CdkDocumentoAvulsoFormModule} from '../../../documento-avulso/cdk-documento-avulso-form/cdk-documento-avulso-form.module';

// @ts-ignore
@NgModule({
    declarations: [
        CdkAcaoTrigger004Component,
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

        CdkDocumentoAvulsoFormModule
    ],
    exports: [
        CdkAcaoTrigger004Component
    ]
})
export class CdkAcaoTrigger004Module {
}
