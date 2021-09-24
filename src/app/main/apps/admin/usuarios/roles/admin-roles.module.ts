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

import * as fromGuards from './store/guards';
import {CdkSharedModule} from '@cdk/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {UsuarioService} from '@cdk/services/usuario.service';
import {AdminRolesComponent} from './admin-roles.component';
import {AdminRolesStoreModule} from './store/store.module';
import {VinculacaoRoleService} from '@cdk/services/vinculacao-role.service';
import {MatTooltipModule} from '@angular/material/tooltip';

const routes: Routes = [
    {
        path: '',
        component: AdminRolesComponent,
        canActivate: [fromGuards.ResolveGuard],
        children: [
            {
                path: 'listar',
                loadChildren: () => import('./roles-list/roles-list.module').then(m => m.RolesListModule),
            },
            {
                path: 'editar',
                loadChildren: () => import('./roles-edit/roles-edit.module').then(m => m.RolesEditModule),
            },
            {
                path: '**',
                redirectTo: 'listar'
            }
        ]
    }

];

@NgModule({
    declarations: [
        AdminRolesComponent,
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

        AdminRolesStoreModule,

        CdkSharedModule,
        MatTooltipModule,
    ],
    providers: [
        VinculacaoRoleService,
        UsuarioService,
        fromGuards.ResolveGuard
    ],
    exports: [
        AdminRolesComponent
    ]
})
export class AdminRolesModule {
}
