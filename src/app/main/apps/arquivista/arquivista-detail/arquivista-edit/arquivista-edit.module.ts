import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatSelectModule,
    MatToolbarModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';
import {PipesModule} from '@cdk/pipes/pipes.module';
import {ArquivistaEditComponent} from './arquivista-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {ArquivistaDetailStoreModule} from '../store/store.module';
import {CdkTarefaFormModule} from '@cdk/components/tarefa/cdk-tarefa-form/cdk-tarefa-form.module';
import {modulesConfig} from 'modules/modules-config';
import {CdkProcessoArquivistaFormModule} from '@cdk/components/processo/cdk-processo-arquivista-form/cdk-processo-arquivista-form.module';
import {CdkClassificacaoTreeService} from '@cdk/components/classificacao/cdk-classificacao-tree/services/cdk-classificacao-tree.service';
import {CdkClassificacaoGridTreeService} from '@cdk/components/classificacao/cdk-classificacao-grid-tree/services/cdk-classificacao-grid-tree.service';
import * as fromGuards from '../store/guards';

const routes: Routes = [
    {
        path: '',
        component: ArquivistaEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/tarefas/tarefa-detail/tarefa-edit';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        ArquivistaEditComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatSelectModule,
        MatToolbarModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatTooltipModule,

        CdkTarefaFormModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,

        PipesModule,

        ArquivistaDetailStoreModule,
        CdkProcessoArquivistaFormModule,
    ],
    providers: [
        CdkClassificacaoTreeService,
        CdkClassificacaoGridTreeService
    ]
})
export class ArquivistaEditModule {
}
