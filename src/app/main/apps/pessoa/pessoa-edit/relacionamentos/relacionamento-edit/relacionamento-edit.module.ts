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

import {RelacionamentoEditComponent} from './relacionamento-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkRelacionamentoPessoalFormModule} from '@cdk/components/relacionamento-pessoal/cdk-relacionamento-pessoal-form/cdk-relacionamento-pessoal-form.module';
import {RelacionamentoEditStoreModule} from './store/store.module';
import {RelacionamentoPessoalService} from '@cdk/services/relacionamento-pessoal.service';

import * as fromGuards from './store/guards';

const routes: Routes = [
    {
        path: ':relacionamentoHandle',
        component: RelacionamentoEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        RelacionamentoEditComponent
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

        CdkRelacionamentoPessoalFormModule,

        RelacionamentoEditStoreModule,

        TranslateModule,

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [
        RelacionamentoPessoalService,
        fromGuards.ResolveGuard
    ]
})
export class RelacionamentoEditModule {
}