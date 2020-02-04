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

import {AproveitarDadosComponent} from './aproveitar-dados.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkProcessoAproveitarDadosFormModule} from '@cdk/components/processo/cdk-processo-aproveitar-dados-form/cdk-processo-aproveitar-dados-form.module';
import {AproveitarDadosStoreModule} from './store/store.module';
import {ProcessoService} from '@cdk/services/processo.service';
import * as fromGuards from './store/guards';

const routes: Routes = [
    {
        path: '',
        component: AproveitarDadosComponent,
        children: [
            {
               // path       : 'aproveitar-dados',
               path       : '',
               // loadChildren: () => import('app/main/apps/aproveitar-dados/aproveitar-dados.module').then(m => m.AproveitarDadosModule),
            }
        ],
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        AproveitarDadosComponent
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

        CdkProcessoAproveitarDadosFormModule,

        AproveitarDadosStoreModule,

        TranslateModule,

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [
        ProcessoService,
        fromGuards.ResolveGuard
    ]
})
export class AproveitarDadosModule {
}
