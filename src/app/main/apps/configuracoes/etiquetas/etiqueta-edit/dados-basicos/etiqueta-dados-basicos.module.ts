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

import {DadosBasicosComponent} from './dados-basicos.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkEtiquetaFormModule} from '@cdk/components/etiqueta/cdk-etiqueta-form/cdk-etiqueta-form.module';
import {DadosBasicosStoreModule} from './store/store.module';
import {EtiquetaService} from '@cdk/services/etiqueta.service';

import {LoginService} from 'app/main/auth/login/login.service';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: '',
        component: DadosBasicosComponent
    }
];

const path = 'app/main/apps/configuracoes/etiquetas/etiqueta-edit/dados-basicos';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        DadosBasicosComponent
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

        CdkEtiquetaFormModule,

        DadosBasicosStoreModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
        PathModule,
    ],
    providers: [
        EtiquetaService,
        LoginService
    ]
})
export class EtiquetaDadosBasicosModule {
}
