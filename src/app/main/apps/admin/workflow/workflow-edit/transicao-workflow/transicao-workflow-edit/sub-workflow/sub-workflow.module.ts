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
import {SubWorkflowComponent} from './sub-workflow.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {PathModule} from '@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: '',
        component: SubWorkflowComponent,
        children: [
            {
                path: 'listar',
                loadChildren: () => import('./sub-workflow-list/sub-workflow-list.module').then(m => m.SubWorkflowListModule),
            },
            {
                path: 'editar',
                loadChildren: () => import('./sub-workflow-edit/sub-workflow-edit.module').then(m => m.SubWorkflowEditModule),
            },
            {
                path: '**',
                redirectTo: 'listar'
            }
        ]
    }
];
const path = 'app/main/apps/admin/workflow/workflow-edit/transicao-workflow/transicao-workflow-edit/sub-workflow';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [SubWorkflowComponent],
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
    ]
})
export class SubWorkflowModule {
}
