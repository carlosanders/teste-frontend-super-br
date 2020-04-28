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

import * as fromGuards from './store/guards';
import {CdkSharedModule} from '@cdk/shared.module';
import {SuperAdminLotacoesComponent} from './super-admin-lotacoes.component';
import {LotacaoService} from '@cdk/services/lotacao.service';
import {RouterModule, Routes} from '@angular/router';
import {RootLotacoesStoreModule} from './store/store.module';
import {SetorService} from '@cdk/services/setor.service';
import {UsuarioService} from '@cdk/services/usuario.service';

const routes: Routes = [
    {
        path: '',
        component: SuperAdminLotacoesComponent,
        canActivate: [fromGuards.ResolveGuard],
        children: [
            {
                path       : 'listar',
                loadChildren: () => import('./lotacao-list/super-admin-lotacao-list.module').then(m => m.SuperAdminLotacaoListModule),
            },
            {
                path       : 'editar',
                loadChildren: () => import('./lotacao-edit/super-admin-lotacao-edit.module').then(m => m.SuperAdminLotacaoEditModule),
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
        SuperAdminLotacoesComponent
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

        RootLotacoesStoreModule,

        CdkSharedModule,
    ],
    providers: [
        LotacaoService,
        SetorService,
        UsuarioService,
        fromGuards.ResolveGuard
    ],
    exports: [
        SuperAdminLotacoesComponent
    ]
})
export class SuperAdminLotacoesModule {
}
