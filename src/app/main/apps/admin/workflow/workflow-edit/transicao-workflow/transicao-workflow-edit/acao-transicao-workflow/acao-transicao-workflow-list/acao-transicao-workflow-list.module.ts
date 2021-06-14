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
import {AcaoTransicaoWorkflowListComponent} from './acao-transicao-workflow-list.component';
import {RouterModule, Routes} from '@angular/router';
import {AcaoTransicaoWorkflowListStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {CdkAcaoTransicaoWorkflowListModule} from '@cdk/components/acao-transicao-workflow/cdk-acao-transicao-workflow-list/cdk-acao-transicao-workflow-list.module';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '@cdk/components/path/path.module';
import {AcaoTransicaoWorkflowService} from '@cdk/services/acao-transicao-workflow.service';

const routes: Routes = [
    {
        path: '',
        component: AcaoTransicaoWorkflowListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/admin/workflow/workflow-edit/transicao-workflow/transicao-workflow-edit/acao-transicao-workflow/acao-transicao-workflow-list';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        AcaoTransicaoWorkflowListComponent
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
        CdkAcaoTransicaoWorkflowListModule,
        AcaoTransicaoWorkflowListStoreModule,
        PathModule
    ],
    providers: [
        fromGuards.ResolveGuard,
        AcaoTransicaoWorkflowService
    ]
})
export class AcaoTransicaoWorkflowListModule {
}
