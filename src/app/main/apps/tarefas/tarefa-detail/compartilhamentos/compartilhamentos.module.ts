import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {FuseSharedModule} from '@fuse/shared.module';
import {CompartilhamentosComponent} from './compartilhamentos.component';
import {RouterModule, Routes} from '@angular/router';
import {MatButtonModule, MatIconModule, MatStepperModule, MatTooltipModule} from '@cdk/angular/material';

const routes: Routes = [
    {
        path: '',
        component: CompartilhamentosComponent,
        children: [
            {
                path: 'criar',
                loadChildren: () => import('./compartilhamento-create/compartilhamento-create.module').then(m => m.CompartilhamentoCreateModule)
            },
            {
                path: 'listar',
                loadChildren: () => import('./compartilhamento-list/compartilhamento-list.module').then(m => m.CompartilhamentoListModule)
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
        CompartilhamentosComponent
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
export class CompartilhamentosModule {
}
