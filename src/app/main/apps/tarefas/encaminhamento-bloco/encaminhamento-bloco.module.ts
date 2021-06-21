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
import {EncaminhamentoBlocoComponent} from './encaminhamento-bloco.component';
import {RouterModule, Routes} from '@angular/router';
import {EncaminhamentoBlocoStoreModule} from './store/store.module';
import {CdkEncaminhamentoFormModule} from '@cdk/components/tarefa/cdk-encaminhamento-form/cdk-encaminhamento-form.module';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: EncaminhamentoBlocoComponent,
        children: [
            {
                path: 'criar-tarefas-bloco',
                loadChildren: () => import('./tarefa-create-bloco/tarefa-create-bloco.module').then(m => m.EncaminharTarefaCreateBlocoModule)
            },
            {
                path: 'remeter-processos-bloco',
                loadChildren: () => import('./remeter-processos-bloco/remeter-processos-bloco.module').then(m => m.RemeterProcessosBlocoModule)
            },
        ]
    }
];

const path = 'app/main/apps/tarefas/encaminhamento-bloco';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        EncaminhamentoBlocoComponent
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

        CdkEncaminhamentoFormModule,

        TranslateModule,

        EncaminhamentoBlocoStoreModule,

        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
    ]
})
export class EncaminhamentoBlocoModule {
}
