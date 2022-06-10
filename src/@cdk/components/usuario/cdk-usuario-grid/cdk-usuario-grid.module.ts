import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
} from '@cdk/angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {UsuarioService} from '@cdk/services/usuario.service';
import {CdkUsuarioGridComponent} from './cdk-usuario-grid.component';
import {CdkUsuarioAutocompleteModule} from '@cdk/components/usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkUsuarioFilterModule} from '../sidebars/cdk-usuario-filter/cdk-usuario-filter.module';
import {TableDefinitionsService} from '../../table-definitions/table-definitions.service';
import {DndModule} from 'ngx-drag-drop';

@NgModule({
    declarations: [
        CdkUsuarioGridComponent,
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
        CdkUsuarioFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
        DndModule,
    ],
    providers: [
        UsuarioService,
        TableDefinitionsService
    ],
    exports: [
        CdkUsuarioGridComponent
    ]
})
export class CdkUsuarioGridModule {
}
