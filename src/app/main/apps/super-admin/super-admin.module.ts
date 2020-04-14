import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule, Routes} from '@angular/router';

import {CdkSidebarModule} from '@cdk/components';
import {CdkSharedModule} from '@cdk/shared.module';
import {SuperAdminComponent} from './super-admin.component';
import { MainSidebarComponent } from './sidebars/main/main-sidebar.component';

const routes: Routes = [
    {
        path       : '',
        component: SuperAdminComponent,
        children: [
            // {
            //     path       : 'tarefas',
            //     loadChildren: () => import('./setor/setor.module').then(m => m.SetorModule)
            // },
            // {
            //     path       : 'atividades',
            //     loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule)
            // }
        ],
        // canActivate: [fromGuards.ResolveGuard]
    },
    {
        path: '**',
        redirectTo: ''
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
    ]
})
export class SuperAdminModule { }
