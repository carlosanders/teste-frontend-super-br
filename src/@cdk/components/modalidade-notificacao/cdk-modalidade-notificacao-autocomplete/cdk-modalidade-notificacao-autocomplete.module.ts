import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {ModalidadeNotificacaoService} from '@cdk/services/modalidade-notificacao.service';
import {CdkModalidadeNotificacaoAutocompleteComponent} from './cdk-modalidade-notificacao-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkModalidadeNotificacaoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        ModalidadeNotificacaoService,
    ],
    exports: [
        CdkModalidadeNotificacaoAutocompleteComponent
    ]
})
export class CdkModalidadeNotificacaoAutocompleteModule {
}
