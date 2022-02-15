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
import {DocumentoEditComponentesDigitaisStoreModule} from './store/store.module';
import {DocumentoEditComponentesDigitaisComponent} from './documento-edit-componentes-digitais.component';
import {CdkComponenteDigitalCardListModule} from '@cdk/components/componente-digital/cdk-componente-digital-card-list/cdk-componente-digital-card-list.module';
import {CdkComponenteDigitalGridModule} from '@cdk/components/componente-digital/cdk-componente-digital-grid/cdk-componente-digital-grid.module';
import * as fromGuards from './store/guards';
import {CdkComponenteDigitalFormModule} from '@cdk/components/componente-digital/cdk-componente-digital-form/cdk-componente-digital-form.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

const routes: Routes = [
    {
        path: '',
        component: DocumentoEditComponentesDigitaisComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/documento/documento-edit/componentes-digitais';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        DocumentoEditComponentesDigitaisComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatIconModule,
        MatButtonModule,
        MatMenuModule,

        DocumentoEditComponentesDigitaisStoreModule,

        TranslateModule,
        CdkSharedModule,
        MatTooltipModule,
        CdkComponenteDigitalCardListModule,
        CdkComponenteDigitalGridModule,
        CdkComponenteDigitalFormModule,
        MatProgressSpinnerModule,
    ],
    providers: [
        DocumentoService,
        fromGuards.ResolveGuard
    ],
    exports: [
        DocumentoEditComponentesDigitaisComponent
    ]
})
export class DocumentoEditComponentesDigitaisModule {
    constructor(private resolver: ComponentFactoryResolver) {}

    public resolveComponentFactory(): ComponentFactory<DocumentoEditComponentesDigitaisComponent> {
        return this.resolver.resolveComponentFactory(DocumentoEditComponentesDigitaisComponent);
    }
}
