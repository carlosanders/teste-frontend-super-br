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
    MatStepperModule,
    MatToolbarModule,
    MatTooltipModule,
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
import {CdkJuntadaGridSelectModule} from '@cdk/components/juntada/cdk-juntada-grid-select/cdk-juntada-grid-select.module';
import * as fromGuards from '../desentranhamento-create-bloco/store/guards';
import {SnackBarDesfazerComponent} from '@cdk/components/snack-bar-desfazer/snack-bar-desfazer.component';
import {SnackBarDesfazerModule} from '@cdk/components/snack-bar-desfazer/snack-bar-desfazer.module';


const routes: Routes = [
    {
        path: '',
        component: DesentranhamentoCreateBlocoComponent,
        canActivate: [fromGuards.ResolveGuard]
    },
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
        MatStepperModule,

        CdkDesentranhamentoFormModule,
        CdkJuntadaGridSelectModule,

        DesentranhamentoCreateBlocoStoreModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
        SnackBarDesfazerModule,
    ],
    providers: [
        DesentranhamentoService,
        fromGuards.ResolveGuard
    ],
    entryComponents: [SnackBarDesfazerComponent],
})
export class DesentranhamentoCreateBlocoModule {
}
