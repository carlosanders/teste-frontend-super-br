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
import {RemessasComponent} from './remessas.component';
import {TramitacaoService} from '@cdk/services/tramitacao.service';
import {RouterModule, Routes} from '@angular/router';
import {modulesConfig} from 'modules/modules-config';
import {DynamicService} from '../../../../../../modules/dynamic.service';

const routes: Routes = [
    {
        path: '',
        component: RemessasComponent,
        children: [
            {
                path       : 'listar',
                loadChildren: () => import('./remessa-list/remessa-list.module').then(m => m.RemessaListModule),
            },
            {
                path       : 'editar',
                loadChildren: () => import('./remessa-edit/remessa-edit.module').then(m => m.RemessaEditModule),
            },
            {
                path       : 'recebimento',
                loadChildren: () => import('./recebimento/recebimento.module').then(m => m.RecebimentoModule),
            },
            {
                path: 'status-barramento-processo',
                loadChildren: () => import(
                    './status-barramento-processo/status-barramento-processo.module'
                    ).then(m => m.StatusBarramentoProcessoModule)
            }
        ]
    }
];

const path = 'app/main/apps/processo/processo-edit/remessas';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

routes[0].children.push({
    path: '**',
    redirectTo: 'listar'
});

@NgModule({
    declarations: [
        RemessasComponent
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
    ],
    providers: [
        TramitacaoService,
        DynamicService
    ],
    exports: [
        RemessasComponent
    ]
})
export class RemessasModule {
}
