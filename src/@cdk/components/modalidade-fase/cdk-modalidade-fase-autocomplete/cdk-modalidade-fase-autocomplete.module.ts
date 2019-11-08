import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeFaseService } from '@cdk/services/modalidade-fase.service';
import {CdkModalidadeFaseAutocompleteComponent} from './cdk-modalidade-fase-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkModalidadeFaseAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeFaseService,
    ],
    exports: [
        CdkModalidadeFaseAutocompleteComponent
    ]
})
export class CdkModalidadeFaseAutocompleteModule {
}
