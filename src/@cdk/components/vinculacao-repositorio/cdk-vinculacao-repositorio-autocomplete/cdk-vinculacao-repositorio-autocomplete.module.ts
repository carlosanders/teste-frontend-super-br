import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {VinculacaoRepositorioService} from '@cdk/services/vinculacao-repositorio.service';
import {CdkVinculacaoRepositorioAutocompleteComponent} from './cdk-vinculacao-repositorio-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkVinculacaoRepositorioAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        VinculacaoRepositorioService,
    ],
    exports: [
        CdkVinculacaoRepositorioAutocompleteComponent
    ]
})
export class CdkVinculacaoRepositorioAutocompleteModule {
}
