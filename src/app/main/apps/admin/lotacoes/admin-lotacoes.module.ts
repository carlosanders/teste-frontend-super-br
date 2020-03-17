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
import {AdminLotacoesComponent} from './admin-lotacoes.component';
import {LotacaoService} from '@cdk/services/lotacao.service';
import {RouterModule, Routes} from '@angular/router';
import {LotacoesStoreModule} from "./store/store.module";
import {SetorService} from '@cdk/services/setor.service';
import {UsuarioService} from '@cdk/services/usuario.service';

const routes: Routes = [
    {
        path: '',
        component: AdminLotacoesComponent,
        canActivate: [fromGuards.ResolveGuard],
        children: [
            {
                path       : 'listar',
                loadChildren: () => import('./lotacao-list/admin-lotacao-list.module').then(m => m.AdminLotacaoListModule),
            },
            {
                path       : 'editar',
                loadChildren: () => import('./lotacao-edit/admin-lotacao-edit.module').then(m => m.AdminLotacaoEditModule),
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

        LotacoesStoreModule,

        CdkSharedModule,
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
