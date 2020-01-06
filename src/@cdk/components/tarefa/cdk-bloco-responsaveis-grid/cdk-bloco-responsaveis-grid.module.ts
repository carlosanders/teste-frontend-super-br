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
    MatSelectModule,
} from '@angular/material';

import {FuseSidebarModule} from '@fuse/components';
import {FuseSharedModule} from '@fuse/shared.module';
import {UsuarioService} from '@cdk/services/usuario.service';
import {CdkBlocoResponsaveisComponent} from './cdk-bloco-responsaveis-grid.component';
import {SetorService} from '../../../services/setor.service';
import {CdkUsuarioGridModule} from '../../usuario/cdk-usuario-grid/cdk-usuario-grid.module';
import {CdkSetorGridModule} from '../../setor/cdk-setor-grid/cdk-setor-grid.module';
import {CdkSetorAutocompleteModule} from '../../setor/cdk-setor-autocomplete/cdk-setor-autocomplete.module';
import {CdkSetorGridFilterModule} from '../../setor/cdk-setor-grid/cdk-setor-grid-filter/cdk-setor-grid-filter.module';
import {CdkUsuarioAutocompleteModule} from '../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkUsuarioGridFilterModule} from '../../usuario/cdk-usuario-grid/cdk-usuario-grid-filter/cdk-usuario-grid-filter.module';


@NgModule({
    declarations: [
        CdkBlocoResponsaveisComponent
    ],
    imports: [
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,

        FuseSharedModule,
        FuseSidebarModule,

        CdkUsuarioGridModule,
        CdkSetorGridModule,
        CdkSetorAutocompleteModule,
        CdkSetorGridFilterModule,
        CdkUsuarioAutocompleteModule,
        CdkUsuarioGridFilterModule,
    ],
    providers: [
        UsuarioService,
        SetorService
    ],
    exports: [
        CdkBlocoResponsaveisComponent
    ]
})
export class CdkBlocoResponsaveisGridModule {
}
