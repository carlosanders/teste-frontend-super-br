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

import {CompartilhamentoCreateComponent} from './compartilhamento-create.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkCompartilhamentoFormModule} from '@cdk/components/compartilhamento/cdk-compartilhamento-form/cdk-compartilhamento-form.module';
import {CompartilhamentoCreateStoreModule} from './store/store.module';
import {CompartilhamentoService} from '@cdk/services/compartilhamento.service';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: CompartilhamentoCreateComponent
    }
];

const path = 'app/main/apps/tarefas/tarefa-detail/compartilhamentos/compartilhamento-create';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        CompartilhamentoCreateComponent
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

        CdkCompartilhamentoFormModule,

        CompartilhamentoCreateStoreModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
        CompartilhamentoService
    ]
})
export class CompartilhamentoCreateModule {
}
