import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatAutocompleteModule,
    MatExpansionModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {UnidadesOrgaoCentralStoreModule} from './store/store.module';
import {CdkSharedModule} from '@cdk/shared.module';
import {ModalidadeOrgaoCentralService} from '@cdk/services/modalidade-orgao-central.service';
import {SetorService} from '@cdk/services/setor.service';
import {UsuarioService} from '@cdk/services/usuario.service';
import {RouterModule, Routes} from '@angular/router';
import {UnidadesComponent} from './unidades.component';
import * as fromGuards from "./store/guards";
import {CdkSidebarModule} from '@cdk/components';
import {UnidadesOrgaoCentralMainSidebarComponent} from './sidebars/main/main-sidebar.component';

const routes: Routes = [
    {
        path: ':unidadeHandle',
        component: UnidadesComponent,
        canActivate: [fromGuards.ResolveGuard],
        children: [
            {
                path       : 'listar',
                loadChildren: () => import('./unidades-list/unidades-list.module').then(m => m.UnidadesListModule),
            },
            {
                path       : 'modelos',
                loadChildren: () => import('../modelos/modelos.module').then(m => m.ModelosModule)
            },
            {
                path       : 'repositorios',
                loadChildren: () => import('../repositorios/repositorios.module').then(m => m.RepositoriosModule)
            },
            {
                path       : 'usuarios',
                loadChildren: () => import('../usuarios/usuarios.module').then(m => m.UsuariosModule)
            },
            {
                path: '**',
                redirectTo: 'listar'
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'default'
    }
];

@NgModule({
    declarations: [
        UnidadesComponent,
        UnidadesOrgaoCentralMainSidebarComponent,
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
        UnidadesOrgaoCentralStoreModule,
        CdkSidebarModule
    ],
    providers: [
        UsuarioService,
        SetorService,
        ModalidadeOrgaoCentralService,
        fromGuards.ResolveGuard
    ],
    exports: [
        UnidadesComponent
    ]
})
export class UnidadesModule {
}
