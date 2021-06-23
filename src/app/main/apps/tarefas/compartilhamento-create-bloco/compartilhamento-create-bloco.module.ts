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
import {CdkSidebarModule} from '@cdk/components';

import {CompartilhamentoCreateBlocoComponent} from './compartilhamento-create-bloco.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkCompartilhamentoFormModule} from '@cdk/components/compartilhamento/cdk-compartilhamento-form/cdk-compartilhamento-form.module';
import {CompartilhamentoCreateBlocoStoreModule} from './store/store.module';
import {CompartilhamentoService} from '@cdk/services/compartilhamento.service';
import {LoginService} from 'app/main/auth/login/login.service';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: CompartilhamentoCreateBlocoComponent
    }
];

const path = 'app/main/apps/tarefas/compartilhamento-create-bloco';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        CompartilhamentoCreateBlocoComponent
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

        CdkCompartilhamentoFormModule,

        CompartilhamentoCreateBlocoStoreModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
        CompartilhamentoService,
    ]
})
export class CompartilhamentoCreateBlocoModule {
}
