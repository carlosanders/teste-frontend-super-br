import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {ModalidadeAcaoEtiquetaService} from '@cdk/services/modalidade-acao-etiqueta.service';
import {CdkModalidadeAcaoEtiquetaAutocompleteComponent} from './cdk-modalidade-acao-etiqueta-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkModalidadeAcaoEtiquetaAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        ModalidadeAcaoEtiquetaService,
    ],
    exports: [
        CdkModalidadeAcaoEtiquetaAutocompleteComponent
    ]
})
export class CdkModalidadeAcaoEtiquetaAutocompleteModule {
}
