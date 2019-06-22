import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRippleModule,
    MatSelectModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatProgressSpinnerModule, MatTooltipModule
} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {FuseSharedModule} from '@fuse/shared.module';
import {FuseSidebarModule} from '@fuse/components';

import {DocumentoIdentificadorEditComponent} from './documento-identificador-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkDocumentoIdentificadorFormModule} from '@cdk/components/documento-identificador/cdk-documento-identificador-form/cdk-documento-identificador-form.module';
import {DocumentoIdentificadorEditStoreModule} from './store/store.module';
import {DocumentoIdentificadorService} from '@cdk/services/documento-identificador.service';

import * as fromGuards from './store/guards';

const routes: Routes = [
    {
        path: ':documentoIdentificadorHandle',
        component: DocumentoIdentificadorEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

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

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [
        DocumentoIdentificadorService,
        fromGuards.ResolveGuard
    ]
})
export class DocumentoIdentificadorEditModule {
}
