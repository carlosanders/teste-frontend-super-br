import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {GeneroSetorService} from '@cdk/services/genero-setor.service';
import {CdkGeneroSetorAutocompleteComponent} from './cdk-genero-setor-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkGeneroSetorAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        GeneroSetorService,
    ],
    exports: [
        CdkGeneroSetorAutocompleteComponent
    ]
})
export class CdkGeneroSetorAutocompleteModule {
}
