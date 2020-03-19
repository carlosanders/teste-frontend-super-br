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

import {NumeroUnicoDocumentoEditComponent} from './numero-unico-documento-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {NumeroUnicoDocumentoEditStoreModule} from './store/store.module';


import * as fromGuards from './store/guards';
import {LoginService} from '../../../../auth/login/login.service';
import {CdkNumeroUnicoDocumentoFormModule} from '@cdk/components/numero-unico-documento/cdk-numero-unico-documento-form/cdk-numero-unico-documento-form.module';
import {NumeroUnicoDocumentoService} from '@cdk/services/numero-unico-documento.service';

const routes: Routes = [
    {
        path: ':numeroUnicoDocumentoHandle',
        component: NumeroUnicoDocumentoEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        NumeroUnicoDocumentoEditComponent
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

        NumeroUnicoDocumentoEditStoreModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
        CdkNumeroUnicoDocumentoFormModule,
    ],
    providers: [
        NumeroUnicoDocumentoService,
        LoginService,
        fromGuards.ResolveGuard
    ]
})
export class NumeroUnicoDocumentoEditModule {
}
