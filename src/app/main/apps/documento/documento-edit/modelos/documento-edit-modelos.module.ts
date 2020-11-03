import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CdkSharedModule} from '@cdk/shared.module';

import {TranslateModule} from '@ngx-translate/core';
import {CdkModeloGridModule} from '@cdk/components/modelo/cdk-modelo-grid/cdk-modelo-grid.module';
import * as fromGuards from './store/guards';
import {DocumentoEditModelosComponent} from './documento-edit-modelos.component';
import {modulesConfig} from '../../../../../../modules/modules-config';
import {DocumentoService} from '@cdk/services/documento.service';
import {ModeloService} from '@cdk/services/modelo.service';
import {DocumentoEditModelosStoreModule} from './store/store.module';

const routes: Routes = [
    {
        path: '',
        component: DocumentoEditModelosComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/documento/documento-edit/modelos';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        DocumentoEditModelosComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CdkModeloGridModule,

        DocumentoEditModelosStoreModule,

        TranslateModule,
        CdkSharedModule,
    ],
    providers: [
        DocumentoService,
        ModeloService,
        fromGuards.ResolveGuard
    ]
})
export class DocumentoEditModelosModule {
}
