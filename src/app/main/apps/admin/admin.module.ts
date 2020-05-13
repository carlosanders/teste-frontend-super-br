import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule, Routes} from '@angular/router';

import {CdkSidebarModule} from '@cdk/components';
import {CdkSharedModule} from '@cdk/shared.module';
import {AdminComponent} from './admin.component';
import {MainSidebarComponent} from './sidebars/main/main-sidebar.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            {
                path: 'tarefas',
                loadChildren: () => import('./especie-tarefa/especie-tarefa.module').then(m => m.EspecieTarefaModule)
            },
            {
                path: 'atividades',
                loadChildren: () => import('./especie-atividade/especie-atividade.module').then(m => m.EspecieAtividadeModule)
            },
            {
                path: 'unidades',
                loadChildren: () => import('./unidades/unidades.module').then(m => m.UnidadesModule)
            },
            {
                path: 'externos',
                loadChildren: () => import('./usuarios-externos/usuarios-externos.module').then(m => m.UsuariosExternosModule)
            },
            {
                path: 'relevancias',
                loadChildren: () => import('./especie-relevancia/especie-relevancia.module').then(m => m.EspecieRelevanciaModule)
            },
            {
                path: '**',
                redirectTo: 'tarefas'
            },
        ],
    },
    {
        path: '**',
        redirectTo: ''
    }
];


@NgModule({
    declarations: [
        AdminComponent,
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
    providers: []
})
export class AdminModule {
}
