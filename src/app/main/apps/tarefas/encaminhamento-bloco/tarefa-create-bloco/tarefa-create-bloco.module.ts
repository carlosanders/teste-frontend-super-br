import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatSelectModule,
    MatToolbarModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {RouterModule, Routes} from '@angular/router';
import {CdkTarefaFormModule} from '@cdk/components/tarefa/cdk-tarefa-form/cdk-tarefa-form.module';
import {TarefaService} from '@cdk/services/tarefa.service';
import {modulesConfig} from 'modules/modules-config';
import {EncaminharTarefaCreateBlocoComponent} from './tarefa-create-bloco.component';
import {EncaminharTarefaCreateBlocoStoreModule} from './store/store.module';

const routes: Routes = [
    {
        path: '',
        component: EncaminharTarefaCreateBlocoComponent
    }
];

const path = 'app/main/apps/tarefas/encaminhamento-bloco/tarefa-create-bloco';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        EncaminharTarefaCreateBlocoComponent
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
        MatListModule,

        CdkTarefaFormModule,

        EncaminharTarefaCreateBlocoStoreModule,

        TranslateModule,

        CdkSharedModule,
    ],
    providers: [
        TarefaService
    ]
})
export class EncaminharTarefaCreateBlocoModule {
}
