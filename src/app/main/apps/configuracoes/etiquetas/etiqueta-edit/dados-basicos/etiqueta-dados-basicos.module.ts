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

import {DadosBasicosComponent} from './dados-basicos.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkEtiquetaFormModule} from '@cdk/components/etiqueta/cdk-etiqueta-form/cdk-etiqueta-form.module';
import {DadosBasicosStoreModule} from './store/store.module';
import {EtiquetaService} from '@cdk/services/etiqueta.service';

import * as fromGuards from './store/guards';
import {LoginService} from 'app/main/auth/login/login.service';

const routes: Routes = [
    {
        path: ':etiquetaHandle',
        component: DadosBasicosComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        DadosBasicosComponent
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

        CdkEtiquetaFormModule,

        DadosBasicosStoreModule,

        TranslateModule,

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [
        EtiquetaService,
        LoginService,
        fromGuards.ResolveGuard
    ]
})
export class EtiquetaDadosBasicosModule {
}
