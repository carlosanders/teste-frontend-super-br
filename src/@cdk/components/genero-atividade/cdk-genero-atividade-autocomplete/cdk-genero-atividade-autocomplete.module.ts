import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
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

        CdkSharedModule,
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
