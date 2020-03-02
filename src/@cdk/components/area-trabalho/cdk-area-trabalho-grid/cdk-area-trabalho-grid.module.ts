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
} from '@cdk/angular/material';

import {FuseSidebarModule} from '@fuse/components';
import {FuseSharedModule} from '@fuse/shared.module';
import {UsuarioService} from '@cdk/services/usuario.service';
import {CdkUsuarioAutocompleteModule} from '@cdk/components/usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkAreaTrabalhoGridComponent} from './cdk-area-trabalho-grid.component';
import {CdkAreaTrabalhoGridFilterModule} from './cdk-area-trabalho-grid-filter/cdk-area-trabalho-grid-filter.module';
import {CdkAreaTrabalhoMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkAreaTrabalhoGridComponent,
        CdkAreaTrabalhoMainSidebarComponent,
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

        CdkUsuarioAutocompleteModule,
        CdkAreaTrabalhoGridFilterModule,

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [
        UsuarioService,
    ],
    exports: [
        CdkAreaTrabalhoGridComponent
    ]
})
export class CdkAreaTrabalhoGridModule {
}
