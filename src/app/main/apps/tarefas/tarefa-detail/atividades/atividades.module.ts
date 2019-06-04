import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {FuseSharedModule} from '@fuse/shared.module';
import {AtividadesComponent} from './atividades.component';
import {RouterModule, Routes} from '@angular/router';
import {MatButtonModule, MatIconModule, MatStepperModule, MatTooltipModule} from '@angular/material';

const routes: Routes = [
    {
        path: '',
        component: AtividadesComponent,
        children: [
            {
                path: 'criar',
                loadChildren: './atividade-create/atividade-create.module#AtividadeCreateModule'
            },
            {
                path: 'listar',
                loadChildren: './atividade-list/atividade-list.module#AtividadeListModule'
            }
        ],
    },
    {
        path: '**',
        redirectTo: 'criar'
    }
];

@NgModule({
    declarations: [
        AtividadesComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        TranslateModule,
        MatStepperModule,
        FuseSharedModule
    ],
    providers: [
    ],
    exports: [
    ]
})
export class AtividadesModule {
}
