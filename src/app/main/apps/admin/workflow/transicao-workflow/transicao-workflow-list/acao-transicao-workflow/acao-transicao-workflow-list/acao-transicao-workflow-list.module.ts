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
    MatExpansionModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {AcaoTransicaoWorkflowListComponent} from './acao-transicao-workflow-list.component';
//o-- rever servico
import {EtiquetaService} from '@cdk/services/etiqueta.service';
import {RouterModule, Routes} from '@angular/router';
import {AcaoTransicaoWorkflowListStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {CdkAcaoListModule} from '@cdk/components/acao/cdk-acao-list/cdk-acao-list.module';
import {AcaoTransicaoWorkflowService} from '@cdk/services/acao-transicao-workflow.service';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: AcaoTransicaoWorkflowListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/admin/workflow/transicao-workflow/transicao-workflow-list/acoes/acao-list';

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

        CdkAcaoListModule,

        AcaoTransicaoWorkflowListStoreModule,
    ],
    providers: [
        EtiquetaService,
        AcaoTransicaoWorkflowService,
        fromGuards.ResolveGuard
    ],
    exports: [
        AcaoTransicaoWorkflowListComponent
    ]
})
export class AcaoTransicaoWorkflowListModule {
}
