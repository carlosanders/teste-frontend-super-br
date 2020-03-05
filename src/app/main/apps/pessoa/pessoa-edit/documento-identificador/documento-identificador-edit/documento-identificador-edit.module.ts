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
