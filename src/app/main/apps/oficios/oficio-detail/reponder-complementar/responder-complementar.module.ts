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

import {FuseSharedModule} from '@fuse/shared.module';
import {FuseSidebarModule} from '@fuse/components';

import {ResponderComplementarComponent} from './responder-complementar.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkAtividadeFormModule} from '@cdk/components/atividade/cdk-atividade-form/cdk-atividade-form.module';
import {ResponderComplementarStoreModule} from './store/store.module';
import {AtividadeService} from '@cdk/services/atividade.service';
import {LoginService} from 'app/main/auth/login/login.service';
import {CdkUploadModule} from '@cdk/components/upload/cdk-upload.module';
import {CdkComponenteDigitalCardListModule} from '@cdk/components/componente-digital/cdk-componente-digital-card-list/cdk-componente-digital-card-list.module';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {DocumentoService} from '@cdk/services/documento.service';
import * as fromGuards from './store/guards';
import {CdkDocumentoCardListModule} from '@cdk/components/documento/cdk-documento-card-list/cdk-documento-card-list.module';
import {CdkDocumentoAvulsoCardListComponent} from '../../../../../../@cdk/components/documento-avulso/cdk-documento-avulso-card-list/cdk-documento-avulso-card-list.component';
import {CdkDocumentoAvulsoCardModule} from '../../../../../../@cdk/components/documento-avulso/cdk-documento-avulso-card-list/cdk-documento-avulso-card/cdk-documento-avulso-card.module';
import {CdkDocumentoAvulsoCardListModule} from '../../../../../../@cdk/components/documento-avulso/cdk-documento-avulso-card-list/cdk-documento-avulso-card-list.module';
import {CdkComponenteDigitalDocumentoAvulsoCardListComponent} from '../../../../../../@cdk/components/documento-avulso/cdk-componente-digital-documento-avulso-card-list/cdk-componente-digital-documento-avulso-card-list.component';
import {CdkComponenteDigitalDocumentoAvulsoCardListModule} from '../../../../../../@cdk/components/documento-avulso/cdk-componente-digital-documento-avulso-card-list/cdk-componente-digital-documento-avulso-card-list.module';

const routes: Routes = [
    {
        path: '',
        component: ResponderComplementarComponent,
    }
];

@NgModule({
    declarations: [
        ResponderComplementarComponent
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

        ResponderComplementarStoreModule,
        TranslateModule,
        FuseSharedModule,
        FuseSidebarModule,
        RouterModule,
        CdkDocumentoAvulsoCardModule,
        CdkComponenteDigitalDocumentoAvulsoCardListModule
    ],
    providers: [
        AtividadeService,
        ComponenteDigitalService,
        DocumentoService,
        LoginService,
        fromGuards.ResolveGuard
    ],
    exports: [
        ResponderComplementarComponent
    ]
})
export class ResponderComplementarModule {
}
