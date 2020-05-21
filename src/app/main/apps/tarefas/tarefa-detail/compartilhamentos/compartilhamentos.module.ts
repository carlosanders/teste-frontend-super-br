import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {CompartilhamentosComponent} from './compartilhamentos.component';
import {RouterModule, Routes} from '@angular/router';
import {MatButtonModule, MatIconModule, MatStepperModule, MatTooltipModule} from '@cdk/angular/material';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: CompartilhamentosComponent,
        children: [
            {
                path: 'criar',
                loadChildren: () => import('./compartilhamento-create/compartilhamento-create.module').then(m => m.CompartilhamentoCreateModule)
            },
            {
                path: 'listar',
                loadChildren: () => import('./compartilhamento-list/compartilhamento-list.module').then(m => m.CompartilhamentoListModule)
            }
        ],
    },
    {
        path: '**',
        redirectTo: 'criar'
    }
];

const path = 'app/main/apps/tarefas/tarefa-detail/compartilhamentos';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        CompartilhamentosComponent
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
export class CompartilhamentosModule {
}
