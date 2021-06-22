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

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';

import {VinculacaoPessoaBarramentoEditComponent} from './vinculacao-pessoa-barramento-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {VinculacaoPessoaBarramentoEditStoreModule} from './store/store.module';

import * as fromGuards from './store/guards';
import {CdkVinculacaoPessoaBarramentoFormModule} from "@cdk/components/vinculacao-pessoa-barramento/cdk-vinculacao-pessoa-barramento-form/cdk-vinculacao-pessoa-barramento-form.module";
import {VinculacaoPessoaBarramentoService} from "@cdk/services/vinculacao-pessoa-barramento.service";

const routes: Routes = [
    {
        path: ':vinculacaoPessoaBarramentoHandle',
        component: VinculacaoPessoaBarramentoEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        VinculacaoPessoaBarramentoEditComponent
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

        CdkVinculacaoPessoaBarramentoFormModule,

        VinculacaoPessoaBarramentoEditStoreModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
        VinculacaoPessoaBarramentoService,
        fromGuards.ResolveGuard
    ]
})
export class VinculacaoPessoaBarramentoEditModule {
}
