import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CdkSharedModule} from '@cdk/shared.module';

import {TranslateModule} from '@ngx-translate/core';
import {VisibilidadeComponent} from './visibilidade.component';
import {VisibilidadeStoreModule} from './store/store.module';
import {CdkModeloGridModule} from '@cdk/components/modelo/cdk-modelo-grid/cdk-modelo-grid.module';
import * as fromGuards from './store/guards';
import {
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {CdkVisibilidadeFormModule} from '@cdk/components/visibilidade/cdk-visibilidade-form/cdk-visibilidade-form.module';
import {CdkVisibilidadeListModule} from '@cdk/components/visibilidade/cdk-visibilidade-list/cdk-visibilidade-list.module';

const routes: Routes = [
    {
        path: ':processoHandle',
        component: VisibilidadeComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        VisibilidadeComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        CdkModeloGridModule,
        MatListModule,
        MatProgressSpinnerModule,

        VisibilidadeStoreModule,

        TranslateModule,
        CdkSharedModule,
        CdkVisibilidadeFormModule,
        CdkVisibilidadeListModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
    ],
    providers: [
        fromGuards.ResolveGuard
    ]
})
export class VisibilidadeModule {
}
