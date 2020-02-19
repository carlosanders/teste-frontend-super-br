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

import {VinculacaoProcessoEditComponent} from './vinculacao-processo-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkVinculacaoProcessoFormModule} from '@cdk/components/vinculacao-processo/cdk-vinculacao-processo-form/cdk-vinculacao-processo-form.module';
import {VinculacaoProcessoEditStoreModule} from './store/store.module';
import {VinculacaoProcessoService} from '@cdk/services/vinculacao-processo.service';

import * as fromGuards from './store/guards';

const routes: Routes = [
    {
        path: ':vinculacaoProcessoHandle',
        component: VinculacaoProcessoEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        VinculacaoProcessoEditComponent
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

        CdkVinculacaoProcessoFormModule,

        VinculacaoProcessoEditStoreModule,

        TranslateModule,

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [
        VinculacaoProcessoService,
        fromGuards.ResolveGuard
    ]
})
export class VinculacaoProcessoEditModule {
}
