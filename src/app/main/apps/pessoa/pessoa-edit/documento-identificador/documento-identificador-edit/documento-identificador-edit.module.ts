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

import {DocumentoIdentificadorEditComponent} from './documento-identificador-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkDocumentoIdentificadorFormModule} from '@cdk/components/documento-identificador/cdk-documento-identificador-form/cdk-documento-identificador-form.module';
import {DocumentoIdentificadorEditStoreModule} from './store/store.module';
import {DocumentoIdentificadorService} from '@cdk/services/documento-identificador.service';

import * as fromGuards from './store/guards';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: ':documentoIdentificadorHandle',
        component: DocumentoIdentificadorEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/pessoa/pessoa-edit/documento-identificador/documento-identificador-edit';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        DocumentoIdentificadorEditComponent
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

        CdkDocumentoIdentificadorFormModule,

        DocumentoIdentificadorEditStoreModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
        DocumentoIdentificadorService,
        fromGuards.ResolveGuard
    ]
})
export class DocumentoIdentificadorEditModule {
}
