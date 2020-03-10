import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {AtividadesComponent} from './atividades.component';
import {RouterModule, Routes} from '@angular/router';
import {MatButtonModule, MatIconModule, MatStepperModule, MatTooltipModule} from '@cdk/angular/material';

const routes: Routes = [
    {
        path: '',
        component: AtividadesComponent,
        children: [
            {
                path: 'listar',
                loadChildren: () => import('./atividade-list/atividade-list.module').then(m => m.AtividadeListModule)
            }
        ],
    },
    {
        path: '**',
        redirectTo: 'listar'
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
        CdkSharedModule
    ],
    providers: [
    ],
    exports: [
    ]
})
export class AtividadesModule {
}