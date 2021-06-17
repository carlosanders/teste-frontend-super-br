import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {NotificacaoService} from '@cdk/services/notificacao.service';
import {CdkNotificacaoAutocompleteComponent} from './cdk-notificacao-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkNotificacaoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
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
