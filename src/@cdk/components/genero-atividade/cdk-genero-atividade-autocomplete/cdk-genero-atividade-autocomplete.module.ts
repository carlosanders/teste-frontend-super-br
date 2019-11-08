import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {GeneroAtividadeService} from '@cdk/services/genero-atividade.service';
import {CdkGeneroAtividadeAutocompleteComponent} from './cdk-genero-atividade-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkGeneroAtividadeAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        GeneroAtividadeService,
    ],
    exports: [
        CdkGeneroAtividadeAutocompleteComponent
    ]
})
export class CdkGeneroAtividadeAutocompleteModule {
}
