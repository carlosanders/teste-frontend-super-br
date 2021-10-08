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

import {ResponderComponent} from './responder.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkDocumentoAvulsoFormModule} from '@cdk/components/documento-avulso/cdk-documento-avulso-form/cdk-documento-avulso-form.module';
import {DocumentoAvulsoResponderStoreModule} from './store/store.module';
import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';

import * as fromGuards from './store/guards';
import {modulesConfig} from 'modules/modules-config';
import {CdkComponenteDigitalDocumentoAvulsoCardListModule} from '@cdk/components/documento-avulso/cdk-componente-digital-documento-avulso-card-list/cdk-componente-digital-documento-avulso-card-list.module';
import {CdkDocumentoCardListModule} from '@cdk/components/documento/cdk-documento-card-list/cdk-documento-card-list.module';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTabsModule} from '@angular/material/tabs';
import {AssinaturaService} from '@cdk/services/assinatura.service';
import {CdkComponenteDigitalCardListModule} from '@cdk/components/componente-digital/cdk-componente-digital-card-list/cdk-componente-digital-card-list.module';

const routes: Routes = [
    {
        path: ':documentoAvulsoHandle',
        component: ResponderComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/processo/processo-edit/documentos-avulsos/responder';

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

        CdkDocumentoAvulsoFormModule,

        DocumentoAvulsoResponderStoreModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
        CdkComponenteDigitalDocumentoAvulsoCardListModule,
        CdkDocumentoCardListModule,
        MatBadgeModule,
        MatTabsModule,
        CdkComponenteDigitalCardListModule,
    ],
    providers: [
        DocumentoAvulsoService,
        fromGuards.ResolveGuard,
        AssinaturaService
    ]
})
export class ResponderModule {
}
