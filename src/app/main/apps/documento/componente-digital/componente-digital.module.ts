import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {ComponenteDigitalComponent} from './componente-digital.component';
import {RouterModule, Routes} from '@angular/router';
import {ComponenteDigitalStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {MatButtonModule, MatIconModule} from '@cdk/angular/material';
import {modulesConfig} from 'modules/modules-config';
import {DocumentoEditInteligenciaStoreModule} from '../documento-edit/inteligencia/store/store.module';
import {DocumentoAvulsoEditInteligenciaStoreModule} from '../documento-avulso-edit/inteligencia/store/store.module';

const routes: Routes = [
    {
        path: ':componenteDigitalHandle',
        component: ComponenteDigitalComponent,
        canActivate: [fromGuards.ResolveGuard],
        children: [
            {
                path: 'assinaturas',
                loadChildren: () => import('./assinaturas/assinaturas.module').then(m => m.AssinaturasModule),
            },
            {
                path: 'visualizar',
                loadChildren: () => import('./componente-digital-view/componente-digital-view.module').then(m => m.ComponenteDigitalViewModule),
            },
            {
                path: 'visualizar/:chaveAcessoHandle',
                loadChildren: () => import('./componente-digital-view/componente-digital-view.module').then(m => m.ComponenteDigitalViewModule),
            },
            {
                path: 'editor',
                loadChildren: () => import('./componente-digital-ckeditor/componente-digital-ckeditor.module').then(m => m.ComponenteDigitalCkeditorModule),
            },
            {
                path: 'empty',
                loadChildren: () => import('./componente-digital-empty/componente-digital-empty.module').then(m => m.ComponenteDigitalEmptyModule),
            }
        ]
    }
];

const path = 'app/main/apps/documento/componente-digital';

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
        DocumentoEditInteligenciaStoreModule,
        DocumentoAvulsoEditInteligenciaStoreModule

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
