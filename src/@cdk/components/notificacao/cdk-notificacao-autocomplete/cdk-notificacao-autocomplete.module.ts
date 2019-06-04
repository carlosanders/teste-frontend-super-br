import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {NotificacaoService} from '@cdk/services/notificacao.service';
import {CdkNotificacaoAutocompleteComponent} from './cdk-notificacao-autocomplete.component';
import {PipesModule} from '../../../pipes/pipes.module';

@NgModule({
    declarations: [
        CdkNotificacaoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        NotificacaoService,
    ],
    exports: [
        CdkNotificacaoAutocompleteComponent
    ]
})
export class CdkNotificacaoAutocompleteModule {
}
