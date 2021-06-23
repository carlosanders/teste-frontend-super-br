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

import {VinculacaoEtiquetaCreateBlocoComponent} from './vinculacao-etiqueta-create-bloco.component';
import {RouterModule, Routes} from '@angular/router';
import {VinculacaoEtiquetaCreateBlocoStoreModule} from './store/store.module';
import {VinculacaoEtiquetaService} from '@cdk/services/vinculacao-etiqueta.service';
import {LoginService} from 'app/main/auth/login/login.service';
import {CdkEtiquetaChipsModule} from '@cdk/components/etiqueta/cdk-etiqueta-chips/cdk-etiqueta-chips.module';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: VinculacaoEtiquetaCreateBlocoComponent
    }
];

const path = 'app/main/apps/relatorios/vinculacao-etiqueta-create-bloco';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        VinculacaoEtiquetaCreateBlocoComponent
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

        CdkEtiquetaChipsModule,

        VinculacaoEtiquetaCreateBlocoStoreModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
        VinculacaoEtiquetaService
    ]
})
export class VinculacaoEtiquetaCreateBlocoModule {
}
