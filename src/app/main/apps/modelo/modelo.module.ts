import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FuseSharedModule} from '@fuse/shared.module';

import {TranslateModule} from '@ngx-translate/core';
import {ModeloComponent} from './modelo.component';
import {DocumentoModeloStoreModule} from './store/store.module';
import {CdkModeloGridModule} from '@cdk/components/modelo/cdk-modelo-grid/cdk-modelo-grid.module';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {DocumentoService} from '@cdk/services/documento.service';
import * as fromGuards from './store/guards';

const routes: Routes = [
    {
        path: '',
        component: ModeloComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        ModeloComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        CdkModeloGridModule,

        DocumentoModeloStoreModule,

        TranslateModule,
        FuseSharedModule,
    ],
    providers: [
        ComponenteDigitalService,
        DocumentoService,
        fromGuards.ResolveGuard
    ]
})
export class ModeloModule {
}
