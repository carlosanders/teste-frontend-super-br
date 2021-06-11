import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
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

        CdkSharedModule,
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
