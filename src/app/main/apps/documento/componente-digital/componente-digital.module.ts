import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {FuseSharedModule} from '@fuse/shared.module';
import {ComponenteDigitalComponent} from './componente-digital.component';
import {RouterModule, Routes} from '@angular/router';
import {ComponenteDigitalStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {MatButtonModule, MatIconModule} from '@cdk/angular/material';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';

const routes: Routes = [
    {
        path: ':componenteDigitalHandle',
        component: ComponenteDigitalComponent,
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
        ],
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        ComponenteDigitalComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatIconModule,
        MatButtonModule,
        TranslateModule,
        FuseSharedModule,

        ComponenteDigitalStoreModule,

    ],
    providers: [
        ComponenteDigitalService,
        fromGuards.ResolveGuard
    ],
    exports: [
        ComponenteDigitalComponent
    ]
})
export class ComponenteDigitalModule {
}
