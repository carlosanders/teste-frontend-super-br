import {ComponentFactory, ComponentFactoryResolver, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CdkSharedModule} from '@cdk/shared.module';

import {TranslateModule} from '@ngx-translate/core';
import {modulesConfig} from 'modules/modules-config';
import {MatIconModule} from '@cdk/angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {DocumentoEditJuntadaComponent} from './documento-edit-juntada.component';
import {DocumentoService} from '@cdk/services/documento.service';
import {DocumentoEditJuntadaStoreModule} from './store/store.module';
import {CdkJuntadaFormModule} from '@cdk/components/juntada/cdk-juntada-form/cdk-juntada-form.module';
import {JuntadaService} from '@cdk/services/juntada.service';
import * as fromGuards from './store/guards';

const routes: Routes = [
    {
        path: '',
        component: DocumentoEditJuntadaComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/documento/documento-edit/juntada';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        DocumentoEditJuntadaComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatIconModule,
        MatButtonModule,
        MatMenuModule,

        DocumentoEditJuntadaStoreModule,

        TranslateModule,
        CdkSharedModule,
        MatTooltipModule,
        CdkJuntadaFormModule,
    ],
    providers: [
        DocumentoService,
        JuntadaService,
        fromGuards.ResolveGuard
    ],
    exports: [
        DocumentoEditJuntadaComponent
    ]
})
export class DocumentoEditJuntadaModule {
    constructor(private resolver: ComponentFactoryResolver) {}

    public resolveComponentFactory(): ComponentFactory<DocumentoEditJuntadaComponent> {
        return this.resolver.resolveComponentFactory(DocumentoEditJuntadaComponent);
    }
}

