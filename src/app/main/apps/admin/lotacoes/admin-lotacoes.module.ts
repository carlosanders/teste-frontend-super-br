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
import {AdminLotacoesComponent} from './admin-lotacoes.component';
import {LotacaoService} from '@cdk/services/lotacao.service';
import {RouterModule, Routes} from '@angular/router';
import {RootLotacoesStoreModule} from './store/store.module';
import {SetorService} from '@cdk/services/setor.service';
import {UsuarioService} from '@cdk/services/usuario.service';
import {modulesConfig} from 'modules/modules-config';
import {MatTooltipModule} from '@angular/material/tooltip';

const routes: Routes = [
    {
        path: '',
        component: AdminLotacoesComponent,
        canActivate: [fromGuards.ResolveGuard],
        children: [
            {
                path: 'listar',
                loadChildren: () => import('./lotacao-list/admin-lotacao-list.module').then(m => m.AdminLotacaoListModule),
            },
            {
                path: 'editar',
                loadChildren: () => import('./lotacao-edit/admin-lotacao-edit.module').then(m => m.AdminLotacaoEditModule),
            },
            {
                path: '**',
                redirectTo: 'listar'
            }
        ]
    }
];

const path = 'app/main/apps/admin/unidades/setor/lotacoes';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        AdminLotacoesComponent
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
        MatTooltipModule,
    ],
    providers: [
        LotacaoService,
        SetorService,
        UsuarioService,
        fromGuards.ResolveGuard
    ],
    exports: [
        AdminLotacoesComponent
    ]
})
export class AdminLotacoesModule {
}
