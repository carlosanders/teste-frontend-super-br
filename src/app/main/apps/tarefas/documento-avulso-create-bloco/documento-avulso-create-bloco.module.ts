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

import {DocumentoAvulsoCreateBlocoComponent} from './documento-avulso-create-bloco.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkDocumentoAvulsoFormModule} from '@cdk/components/documento-avulso/cdk-documento-avulso-form/cdk-documento-avulso-form.module';
import {DocumentoAvulsoCreateBlocoStoreModule} from './store/store.module';
import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import {LoginService} from 'app/main/auth/login/login.service';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: DocumentoAvulsoCreateBlocoComponent
    }
];

const path = 'app/main/apps/tarefas/documento-avulso-create-bloco';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        DocumentoAvulsoCreateBlocoComponent
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

        CdkDocumentoAvulsoFormModule,

        DocumentoAvulsoCreateBlocoStoreModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
        DocumentoAvulsoService
    ]
})
export class DocumentoAvulsoCreateBlocoModule {
}
