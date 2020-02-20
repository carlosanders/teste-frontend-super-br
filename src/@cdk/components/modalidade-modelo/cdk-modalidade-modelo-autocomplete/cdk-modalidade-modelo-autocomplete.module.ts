import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@cdk/angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeModeloService } from '@cdk/services/modalidade-modelo.service';
import {CdkModalidadeModeloAutocompleteComponent} from './cdk-modalidade-modelo-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkModalidadeModeloAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeModeloService,
    ],
    exports: [
        CdkModalidadeModeloAutocompleteComponent
    ]
})
export class CdkModalidadeModeloAutocompleteModule {
}
