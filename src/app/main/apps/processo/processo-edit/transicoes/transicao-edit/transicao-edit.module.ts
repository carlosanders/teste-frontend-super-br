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

import {TransicaoEditComponent} from './transicao-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkTransicaoFormModule} from '@cdk/components/transicao/cdk-transicao-form/cdk-transicao-form.module';
import {TransicaoEditStoreModule} from './store/store.module';
import {TransicaoService} from '@cdk/services/transicao.service';

import * as fromGuards from './store/guards';

const routes: Routes = [
    {
        path: ':transicaoHandle',
        component: TransicaoEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        TransicaoEditComponent
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

        CdkTransicaoFormModule,

        TransicaoEditStoreModule,

        TranslateModule,

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [
        TransicaoService,
        fromGuards.ResolveGuard
    ]
})
export class TransicaoEditModule {
}
