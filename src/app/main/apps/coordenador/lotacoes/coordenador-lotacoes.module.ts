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
import {CoordenadorLotacoesComponent} from './coordenador-lotacoes.component';
import {LotacaoService} from '@cdk/services/lotacao.service';
import {RouterModule, Routes} from '@angular/router';
import {LotacoesStoreModule} from "./store/store.module";
import {SetorService} from '@cdk/services/setor.service';
import {UsuarioService} from '@cdk/services/usuario.service';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: CoordenadorLotacoesComponent,
        canActivate: [fromGuards.ResolveGuard],
        children: [
            {
                path       : 'listar',
                loadChildren: () => import('./lotacao-list/coordenador-lotacao-list.module').then(m => m.CoordenadorLotacaoListModule),
            },
            {
                path       : 'editar',
                loadChildren: () => import('./lotacao-edit/coordenador-lotacao-edit.module').then(m => m.CoordenadorLotacaoEditModule),
            },
            {
                path: '**',
                redirectTo: 'listar'
            }
        ]
    }
];

const path = 'app/main/apps/coordenador/lotacoes';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        CoordenadorLotacoesComponent
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
        CoordenadorLotacoesComponent
    ]
})
export class CoordenadorLotacoesModule {
}
