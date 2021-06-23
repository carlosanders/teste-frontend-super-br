import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {ContatoService} from '@cdk/services/contato.service';
import {CdkContatoAutocompleteComponent} from './cdk-contato-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkContatoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        ContatoService,
    ],
    exports: [
        CdkContatoAutocompleteComponent
    ]
})
export class CdkContatoAutocompleteModule {
}
