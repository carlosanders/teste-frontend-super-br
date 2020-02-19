import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@cdk/angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { UsuarioService } from '@cdk/services/usuario.service';
import { CdkCompartilhamentoFormComponent } from './cdk-compartilhamento-form.component';
import { CdkUsuarioAutocompleteModule } from '@cdk/components/usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import { CdkUsuarioGridsearchModule } from '@cdk/components/usuario/cdk-usuario-autocomplete/cdk-usuario-gridsearch/cdk-usuario-gridsearch.module';

@NgModule({
    declarations: [
        CdkCompartilhamentoFormComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,

        CdkUsuarioAutocompleteModule,
        CdkUsuarioGridsearchModule,

        FuseSharedModule,
    ],
    providers: [
        UsuarioService,
    ],
    exports: [
        CdkCompartilhamentoFormComponent
    ]
})
export class CdkCompartilhamentoFormModule {
}
