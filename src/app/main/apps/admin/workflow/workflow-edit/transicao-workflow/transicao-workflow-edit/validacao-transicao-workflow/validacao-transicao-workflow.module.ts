import {NgModule} from '@angular/core';
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
    MatTableModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {ValidacaoTransicaoWorkflowComponent} from './validacao-transicao-workflow.component';
import {RouterModule, Routes} from '@angular/router';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: '',
        component: ValidacaoTransicaoWorkflowComponent,
        children: [
            {
                path: 'listar',
                loadChildren: () => import('./validacao-transicao-workflow-list/validacao-transicao-workflow-list.module')
                    .then(m => m.ValidacaoTransicaoWorkflowListModule),
            },
            {
                path: 'editar',
                loadChildren: () => import('./validacao-transicao-workflow-edit/validacao-transicao-workflow-edit.module')
                    .then(m => m.ValidacaoTransicaoWorkflowEditModule),
            },
            {
                path: '**',
                redirectTo: 'listar'
            }
        ]
    }

];

const path = 'app/main/apps/admin/workflow/workflow-edit/transicao-workflow/transicao-workflow-edit/validacao-transicao-workflow';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        ValidacaoTransicaoWorkflowComponent
    ],
    imports: [
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
        MatTooltipModule,

        TranslateModule,
        CdkSharedModule,
        PathModule
    ],
    providers: [],
    exports: [
        ValidacaoTransicaoWorkflowComponent
    ]
})
export class ValidacaoTransicaoWorkflowModule {
}
