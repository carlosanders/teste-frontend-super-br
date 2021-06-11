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
import {TramitacoesComponent} from './tramitacoes.component';
import {TramitacaoService} from '@cdk/services/tramitacao.service';
import {RouterModule, Routes} from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: TramitacoesComponent,
        children: [
            {
                path       : 'listar',
                loadChildren: () => import('./tramitacao-list/tramitacao-list.module').then(m => m.TramitacaoListModule),
            },
            {
                path       : 'editar',
                loadChildren: () => import('./tramitacao-edit/tramitacao-edit.module').then(m => m.TramitacaoEditModule),
            },
            {
                path       : 'visualizar',
                loadChildren: () => import('./tramitacao-view/tramitacao-view.module').then(m => m.TramitacaoViewModule),
            },
            {
                path       : 'recebimento',
                loadChildren: () => import('./recebimento/recebimento.module').then(m => m.RecebimentoModule),
            },
            {
                path: '**',
                redirectTo: 'listar'
            }
        ]
    }
];

const path = 'app/main/apps/processo/processo-edit/tramitacoes';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        TramitacoesComponent
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
    ],
    providers: [
        TramitacaoService
    ],
    exports: [
        TramitacoesComponent
    ]
})
export class TramitacoesModule {
}
