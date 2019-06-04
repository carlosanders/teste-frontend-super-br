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

import {TramitacaoEditComponent} from './tramitacao-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkTramitacaoFormModule} from '@cdk/components/tramitacao/cdk-tramitacao-form/cdk-tramitacao-form.module';
import {TramitacaoEditStoreModule} from './store/store.module';
import {TramitacaoService} from '@cdk/services/tramitacao.service';

import * as fromGuards from './store/guards';

const routes: Routes = [
    {
        path: ':tramitacaoHandle',
        component: TramitacaoEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        TramitacaoEditComponent
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

        CdkTramitacaoFormModule,

        TramitacaoEditStoreModule,

        TranslateModule,

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [
        TramitacaoService,
        fromGuards.ResolveGuard
    ]
})
export class TramitacaoEditModule {
}
