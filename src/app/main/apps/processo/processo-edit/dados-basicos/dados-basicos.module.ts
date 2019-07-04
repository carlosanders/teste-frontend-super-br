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
import {CdkProcessoFormModule} from '@cdk/components/processo/cdk-processo-form/cdk-processo-form.module';
import {DadosBasicosStoreModule} from './store/store.module';
import {ProcessoService} from '@cdk/services/processo.service';
import * as fromGuards from './store/guards';

const routes: Routes = [
    {
        path: '',
        component: DadosBasicosComponent,
        children: [
            {
                path       : 'pessoa',
                loadChildren: 'app/main/apps/pessoa/pessoa.module#PessoaModule',
            }
        ],
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

        CdkProcessoFormModule,

        DadosBasicosStoreModule,

        TranslateModule,

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [
        ProcessoService,
        fromGuards.ResolveGuard
    ]
})
export class DadosBasicosModule {
}
