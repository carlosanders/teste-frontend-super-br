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

import {TarefaEditComponent} from './tarefa-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {TarefasStoreModule} from '../../store/store.module';
import {CdkTarefaFormModule} from '@cdk/components/tarefa/cdk-tarefa-form/cdk-tarefa-form.module';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path       : '',
        component  : TarefaEditComponent
    }
];

const path = 'app/main/apps/tarefas/tarefa-detail/tarefa-edit';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations   : [
        TarefaEditComponent
    ],
    imports        : [

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

        TarefasStoreModule,
    ],
    providers      : [
    ]
})
export class TarefaEditModule
{
}
