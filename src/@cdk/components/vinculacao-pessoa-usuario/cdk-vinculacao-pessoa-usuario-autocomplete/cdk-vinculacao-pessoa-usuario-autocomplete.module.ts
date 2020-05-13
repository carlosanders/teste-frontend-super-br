import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkVinculacaoPessoaUsuarioAutocompleteComponent} from './cdk-vinculacao-pessoa-usuario-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';
import {VinculacaoPessoaUsuarioService} from '../../../services/vinculacao-pessoa-usuario.service';

@NgModule({
    declarations: [
        CdkVinculacaoPessoaUsuarioAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        VinculacaoPessoaUsuarioService,
    ],
    exports: [
        CdkVinculacaoPessoaUsuarioAutocompleteComponent
    ]
})
export class CdkVinculacaoPessoaUsuarioAutocompleteModule {
}
