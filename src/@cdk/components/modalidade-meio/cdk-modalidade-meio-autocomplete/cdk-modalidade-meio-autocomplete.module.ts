import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeMeioService } from '@cdk/services/modalidade-meio.service';
import {CdkModalidadeMeioAutocompleteComponent} from './cdk-modalidade-meio-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkModalidadeMeioAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeMeioService,
    ],
    exports: [
        CdkModalidadeMeioAutocompleteComponent
    ]
})
export class CdkModalidadeMeioAutocompleteModule {
}
