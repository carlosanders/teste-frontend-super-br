import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WorkflowComponent} from './workflow.component';
import {RouterModule, Routes} from '@angular/router';
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
} from '../../../../../@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {CdkSharedModule} from '../../../../../@cdk/shared.module';
import {modulesConfig} from 'modules/modules-config';
import {LoginService} from '../../../auth/login/login.service';

const routes: Routes = [
    {
        path: '',
        component: WorkflowComponent,
        children: [
            {
                path: 'listar',
                loadChildren: () => import('./workflow-list/workflow-list.module').then(m => m.WorkflowListModule),
            },
            {
                path: 'editar',
                loadChildren: () => import('./workflow-edit/workflow-edit.module').then(m => m.WorkflowEditModule),
            },
            {
                path: ':workflowHandle/transicoes',
                loadChildren: () => import('./transicao-workflow/transicao-workflow.module').then(m => m.TransicaoWorkflowModule)
            },
            {
                path: ':workflowHandle/especies-processo',
                loadChildren: () => import('./especies-processo/especies-processo.module')
                    .then(m => m.EspeciesProcessoModule)
            },
            {
                path: 'visualizar/:workflowViewHandle',
                loadChildren: () => import('./workflow-view/workflow-view.module').then(m => m.WorkflowViewModule),
            },
            {
                path: '**',
                redirectTo: 'listar'
            }
        ]
    }
];

const path = 'app/main/apps/admin/workflow';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [WorkflowComponent],
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
export class WorkflowModule {
}
