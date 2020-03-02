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

import {InteressadoEditComponent} from './interessado-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkInteressadoFormModule} from '@cdk/components/interessado/cdk-interessado-form/cdk-interessado-form.module';
import {InteressadoEditStoreModule} from './store/store.module';
import {InteressadoService} from '@cdk/services/interessado.service';

import * as fromGuards from './store/guards';

const routes: Routes = [
    {
        path: ':interessadoHandle',
        component: InteressadoEditComponent,
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
        InteressadoEditComponent
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

        CdkInteressadoFormModule,

        InteressadoEditStoreModule,

        TranslateModule,

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [
        InteressadoService,
        fromGuards.ResolveGuard
    ]
})
export class InteressadoEditModule {
}
