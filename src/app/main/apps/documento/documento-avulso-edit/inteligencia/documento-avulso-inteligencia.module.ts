import {ComponentFactory, ComponentFactoryResolver, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CdkSharedModule} from '@cdk/shared.module';

import {TranslateModule} from '@ngx-translate/core';
import {modulesConfig} from 'modules/modules-config';
import {MatIconModule} from '@cdk/angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {DocumentoService} from '@cdk/services/documento.service';
import {RepositorioService} from '@cdk/services/repositorio.service';
import {CdkRepositorioGridModule} from '@cdk/components/repositorio/cdk-repositorio-grid/cdk-repositorio-grid.module';
import {DocumentoAvulsoEditInteligenciaStoreModule} from './store/store.module';
import {DocumentoAvulsoInteligenciaComponent} from './documento-avulso-inteligencia.component';
import * as fromGuards from './store/guards';

const routes: Routes = [
    {
        path: '',
        component: DocumentoAvulsoInteligenciaComponent
    }
];

const path = 'app/main/apps/documento/documento-avulso-edit/inteligencia';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        DocumentoAvulsoInteligenciaComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatIconModule,
        MatButtonModule,
        MatMenuModule,

        DocumentoAvulsoEditInteligenciaStoreModule,

        TranslateModule,
        CdkSharedModule,
        MatTooltipModule,
        CdkRepositorioGridModule,
    ],
    providers: [
        DocumentoService,
        RepositorioService,
        fromGuards.ResolveGuard
    ],
    exports: [
        DocumentoAvulsoInteligenciaComponent
    ]
})
export class DocumentoAvulsoInteligenciaModule {
    constructor(private resolver: ComponentFactoryResolver) {}

    public resolveComponentFactory(): ComponentFactory<DocumentoAvulsoInteligenciaComponent> {
        return this.resolver.resolveComponentFactory(DocumentoAvulsoInteligenciaComponent);
    }
}
