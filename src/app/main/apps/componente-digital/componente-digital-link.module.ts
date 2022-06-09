import {NgModule} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {ComponenteDigitalComponent} from './componente-digital.component';
import {RouterModule, Routes} from '@angular/router';
import {ComponenteDigitalStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {MatButtonModule, MatIconModule} from '@cdk/angular/material';
import {modulesConfig} from 'modules/modules-config';
import {
    CdkComponenteDigitalViewModule
} from "../../../../@cdk/components/componente-digital/cdk-componente-digital-view/cdk-componente-digital-view.module";

const routes: Routes = [
    {
        path: ':componenteDigitalHandle',
        component: ComponenteDigitalComponent,
        canActivate: [fromGuards.ResolveGuard],
    }
];

const path = 'app/main/apps/componente-digital';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        ComponenteDigitalComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        MatIconModule,
        MatButtonModule,
        TranslateModule,
        CdkSharedModule,
        ComponenteDigitalStoreModule,
        CdkComponenteDigitalViewModule,
    ],
    providers: [
        fromGuards.ResolveGuard
    ],
    exports: [
        ComponenteDigitalComponent
    ]
})
export class ComponenteDigitalLinkModule {
}
