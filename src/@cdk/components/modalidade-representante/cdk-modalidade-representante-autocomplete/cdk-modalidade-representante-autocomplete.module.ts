import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeRepresentanteService } from '@cdk/services/modalidade-representante.service';
import {CdkModalidadeRepresentanteAutocompleteComponent} from './cdk-modalidade-representante-autocomplete.component';
import {PipesModule} from '../../../pipes/pipes.module';

@NgModule({
    declarations: [
        CdkModalidadeRepresentanteAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeRepresentanteService,
    ],
    exports: [
        CdkModalidadeRepresentanteAutocompleteComponent
    ]
})
export class CdkModalidadeRepresentanteAutocompleteModule {
}
