import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FuseSharedModule} from '@fuse/shared.module';

import {TranslateModule} from '@ngx-translate/core';
import {ModeloBlocoComponent} from './modelo-bloco.component';
import {ModeloBlocoStoreModule} from './store/store.module';
import {CdkModeloGridModule} from '@cdk/components/modelo/cdk-modelo-grid/cdk-modelo-grid.module';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {DocumentoService} from '@cdk/services/documento.service';
import * as fromGuards from './store/guards';
import {MatListModule, MatProgressSpinnerModule} from '@angular/material';

const routes: Routes = [
    {
        path: '',
        component: ModeloBlocoComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        ModeloBlocoComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        CdkModeloGridModule,
        MatListModule,
        MatProgressSpinnerModule,

        ModeloBlocoStoreModule,

        TranslateModule,
        FuseSharedModule,
    ],
    providers: [
        ComponenteDigitalService,
        DocumentoService,
        fromGuards.ResolveGuard
    ]
})
export class ModeloBlocoModule {
}
