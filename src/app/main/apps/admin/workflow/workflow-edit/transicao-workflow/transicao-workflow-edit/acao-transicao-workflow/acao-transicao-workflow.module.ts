import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatAutocompleteModule,
    MatExpansionModule, MatTooltipModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {AcaoTransicaoWorkflowComponent} from './acao-transicao-workflow.component';
import {RouterModule, Routes} from '@angular/router';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: '',
        component: AcaoTransicaoWorkflowComponent,
        children: [
            {
                path       : 'listar',
                loadChildren: () => import('./acao-transicao-workflow-list/acao-transicao-workflow-list.module')
                    .then(m => m.AcaoTransicaoWorkflowListModule),
            },
            {
                path       : 'editar',
                loadChildren: () => import('./acao-transicao-workflow-edit/acao-transicao-workflow-edit.module')
                .then(m => m.AcaoTransicaoWorkflowEditModule),
            },
            {
                path: '**',
                redirectTo: 'listar'
            }
        ]
    }

];

const path = 'app/main/apps/admin/workflow-edit/transicao-workflow-edit/acao-transicao-workflow-edit';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        AcaoTransicaoWorkflowComponent
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
    providers: [
    ],
    exports: [
        AcaoTransicaoWorkflowComponent
    ]
})
export class AcaoTransicaoWorkflowModule {
}
