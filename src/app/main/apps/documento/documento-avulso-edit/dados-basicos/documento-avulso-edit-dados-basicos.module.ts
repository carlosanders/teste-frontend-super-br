import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CdkSharedModule} from '@cdk/shared.module';

import {TranslateModule} from '@ngx-translate/core';
import {modulesConfig} from 'modules/modules-config';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {DocumentoAvulsoEditDadosBasicosComponent} from './documento-avulso-edit-dados-basicos.component';
import {DocumentoAvulsoEditDadosBasicosStoreModule} from './store/store.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {CdkDocumentoAvulsoFormModule} from '@cdk/components/documento-avulso/cdk-documento-avulso-form/cdk-documento-avulso-form.module';
import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import {CdkConfirmDialogModule} from "../../../../../../@cdk/components";
import {MatInputModule} from "@angular/material/input";

const routes: Routes = [
    {
        path: '',
        component: DocumentoAvulsoEditDadosBasicosComponent
    }
];

const path = 'app/main/apps/documento/documento-avulso-edit';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        DocumentoAvulsoEditDadosBasicosComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatIconModule,
        MatButtonModule,
        MatMenuModule,

        DocumentoAvulsoEditDadosBasicosStoreModule,

        TranslateModule,
        CdkSharedModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        MatSlideToggleModule,
        CdkDocumentoAvulsoFormModule,
        CdkConfirmDialogModule,
        MatInputModule
    ],
    providers: [
        DocumentoAvulsoService,
    ],
    exports: [
        DocumentoAvulsoEditDadosBasicosComponent
    ]
})
export class DocumentoAvulsoEditDadosBasicosModule {
}
