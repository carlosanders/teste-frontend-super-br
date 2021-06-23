import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {ModalidadeInteressadoService} from '@cdk/services/modalidade-interessado.service';
import {CdkModalidadeInteressadoAutocompleteComponent} from './cdk-modalidade-interessado-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkModalidadeInteressadoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        ModalidadeInteressadoService,
    ],
    exports: [
        CdkModalidadeInteressadoAutocompleteComponent
    ]
})
export class CdkModalidadeInteressadoAutocompleteModule {
}
