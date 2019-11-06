import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeOrgaoCentralService } from '@cdk/services/modalidade-orgao-central.service';
import {CdkModalidadeOrgaoCentralAutocompleteComponent} from './cdk-modalidade-orgao-central-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkModalidadeOrgaoCentralAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeOrgaoCentralService,
    ],
    exports: [
        CdkModalidadeOrgaoCentralAutocompleteComponent
    ]
})
export class CdkModalidadeOrgaoCentralAutocompleteModule {
}
