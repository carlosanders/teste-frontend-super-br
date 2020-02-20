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

import {FuseSharedModule} from '@fuse/shared.module';
import {FuseSidebarModule} from '@fuse/components';

import {RemessaEditComponent} from './remessa-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkRemessaFormModule} from '@cdk/components/remessa/cdk-remessa-form/cdk-remessa-form.module';
import {RemessaEditStoreModule} from './store/store.module';
import {TramitacaoService} from '@cdk/services/tramitacao.service';

import * as fromGuards from './store/guards';

const routes: Routes = [
    {
        path: ':tramitacaoHandle',
        component: RemessaEditComponent,
        children: [
            {
                path       : 'pessoa',
                loadChildren: () => import('app/main/apps/pessoa/pessoa.module').then(m => m.PessoaModule),
            }
        ],
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        RemessaEditComponent
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

        CdkRemessaFormModule,

        RemessaEditStoreModule,

        TranslateModule,

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [
        TramitacaoService,
        fromGuards.ResolveGuard
    ]
})
export class RemessaEditModule {
}
