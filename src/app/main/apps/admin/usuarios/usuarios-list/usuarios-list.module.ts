import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {UsuarioService} from '@cdk/services/usuario.service';
import {UsuariosListComponent} from './usuarios-list.component';
import {UsuariosListStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {CdkUsuarioGridModule} from '@cdk/components/usuario/cdk-usuario-grid/cdk-usuario-grid.module';
import {PathModule} from '@cdk/components/path/path.module';
import {TarefaService} from '@cdk/services/tarefa.service';
import {TableDefinitionsService} from '@cdk/components/table-definitions/table-definitions.service';

const routes: Routes = [
    {
        path: '',
        component: UsuariosListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        UsuariosListComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        MatExpansionModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        TranslateModule,
        CdkSharedModule,
        CdkUsuarioGridModule,
        UsuariosListStoreModule,
        PathModule,
    ],
    providers: [
        UsuarioService,
        TarefaService,
        TableDefinitionsService,
        fromGuards.ResolveGuard
    ],
    exports: [
        UsuariosListComponent
    ]
})
export class UsuariosListModule {
}
