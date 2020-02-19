import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@cdk/angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeNotificacaoService } from '@cdk/services/modalidade-notificacao.service';
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

        FuseSharedModule,
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
