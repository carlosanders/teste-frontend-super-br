import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {CompartilhamentoService} from '@cdk/services/compartilhamento.service';
import {CdkCompartilhamentoAutocompleteComponent} from './cdk-compartilhamento-autocomplete.component';
import {PipesModule} from '../../../pipes/pipes.module';

@NgModule({
    declarations: [
        CdkCompartilhamentoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        CompartilhamentoService,
    ],
    exports: [
        CdkCompartilhamentoAutocompleteComponent
    ]
})
export class CdkCompartilhamentoAutocompleteModule {
}
