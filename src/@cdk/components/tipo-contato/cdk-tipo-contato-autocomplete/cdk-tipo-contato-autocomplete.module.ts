import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {TipoContatoService} from '@cdk/services/tipo-contato.service';
import {CdkTipoContatoAutocompleteComponent} from './cdk-tipo-contato-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkTipoContatoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        TipoContatoService,
    ],
    exports: [
        CdkTipoContatoAutocompleteComponent
    ]
})
export class CdkTipoContatoAutocompleteModule {
}
