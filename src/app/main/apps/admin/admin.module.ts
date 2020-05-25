import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule, Routes} from '@angular/router';

import {CdkSidebarModule} from '@cdk/components';
import {CdkSharedModule} from '@cdk/shared.module';
import {AdminComponent} from './admin.component';
import {MainSidebarComponent} from './sidebars/main/main-sidebar.component';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            {
                path: 'especie-tarefas',
                loadChildren: () => import('./especie-tarefa/especie-tarefa.module').then(m => m.EspecieTarefaModule)
            },
            {
                path: 'especie-atividades',
                loadChildren: () => import('./especie-atividade/especie-atividade.module').then(m => m.EspecieAtividadeModule)
            },
            {
                path: 'unidades',
                loadChildren: () => import('./unidades/unidades.module').then(m => m.UnidadesModule)
            },
            {
                path: 'usuarios',
                loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule)
            },
            {
                path: 'externos',
                loadChildren: () => import('./usuarios-externos/usuarios-externos.module').then(m => m.UsuariosExternosModule)
            },
            {
                path: 'especie-relevancias',
                loadChildren: () => import('./especie-relevancia/especie-relevancia.module').then(m => m.EspecieRelevanciaModule)
            },
            {
                path: 'tipos-documentos',
                loadChildren: () => import('./tipo-documento/tipo-documento.module').then(m => m.TipoDocumentoModule)
            },
            {
                path: 'templates',
                loadChildren: () => import('./templates/templates.module').then(m => m.TemplatesModule)
            },
            {
                path: 'assuntos',
                loadChildren: () => import('./assunto-administrativo/assunto-administrativo.module').then(m => m.AssuntoAdministrativoModule)
            },
            {
                path: '**',
                redirectTo: 'especie-tarefas'
            },
        ],
    },
    {
        path: '**',
        redirectTo: ''
    }
];

const path = 'app/main/apps/admin';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

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
