import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRippleModule,
    MatSelectModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatProgressSpinnerModule, MatTooltipModule, MatListModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';

import {DesentranhamentoCreateBlocoComponent} from './desentranhamento-create-bloco.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkDesentranhamentoFormModule} from '@cdk/components/desentranhamento/cdk-desentranhamento-form/cdk-desentranhamento-form.module';
import {DesentranhamentoCreateBlocoStoreModule} from './store/store.module';
import {DesentranhamentoService} from '@cdk/services/desentranhamento.service';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: DesentranhamentoCreateBlocoComponent
    }
];

const path = 'app/main/apps/processo/processo-edit/juntadas/desentranhamento-create-bloco';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        DesentranhamentoCreateBlocoComponent
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

        CdkDesentranhamentoFormModule,

        DesentranhamentoCreateBlocoStoreModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
        DesentranhamentoService
    ]
})
export class DesentranhamentoCreateBlocoModule {
}
