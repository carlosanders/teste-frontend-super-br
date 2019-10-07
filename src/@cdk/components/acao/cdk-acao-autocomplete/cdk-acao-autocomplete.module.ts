import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { AcaoService } from '@cdk/services/acao.service';
import {CdkAcaoAutocompleteComponent} from './cdk-acao-autocomplete.component';
import {PipesModule} from '../../../pipes/pipes.module';

@NgModule({
    declarations: [
        CdkAcaoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        AcaoService,
    ],
    exports: [
        CdkAcaoAutocompleteComponent
    ]
})
export class CdkAcaoAutocompleteModule {
}
