import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {RepositorioService} from '@cdk/services/repositorio.service';
import {CdkRepositorioAutocompleteComponent} from './cdk-repositorio-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkRepositorioAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        RepositorioService,
    ],
    exports: [
        CdkRepositorioAutocompleteComponent
    ]
})
export class CdkRepositorioAutocompleteModule {
}
