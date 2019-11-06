import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
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

        FuseSharedModule,
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
