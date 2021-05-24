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
import { CommonModule } from '@angular/common';
import {CdkSharedModule} from '@cdk/shared.module';
import {RouterModule} from '@angular/router';
import {CdkAcaoTrigger003Component} from './cdk-acao-trigger-003.component';
import {CdkCompartilhamentoFormModule} from '../../../compartilhamento/cdk-compartilhamento-form/cdk-compartilhamento-form.module';

// @ts-ignore
@NgModule({
    declarations: [
        CdkAcaoTrigger003Component,
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
        CdkAcaoTrigger003Component
    ]
})
export class CdkAcaoTrigger003Module {
}
