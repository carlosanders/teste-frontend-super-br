import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {GrupoContatoService} from '@cdk/services/grupo-contato.service';
import {CdkGrupoContatoAutocompleteComponent} from './cdk-grupo-contato-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkGrupoContatoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        GrupoContatoService,
    ],
    exports: [
        CdkGrupoContatoAutocompleteComponent
    ]
})
export class CdkGrupoContatoAutocompleteModule {
}
