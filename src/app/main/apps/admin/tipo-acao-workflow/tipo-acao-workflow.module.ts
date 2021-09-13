import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {TipoAcaoWorkflowComponent} from './tipo-acao-workflow.component';
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
import {LoginService} from '../../../auth/login/login.service';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: TipoAcaoWorkflowComponent,
        children: [
            {
                path: 'listar',
                loadChildren: () => import('./tipo-acao-workflow-list/tipo-acao-workflow-list.module').then(m => m.TipoAcaoWorkflowListModule),
            },
            {
                path: 'editar',
                loadChildren: () => import('./tipo-acao-workflow-edit/tipo-acao-workflow-edit.module').then(m => m.TipoAcaoWorkflowEditModule),
            },
            {
                path: '**',
                redirectTo: 'listar'
            }
        ],
    }
];

const path = 'app/main/apps/admin/tipo-acao-workflow';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [TipoAcaoWorkflowComponent],
    imports: [
        CommonModule,
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
    ]
})
export class TipoAcaoWorkflowModule {
}
