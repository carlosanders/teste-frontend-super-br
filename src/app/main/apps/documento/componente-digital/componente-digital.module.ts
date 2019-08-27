import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {FuseSharedModule} from '@fuse/shared.module';
import {ComponenteDigitalComponent} from './componente-digital.component';
import {RouterModule, Routes} from '@angular/router';
import {ComponenteDigitalStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';

const routes: Routes = [
    {
        path: ':componenteDigitalHandle',
        component: ComponenteDigitalComponent,
        children: [
            {
                path: 'assinaturas',
                loadChildren: './assinaturas/assinaturas.module#AssinaturasModule',
            },
            {
                path: 'visualizar',
                loadChildren: './componente-digital-view/componente-digital-view.module#ComponenteDigitalViewModule',
            },
            {
                path: 'editor',
                loadChildren: './componente-digital-ckeditor/componente-digital-ckeditor.module#ComponenteDigitalCkeditorModule',
            },
            {
                path: 'empty',
                loadChildren: './componente-digital-empty/componente-digital-empty.module#ComponenteDigitalEmptyModule',
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
