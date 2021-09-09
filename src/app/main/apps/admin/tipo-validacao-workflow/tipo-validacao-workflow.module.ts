import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {TipoValidacaoWorkflowComponent} from './tipo-validacao-workflow.component';
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
        component: TipoValidacaoWorkflowComponent,
        children: [
            {
                path: 'listar',
                loadChildren: () => import('./tipo-validacao-workflow-list/tipo-validacao-workflow-list.module').then(m => m.TipoValidacaoWorkflowListModule),
            },
            {
                path: 'editar',
                loadChildren: () => import('./tipo-validacao-workflow-edit/tipo-validacao-workflow-edit.module').then(m => m.TipoValidacaoWorkflowEditModule),
            },
            {
                path: '**',
                redirectTo: 'listar'
            }
        ],
    }
];

const path = 'app/main/apps/admin/tipo-validacao-workflow-edit';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [TipoValidacaoWorkflowComponent],
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
    ],
    providers: [
        LoginService
    ]
})
export class TipoValidacaoWorkflowModule {
}
