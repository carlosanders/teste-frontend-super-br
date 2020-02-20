import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@cdk/angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {TransicaoService} from '@cdk/services/transicao.service';
import {CdkTransicaoAutocompleteComponent} from './cdk-transicao-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkTransicaoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        TransicaoService,
    ],
    exports: [
        CdkTransicaoAutocompleteComponent
    ]
})
export class CdkTransicaoAutocompleteModule {
}
