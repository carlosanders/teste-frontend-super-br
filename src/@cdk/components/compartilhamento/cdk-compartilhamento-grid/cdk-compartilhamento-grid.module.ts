import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { UsuarioService } from '@cdk/services/usuario.service';
import { CdkUsuarioAutocompleteModule } from '@cdk/components/usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import { CdkCompartilhamentoGridComponent} from './cdk-compartilhamento-grid.component';
import { CdkCompartilhamentoGridFilterModule } from './cdk-compartilhamento-grid-filter/cdk-compartilhamento-grid-filter.module';

@NgModule({
    declarations: [
        CdkCompartilhamentoGridComponent
    ],
    imports: [
        
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,

        CdkUsuarioAutocompleteModule,
        CdkCompartilhamentoGridFilterModule,

        FuseSharedModule,
    ],
    providers: [
        UsuarioService,
    ],
    exports: [
        CdkCompartilhamentoGridComponent
    ]
})
export class CdkCompartilhamentoGridModule {
}
