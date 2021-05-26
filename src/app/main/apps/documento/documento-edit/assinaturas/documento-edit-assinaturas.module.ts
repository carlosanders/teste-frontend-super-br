import {ComponentFactory, ComponentFactoryResolver, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CdkSharedModule} from '@cdk/shared.module';

import {TranslateModule} from '@ngx-translate/core';
import {modulesConfig} from 'modules/modules-config';
import {MatIconModule} from '@cdk/angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {AssinaturaService} from '@cdk/services/assinatura.service';
import {DocumentoEditAssinaturasStoreModule} from './store/store.module';
import {DocumentoEditAssinaturasComponent} from './documento-edit-assinaturas.component';
import {CdkAssinaturaGridModule} from '@cdk/components/assinatura/cdk-assinatura-grid/cdk-assinatura-grid.module';
import * as fromGuards from './store/guards';

const routes: Routes = [
    {
        path: '',
        component: DocumentoEditAssinaturasComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/documento/documento-edit/assinaturas';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        DocumentoEditAssinaturasComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatIconModule,
        MatButtonModule,
        MatMenuModule,

        DocumentoEditAssinaturasStoreModule,

        TranslateModule,
        CdkSharedModule,
        MatTooltipModule,
        CdkAssinaturaGridModule,
    ],
    providers: [
        AssinaturaService,
        fromGuards.ResolveGuard
    ],
    exports: [
        DocumentoEditAssinaturasComponent
    ]
})
export class DocumentoEditAssinaturasModule {
    constructor(private resolver: ComponentFactoryResolver) {}

    public resolveComponentFactory(): ComponentFactory<DocumentoEditAssinaturasComponent> {
        return this.resolver.resolveComponentFactory(DocumentoEditAssinaturasComponent);
    }
}
