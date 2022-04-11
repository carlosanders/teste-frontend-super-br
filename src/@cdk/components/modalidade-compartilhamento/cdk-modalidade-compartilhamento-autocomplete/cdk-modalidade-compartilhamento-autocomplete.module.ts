import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {ModalidadeCompartilhamentoService} from '@cdk/services/modalidade-compartilhamento.service';
import {CdkModalidadeCompartilhamentoAutocompleteComponent} from './cdk-modalidade-compartilhamento-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkModalidadeCompartilhamentoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        ModalidadeCompartilhamentoService,
    ],
    exports: [
        CdkModalidadeCompartilhamentoAutocompleteComponent
    ]
})
export class CdkModalidadeCompartilhamentoAutocompleteModule {
}
