import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ClassificacaoService } from '@cdk/services/classificacao.service';
import {CdkClassificacaoAutocompleteComponent} from './cdk-classificacao-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkClassificacaoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        ClassificacaoService,
    ],
    exports: [
        CdkClassificacaoAutocompleteComponent
    ]
})
export class CdkClassificacaoAutocompleteModule {
}
