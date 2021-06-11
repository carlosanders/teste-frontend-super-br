import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {CadastroIdentificadorService} from '@cdk/services/cadastro-identificador.service';
import {CdkCadastroIdentificadorAutocompleteComponent} from './cdk-cadastro-identificador-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkCadastroIdentificadorAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        CadastroIdentificadorService,
    ],
    exports: [
        CdkCadastroIdentificadorAutocompleteComponent
    ]
})
export class CdkCadastroIdentificadorAutocompleteModule {
}
