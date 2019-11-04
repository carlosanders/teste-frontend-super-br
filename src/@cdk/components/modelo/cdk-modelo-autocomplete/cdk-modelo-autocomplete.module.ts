import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModeloService } from '@cdk/services/modelo.service';
import {CdkModeloAutocompleteComponent} from './cdk-modelo-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkModeloAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        ModeloService,
    ],
    exports: [
        CdkModeloAutocompleteComponent
    ]
})
export class CdkModeloAutocompleteModule {
}
