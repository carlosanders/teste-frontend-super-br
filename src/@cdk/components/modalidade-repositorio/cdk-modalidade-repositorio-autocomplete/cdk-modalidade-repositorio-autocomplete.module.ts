import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {ModalidadeRepositorioService} from '@cdk/services/modalidade-repositorio.service';
import {CdkModalidadeRepositorioAutocompleteComponent} from './cdk-modalidade-repositorio-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkModalidadeRepositorioAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        ModalidadeRepositorioService,
    ],
    exports: [
        CdkModalidadeRepositorioAutocompleteComponent
    ]
})
export class CdkModalidadeRepositorioAutocompleteModule {
}
