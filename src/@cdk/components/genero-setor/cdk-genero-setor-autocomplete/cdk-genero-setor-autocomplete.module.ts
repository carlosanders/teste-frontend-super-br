import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
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

        CdkSharedModule,
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
