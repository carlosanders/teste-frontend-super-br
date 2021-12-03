import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CdkSharedModule} from '@cdk/shared.module';
import {TranslateModule} from '@ngx-translate/core';
import {ModeloComponent} from './modelo.component';
import {DocumentoModeloStoreModule} from './store/store.module';
import {CdkModeloGridModule} from '@cdk/components/modelo/cdk-modelo-grid/cdk-modelo-grid.module';
import {DocumentoService} from '@cdk/services/documento.service';
import * as fromGuards from './store/guards';
import {modulesConfig} from 'modules/modules-config';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

const routes: Routes = [
    {
        path: '',
        component: ModeloComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/modelos/modelo';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        ModeloComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CdkModeloGridModule,
        DocumentoModeloStoreModule,
        TranslateModule,
        CdkSharedModule,
        MatFormFieldModule,
        MatTooltipModule,
        MatButtonModule,
        MatIconModule,
    ],
    providers: [
        DocumentoService,
        fromGuards.ResolveGuard
    ]
})
export class ModeloModule {
}
