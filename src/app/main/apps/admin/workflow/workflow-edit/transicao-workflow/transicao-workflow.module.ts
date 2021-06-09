import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
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
import {LoginService} from '../../../../../auth/login/login.service';
import {TransicaoWorkflowComponent} from './transicao-workflow.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {PathModule} from '@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: '',
        component: TransicaoWorkflowComponent,
        children: [
            {
                path: 'listar',
                loadChildren: () => import('./transicao-workflow-list/transicao-workflow-list.module').then(m => m.TransicaoWorkflowListModule),
            },
            {
                path: 'editar',
                loadChildren: () => import('./transicao-workflow-edit/transicao-workflow-edit.module').then(m => m.TransicaoWorkflowEditModule),
            },
            {
                path: '**',
                redirectTo: 'listar'
            }
        ]
    }
];
const path = 'app/main/apps/admin/workflow/workflow-edit/transicao-workflow';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [TransicaoWorkflowComponent],
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
        MatTooltipModule,
        PathModule,
    ],
    providers: [
        LoginService
    ]
})
export class TransicaoWorkflowModule {
}
