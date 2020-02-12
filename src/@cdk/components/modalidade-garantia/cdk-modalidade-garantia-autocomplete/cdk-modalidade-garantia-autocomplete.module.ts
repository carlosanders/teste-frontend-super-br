import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeGarantiaService } from '@cdk/services/modalidade-garantia.service';
import {CdkModalidadeGarantiaAutocompleteComponent} from './cdk-modalidade-garantia-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkModalidadeGarantiaAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeGarantiaService,
    ],
    exports: [
        CdkModalidadeGarantiaAutocompleteComponent
    ]
})
export class CdkModalidadeGarantiaAutocompleteModule {
}
