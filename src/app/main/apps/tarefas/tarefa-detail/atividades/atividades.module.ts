import {NgModule} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {AtividadesComponent} from './atividades.component';
import {RouterModule, Routes} from '@angular/router';
import {MatButtonModule, MatIconModule, MatStepperModule, MatTooltipModule} from '@cdk/angular/material';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: AtividadesComponent,
        children: [
            {
                path: 'criar',
                loadChildren: () => import('./atividade-create/atividade-create.module').then(m => m.AtividadeCreateModule)
            },
            {
                path: 'listar',
                loadChildren: () => import('./atividade-list/atividade-list.module').then(m => m.AtividadeListModule)
            }
        ],
    },
    {
        path: '**',
        redirectTo: 'criar'
    }
];

const path = 'app/main/apps/tarefas/tarefa-detail/atividades';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        AtividadesComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        TranslateModule,
        MatStepperModule,
        CdkSharedModule
    ],
    providers: [
    ],
    exports: [
    ]
})
export class AtividadesModule {
}
