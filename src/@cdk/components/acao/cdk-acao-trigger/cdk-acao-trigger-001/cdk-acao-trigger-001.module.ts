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
import {CdkModeloAutocompleteModule} from '../../../modelo/cdk-modelo-autocomplete/cdk-modelo-autocomplete.module';
import {CdkModeloGridsearchModule} from '../../../modelo/cdk-modelo-autocomplete/cdk-modelo-gridsearch/cdk-modelo-gridsearch.module';
import {RouterModule} from '@angular/router';
import {CdkAcaoTrigger001Component} from "./cdk-acao-trigger-001.component";

@NgModule({
    declarations: [
        CdkAcaoTrigger001Component,
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

        CdkModeloAutocompleteModule,
        CdkModeloGridsearchModule,

        CdkSharedModule,
    ],
    exports: [
        CdkAcaoTrigger001Component
    ]
})
export class CdkAcaoTrigger001Module {
}
