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
import {DocumentoEditInteligenciaStoreModule} from './store/store.module';
import {DocumentoEditInteligenciaComponent} from './documento-edit-inteligencia.component';
import * as fromGuards from './store/guards';

const routes: Routes = [
    {
        path: '',
        component: DocumentoEditInteligenciaComponent
    }
];

const path = 'app/main/apps/documento/documento-edit/inteligencia';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        DocumentoEditInteligenciaComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatIconModule,
        MatButtonModule,
        MatMenuModule,

        DocumentoEditInteligenciaStoreModule,

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
        DocumentoEditInteligenciaComponent
    ]
})
export class DocumentoEditInteligenciaModule {
    constructor(private resolver: ComponentFactoryResolver) {}

    public resolveComponentFactory(): ComponentFactory<DocumentoEditInteligenciaComponent> {
        return this.resolver.resolveComponentFactory(DocumentoEditInteligenciaComponent);
    }
}
