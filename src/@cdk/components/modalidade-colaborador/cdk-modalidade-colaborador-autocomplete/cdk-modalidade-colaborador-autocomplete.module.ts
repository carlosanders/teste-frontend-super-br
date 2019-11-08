import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeColaboradorService } from '@cdk/services/modalidade-colaborador.service';
import {CdkModalidadeColaboradorAutocompleteComponent} from './cdk-modalidade-colaborador-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkModalidadeColaboradorAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeColaboradorService,
    ],
    exports: [
        CdkModalidadeColaboradorAutocompleteComponent
    ]
})
export class CdkModalidadeColaboradorAutocompleteModule {
}
