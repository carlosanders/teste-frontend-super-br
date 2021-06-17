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
import {EncaminhamentoComponent} from './encaminhamento.component';
import {RouterModule, Routes} from '@angular/router';
import {EncaminhamentoStoreModule} from './store/store.module';
import {CdkEncaminhamentoFormModule} from '@cdk/components/tarefa/cdk-encaminhamento-form/cdk-encaminhamento-form.module';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: EncaminhamentoComponent
    }
];

const path = 'app/main/apps/tarefas/tarefa-detail/encaminhamento';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        EncaminhamentoComponent
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

        EncaminhamentoStoreModule,

        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
    ]
})
export class EncaminhamentoModule {
}
