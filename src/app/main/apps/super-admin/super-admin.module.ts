import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule, Routes} from '@angular/router';

import {CdkSidebarModule} from '@cdk/components';
import {CdkSharedModule} from '@cdk/shared.module';
import {SuperAdminComponent} from './super-admin.component';
import {MainSidebarComponent} from './sidebars/main/main-sidebar.component';

const routes: Routes = [
    {
        path       : '',
        component: SuperAdminComponent,
        children: [
            {
                path       : 'tarefas',
                loadChildren: () => import('./especie-tarefa/especie-tarefa.module').then(m => m.EspecieTarefaModule)
            },
            {
                path       : 'atividades',
                loadChildren: () => import('./especie-atividade/especie-atividade.module').then(m => m.EspecieAtividadeModule)
            }
        ],
        // canActivate: [fromGuards.ResolveGuard]
    },
    {
        path: '**',
        redirectTo: 'tarefas'
    }
];


@NgModule({
  declarations: [
      SuperAdminComponent,
      MainSidebarComponent
  ],
    imports: [
        CommonModule,
        CdkSidebarModule,
        RouterModule.forChild(routes),
        MatIconModule,
        RouterModule,
        CdkSharedModule,
        MatButtonModule
    ],
    providers: [
    ]
})
export class SuperAdminModule { }
