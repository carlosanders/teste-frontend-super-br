import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {ModalidadeAfastamentoService} from '@cdk/services/modalidade-afastamento.service';
import {CdkModalidadeAfastamentoAutocompleteComponent} from './cdk-modalidade-afastamento-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkModalidadeAfastamentoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        ModalidadeAfastamentoService,
    ],
    exports: [
        CdkModalidadeAfastamentoAutocompleteComponent
    ]
})
export class CdkModalidadeAfastamentoAutocompleteModule {
}
