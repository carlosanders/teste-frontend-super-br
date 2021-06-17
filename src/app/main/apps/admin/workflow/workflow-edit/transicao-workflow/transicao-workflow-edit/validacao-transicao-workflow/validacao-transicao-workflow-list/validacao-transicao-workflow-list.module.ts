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
    MatTableModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {ValidacaoTransicaoWorkflowListComponent} from './validacao-transicao-workflow-list.component';
import {RouterModule, Routes} from '@angular/router';
import {ValidacaoTransicaoWorkflowListStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {CdkValidacaoTransicaoWorkflowListModule} from '@cdk/components/validacao-transicao-workflow/cdk-validacao-transicao-workflow-list/cdk-validacao-transicao-workflow-list.module';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '@cdk/components/path/path.module';
import {ValidacaoTransicaoWorkflowService} from '@cdk/services/validacao-transicao-workflow.service';

const routes: Routes = [
    {
        path: '',
        component: ValidacaoTransicaoWorkflowListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/admin/workflow/workflow-edit/transicao-workflow/transicao-workflow-edit/validacao-transicao-workflow/validacao-transicao-workflow-list';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        ValidacaoTransicaoWorkflowListComponent
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
        TranslateModule,
        CdkSharedModule,
        CdkValidacaoTransicaoWorkflowListModule,
        ValidacaoTransicaoWorkflowListStoreModule,
        PathModule
    ],
    providers: [
        fromGuards.ResolveGuard,
        ValidacaoTransicaoWorkflowService
    ]
})
export class ValidacaoTransicaoWorkflowListModule {
}
