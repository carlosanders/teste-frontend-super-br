import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {DesentranhamentoService} from '@cdk/services/desentranhamento.service';
import {CdkDesentranhamentoAutocompleteComponent} from './cdk-desentranhamento-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkDesentranhamentoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        DesentranhamentoService,
    ],
    exports: [
        CdkDesentranhamentoAutocompleteComponent
    ]
})
export class CdkDesentranhamentoAutocompleteModule {
}
