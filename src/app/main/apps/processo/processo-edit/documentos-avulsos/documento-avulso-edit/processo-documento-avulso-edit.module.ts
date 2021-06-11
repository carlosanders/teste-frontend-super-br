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

import {DocumentoAvulsoEditComponent} from './documento-avulso-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkDocumentoAvulsoFormModule} from '@cdk/components/documento-avulso/cdk-documento-avulso-form/cdk-documento-avulso-form.module';
import {DocumentoAvulsoEditStoreModule} from './store/store.module';
import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';

import * as fromGuards from './store/guards';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: ':documentoAvulsoHandle',
        component: DocumentoAvulsoEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/processo/processo-edit/documentos-avulsos/documento-avulso-edit';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        DocumentoAvulsoEditComponent
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

        DocumentoAvulsoEditStoreModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
        DocumentoAvulsoService,
        fromGuards.ResolveGuard
    ]
})
export class ProcessoDocumentoAvulsoEditModule {
}
