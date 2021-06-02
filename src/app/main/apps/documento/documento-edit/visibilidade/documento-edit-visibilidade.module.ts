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
import {DocumentoEditVisibilidadeStoreModule} from './store/store.module';
import {DocumentoEditVisibilidadeComponent} from './documento-edit-visibilidade.component';
import {CdkVisibilidadeFormModule} from '@cdk/components/visibilidade/cdk-visibilidade-form/cdk-visibilidade-form.module';
import {CdkVisibilidadeListModule} from '@cdk/components/visibilidade/cdk-visibilidade-list/cdk-visibilidade-list.module';
import * as fromGuards from './store/guards';

const routes: Routes = [
    {
        path: '',
        component: DocumentoEditVisibilidadeComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/documento/documento-edit/visibilidade';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        DocumentoEditVisibilidadeComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatIconModule,
        MatButtonModule,
        MatMenuModule,

        DocumentoEditVisibilidadeStoreModule,

        TranslateModule,
        CdkSharedModule,
        MatTooltipModule,
        CdkVisibilidadeFormModule,
        CdkVisibilidadeListModule,
    ],
    providers: [
        DocumentoService,
        fromGuards.ResolveGuard
    ],
    exports: [
        DocumentoEditVisibilidadeComponent
    ]
})
export class DocumentoEditVisibilidadeModule {
    constructor(private resolver: ComponentFactoryResolver) {}

    public resolveComponentFactory(): ComponentFactory<DocumentoEditVisibilidadeComponent> {
        return this.resolver.resolveComponentFactory(DocumentoEditVisibilidadeComponent);
    }
}
