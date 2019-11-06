import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { UsuarioService } from '@cdk/services/usuario.service';
import {CdkUsuarioAutocompleteComponent} from './cdk-usuario-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkUsuarioAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        UsuarioService,
    ],
    exports: [
        CdkUsuarioAutocompleteComponent
    ]
})
export class CdkUsuarioAutocompleteModule {
}
