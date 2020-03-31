import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
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
                path: 'visualizar/:chaveAcessoHandle',
                loadChildren: () => import('./componente-digital-view/componente-digital-view.module').then(m => m.ComponenteDigitalViewModule),
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
        CdkSharedModule,

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