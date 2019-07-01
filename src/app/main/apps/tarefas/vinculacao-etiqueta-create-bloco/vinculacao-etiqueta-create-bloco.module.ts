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
    MatProgressSpinnerModule, MatTooltipModule, MatListModule
} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {FuseSharedModule} from '@fuse/shared.module';
import {FuseSidebarModule} from '@fuse/components';

import {VinculacaoEtiquetaCreateBlocoComponent} from './vinculacao-etiqueta-create-bloco.component';
import {RouterModule, Routes} from '@angular/router';
import {VinculacaoEtiquetaCreateBlocoStoreModule} from './store/store.module';
import {VinculacaoEtiquetaService} from '@cdk/services/vinculacao-etiqueta.service';
import {LoginService} from 'app/main/auth/login/login.service';
import {CdkEtiquetaChipsModule} from '@cdk/components/etiqueta/cdk-etiqueta-chips/cdk-etiqueta-chips.module';

const routes: Routes = [
    {
        path: '',
        component: VinculacaoEtiquetaCreateBlocoComponent
    }
];

@NgModule({
    declarations: [
        VinculacaoEtiquetaCreateBlocoComponent
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
        MatListModule,

        CdkEtiquetaChipsModule,

        VinculacaoEtiquetaCreateBlocoStoreModule,

        TranslateModule,

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [
        VinculacaoEtiquetaService,
        LoginService,
    ]
})
export class VinculacaoEtiquetaCreateBlocoModule {
}
