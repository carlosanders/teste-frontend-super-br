import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {ComponenteDigitalComponent} from './componente-digital.component';
import {RouterModule, Routes} from '@angular/router';
import {ComponenteDigitalStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {MatButtonModule, MatIconModule} from '@cdk/angular/material';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: ':componenteDigitalHandle',
        component: ComponenteDigitalComponent,
        children: [
            {
                path: 'visualizar',
                loadChildren: () => import('./componente-digital-view/componente-digital-view.module').then(m => m.ComponenteDigitalViewModule),
            }
        ],
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/processo/processo-edit/documentos-avulsos/componente-digital';

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

    ],
    providers: [
        fromGuards.ResolveGuard
    ],
    exports: [
        ComponenteDigitalComponent
    ]
})
export class ComponenteDigitalModule {
}
