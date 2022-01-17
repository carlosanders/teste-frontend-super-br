import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VinculacaoEspecieProcessoWorkflowComponent} from './vinculacao-especie-processo-workflow.component';
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
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {modulesConfig} from 'modules/modules-config';
import {LoginService} from 'app/main/auth/login/login.service';
import {PathModule} from '@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: '',
        component: VinculacaoEspecieProcessoWorkflowComponent,
        children: [
            {
                path: 'listar',
                loadChildren: () => import('./vinculacao-especie-processo-workflow-list/vinculacao-especie-processo-workflow-list.module')
                    .then(m => m.VinculacaoEspecieProcessoWorkflowListModule),
            },
            {
                path: 'editar',
                loadChildren: () => import('./vinculacao-especie-processo-workflow-edit/vinculacao-especie-processo-workflow-edit.module')
                    .then(m => m.VinculacaoEspecieProcessoWorkflowEditModule),
            },
            {
                path: '**',
                redirectTo: 'listar'
            }
        ]
    }
];

const path = 'app/main/apps/admin/workflow/vinculacao-especie-processo-workflow';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [VinculacaoEspecieProcessoWorkflowComponent],
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
        PathModule,
    ],
    providers: [
        LoginService
    ]
})
export class VinculacaoEspecieProcessoWorkflowModule {
}
