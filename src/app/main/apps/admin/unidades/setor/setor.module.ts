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
import {SetorComponent} from './setor.component';
import {SetorService} from '@cdk/services/setor.service';
import {RouterModule, Routes} from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';
import * as fromGuards from './store/guards';
import {RootSetorStoreModule} from './store/store.module';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: SetorComponent,
        canActivate: [fromGuards.ResolveGuard],
        children: [
            {
                path: 'listar',
                loadChildren: () => import('./setor-list/setor-list.module').then(m => m.SetorListModule),
            },
            {
                path: 'editar',
                loadChildren: () => import('./setor-edit/setor-edit.module').then(m => m.SetorEditModule),
            },
            {
                path: ':setorHandle/lotacoes',
                loadChildren: () => import('../../lotacoes/admin-lotacoes.module').then(m => m.AdminLotacoesModule),
            },
            {
                path: ':setorHandle/localizadores',
                loadChildren: () => import('./localizadores/localizadores.module').then(m => m.LocalizadoresModule),
            },
            {
                path: '**',
                redirectTo: 'listar'
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'listar'
    }
];

const path = 'app/main/apps/admin/unidades/setor';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        SetorComponent
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
        MatTooltipModule,

        RootSetorStoreModule,
    ],
    providers: [
        SetorService,
        fromGuards.ResolveGuard
    ],
    exports: [
        SetorComponent
    ]
})
export class SetorModule {
}
