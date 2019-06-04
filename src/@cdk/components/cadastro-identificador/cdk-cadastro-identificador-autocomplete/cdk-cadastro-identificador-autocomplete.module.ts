import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {CadastroIdentificadorService} from '@cdk/services/cadastro-identificador.service';
import {CdkCadastroIdentificadorAutocompleteComponent} from './cdk-cadastro-identificador-autocomplete.component';
import {PipesModule} from '../../../pipes/pipes.module';

@NgModule({
    declarations: [
        CdkCadastroIdentificadorAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
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
