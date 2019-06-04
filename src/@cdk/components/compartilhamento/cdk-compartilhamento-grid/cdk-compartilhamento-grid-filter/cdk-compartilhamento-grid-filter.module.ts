import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { UsuarioService } from '@cdk/services/usuario.service';
import {CdkUsuarioAutocompleteModule} from '@cdk/components/usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkCompartilhamentoGridFilterComponent} from './cdk-compartilhamento-grid-filter.component';

@NgModule({
    declarations: [
        CdkCompartilhamentoGridFilterComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,

        CdkUsuarioAutocompleteModule,

        FuseSharedModule,
    ],
    providers: [
        UsuarioService,
    ],
    exports: [
        CdkCompartilhamentoGridFilterComponent
    ]
})
export class CdkCompartilhamentoGridFilterModule {
}
