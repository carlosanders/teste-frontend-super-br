import {ComponentFactory, ComponentFactoryResolver, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CdkSharedModule} from '@cdk/shared.module';

import {TranslateModule} from '@ngx-translate/core';
import {modulesConfig} from 'modules/modules-config';
import {DocumentoEditAnexosStoreModule} from './store/store.module';
import {DocumentoEditDadosBasicosStoreModule} from '../dados-basicos/store/store.module';
import {CdkUploadModule} from '@cdk/components/upload/cdk-upload.module';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {DocumentoService} from '@cdk/services/documento.service';
import {DocumentoEditAnexosComponent} from './documento-edit-anexos.component';
import {CdkDocumentoCardListModule} from '@cdk/components/documento/cdk-documento-card-list/cdk-documento-card-list.module';
import {CdkComponenteDigitalCardListModule} from '@cdk/components/componente-digital/cdk-componente-digital-card-list/cdk-componente-digital-card-list.module';
import {AssinaturaService} from '@cdk/services/assinatura.service';
import * as fromGuards from './store/guards';

const routes: Routes = [
    {
        path: '',
        component: DocumentoEditAnexosComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/documento/documento-edit/anexos';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        DocumentoEditAnexosComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatIconModule,
        MatButtonModule,
        MatMenuModule,

        DocumentoEditAnexosStoreModule,
        DocumentoEditDadosBasicosStoreModule,

        CdkUploadModule,

        TranslateModule,
        CdkSharedModule,
        MatTooltipModule,
        CdkDocumentoCardListModule,
        CdkComponenteDigitalCardListModule,
    ],
    providers: [
        AssinaturaService,
        DocumentoService,
        fromGuards.ResolveGuard
    ],
    exports: [
        DocumentoEditAnexosComponent
    ]
})
export class DocumentoEditAnexosModule {
    constructor(private resolver: ComponentFactoryResolver) {}

    public resolveComponentFactory(): ComponentFactory<DocumentoEditAnexosComponent> {
        return this.resolver.resolveComponentFactory(DocumentoEditAnexosComponent);
    }
}
