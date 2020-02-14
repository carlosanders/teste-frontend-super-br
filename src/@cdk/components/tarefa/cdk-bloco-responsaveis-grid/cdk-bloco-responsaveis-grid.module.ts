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
import {CdkBlocoResponsaveisGridFilterModule} from '../cdk-bloco-responsaveis-grid/cdk-bloco-responsaveis-grid-filter/cdk-bloco-responsaveis-grid-filter.module';
import {CdkBlocoResponsaveisMainSidebarComponent} from './sidebars/main.bloco-responsaveis.component';



@NgModule({
    declarations: [
        CdkBlocoResponsaveisComponent,
        CdkBlocoResponsaveisMainSidebarComponent
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
        CdkBlocoResponsaveisGridFilterModule,
    ],
    providers: [
        UsuarioService,
        SetorService
    ],
    exports: [
        CdkBlocoResponsaveisComponent,
        CdkBlocoResponsaveisMainSidebarComponent
    ]
})
export class CdkBlocoResponsaveisGridModule {
}
