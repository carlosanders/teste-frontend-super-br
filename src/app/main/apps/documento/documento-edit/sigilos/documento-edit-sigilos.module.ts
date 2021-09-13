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
import {DocumentoEditSigilosComponent} from './documento-edit-sigilos.component';
import {DocumentoEditSigilosStoreModule} from './store/store.module';
import {CdkSigiloFormModule} from '@cdk/components/sigilo/cdk-sigilo-form/cdk-sigilo-form.module';
import {CdkSigiloGridModule} from '@cdk/components/sigilo/cdk-sigilo-grid/cdk-sigilo-grid.module';
import * as fromGuards from './store/guards';
import {SigiloService} from '@cdk/services/sigilo.service';
import {CdkConfirmDialogModule} from '@cdk/components';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

const routes: Routes = [
    {
        path: '',
        component: DocumentoEditSigilosComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/documento/documento-edit/sigilos';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        DocumentoEditSigilosComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatIconModule,
        MatButtonModule,
        MatMenuModule,

        DocumentoEditSigilosStoreModule,

        TranslateModule,
        CdkSharedModule,
        MatTooltipModule,
        CdkSigiloFormModule,
        CdkSigiloGridModule,
        CdkConfirmDialogModule,
        MatProgressSpinnerModule,
    ],
    providers: [
        DocumentoService,
        SigiloService,
        fromGuards.ResolveGuard
    ],
    exports: [
        DocumentoEditSigilosComponent
    ]
})
export class DocumentoEditSigilosModule {
    constructor(private resolver: ComponentFactoryResolver) {}

    public resolveComponentFactory(): ComponentFactory<DocumentoEditSigilosComponent> {
        return this.resolver.resolveComponentFactory(DocumentoEditSigilosComponent);
    }
}


