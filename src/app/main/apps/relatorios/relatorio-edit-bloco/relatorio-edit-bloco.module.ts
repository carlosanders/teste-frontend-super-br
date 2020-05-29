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
    MatProgressSpinnerModule, MatTooltipModule, MatListModule, MatRadioModule, MatSlideToggleModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';

import {RelatorioEditBlocoComponent} from './relatorio-edit-bloco.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkRelatorioFormModule} from '@cdk/components/relatorio/cdk-relatorio-form/cdk-relatorio-form.module';
import {RelatorioEditBlocoStoreModule} from './store/store.module';
import {RelatorioService} from '@cdk/services/relatorio.service';
import {LoginService} from 'app/main/auth/login/login.service';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: RelatorioEditBlocoComponent
    }
];

const path = 'app/main/apps/relatorios/relatorio-edit-bloco';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        RelatorioEditBlocoComponent
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
        MatSlideToggleModule,
        MatListModule,

        CdkRelatorioFormModule,

        RelatorioEditBlocoStoreModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
        RelatorioService,
        LoginService,
    ]
})
export class RelatorioEditBlocoModule {
}
