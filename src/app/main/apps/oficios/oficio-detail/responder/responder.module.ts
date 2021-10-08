import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatBadgeModule,
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
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';

import {ResponderComponent} from './responder.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkAtividadeFormModule} from '@cdk/components/atividade/cdk-atividade-form/cdk-atividade-form.module';
import {ResponderStoreModule} from './store/store.module';
import {AtividadeService} from '@cdk/services/atividade.service';
import {LoginService} from 'app/main/auth/login/login.service';
import {CdkUploadModule} from '@cdk/components/upload/cdk-upload.module';
import {CdkComponenteDigitalCardListModule} from '@cdk/components/componente-digital/cdk-componente-digital-card-list/cdk-componente-digital-card-list.module';
import {DocumentoService} from '@cdk/services/documento.service';
import {CdkDocumentoCardListModule} from '@cdk/components/documento/cdk-documento-card-list/cdk-documento-card-list.module';
import {CdkDocumentoAvulsoCardModule} from '@cdk/components/documento-avulso/cdk-documento-avulso-card-list/cdk-documento-avulso-card/cdk-documento-avulso-card.module';
import {CdkComponenteDigitalDocumentoAvulsoCardListModule} from '@cdk/components/documento-avulso/cdk-componente-digital-documento-avulso-card-list/cdk-componente-digital-documento-avulso-card-list.module';
import {ComplementarStoreModule} from '../complementar/store/store.module';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: ResponderComponent
    }
];

const path = 'app/main/apps/oficios/oficio-detail/responder';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        ResponderComponent
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
        MatTabsModule,
        MatBadgeModule,

        CdkComponenteDigitalCardListModule,
        CdkDocumentoCardListModule,
        CdkUploadModule,
        CdkAtividadeFormModule,

        ResponderStoreModule,
        ComplementarStoreModule,
        TranslateModule,
        CdkSharedModule,
        CdkSidebarModule,
        RouterModule,
        CdkDocumentoAvulsoCardModule,
        CdkComponenteDigitalDocumentoAvulsoCardListModule
    ],
    providers: [
        AtividadeService,
        DocumentoService,
        LoginService
    ],
    exports: [
        ResponderComponent
    ]
})
export class ResponderModule {
}
