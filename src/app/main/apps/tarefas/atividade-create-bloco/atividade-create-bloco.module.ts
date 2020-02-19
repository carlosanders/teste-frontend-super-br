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
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {FuseSharedModule} from '@fuse/shared.module';
import {FuseSidebarModule} from '@fuse/components';

import {AtividadeCreateBlocoComponent} from './atividade-create-bloco.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkAtividadeFormModule} from '@cdk/components/atividade/cdk-atividade-form/cdk-atividade-form.module';
import {AtividadeCreateBlocoStoreModule} from './store/store.module';
import {AtividadeService} from '@cdk/services/atividade.service';
import {LoginService} from 'app/main/auth/login/login.service';
import {DocumentoService} from '@cdk/services/documento.service';
import {CdkDocumentoCardListModule} from '@cdk/components/documento/cdk-documento-card-list/cdk-documento-card-list.module';

const routes: Routes = [
    {
        path: '',
        component: AtividadeCreateBlocoComponent
    }
];

@NgModule({
    declarations: [
        AtividadeCreateBlocoComponent
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

        CdkAtividadeFormModule,

        AtividadeCreateBlocoStoreModule,

        TranslateModule,

        FuseSharedModule,
        FuseSidebarModule,
        CdkDocumentoCardListModule,
    ],
    providers: [
        AtividadeService,
        DocumentoService,
        LoginService,
    ]
})
export class AtividadeCreateBlocoModule {
}
