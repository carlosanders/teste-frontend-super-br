import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CdkSharedModule} from '@cdk/shared.module';

import {TranslateModule} from '@ngx-translate/core';
import {modulesConfig} from 'modules/modules-config';
import {DocumentoModeloEditAnexosStoreModule} from './store/store.module';
import {CdkUploadModule} from '@cdk/components/upload/cdk-upload.module';
import {MatIconModule} from '@cdk/angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {DocumentoService} from '@cdk/services/documento.service';
import {ModeloEditAnexosComponent} from './modelo-edit-anexos.component';
import * as fromGuards from './store/guards';
import {CdkDocumentoCardListModule} from '@cdk/components/documento/cdk-documento-card-list/cdk-documento-card-list.module';
import {CdkComponenteDigitalCardListModule} from '@cdk/components/componente-digital/cdk-componente-digital-card-list/cdk-componente-digital-card-list.module';

const routes: Routes = [
    {
        path: '',
        component: ModeloEditAnexosComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/documento/modelo-edit/anexos';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        ModeloEditAnexosComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatIconModule,
        MatButtonModule,
        MatMenuModule,

        DocumentoModeloEditAnexosStoreModule,

        CdkUploadModule,

        TranslateModule,
        CdkSharedModule,
        MatTooltipModule,
        CdkDocumentoCardListModule,
        CdkComponenteDigitalCardListModule,
    ],
    providers: [
        DocumentoService,
        fromGuards.ResolveGuard
    ],
    exports: [
        ModeloEditAnexosComponent
    ]
})
export class ModeloEditAnexosModule {
}
