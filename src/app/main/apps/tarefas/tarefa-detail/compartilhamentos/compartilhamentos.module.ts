import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {FuseSharedModule} from '@fuse/shared.module';
import {CompartilhamentosComponent} from './compartilhamentos.component';
import {RouterModule, Routes} from '@angular/router';
import {MatButtonModule, MatIconModule, MatStepperModule, MatTooltipModule} from '@angular/material';

const routes: Routes = [
    {
        path: '',
        component: CompartilhamentosComponent,
        children: [
            {
                path: 'criar',
                loadChildren: './compartilhamento-create/compartilhamento-create.module#CompartilhamentoCreateModule'
            },
            {
                path: 'listar',
                loadChildren: './compartilhamento-list/compartilhamento-list.module#CompartilhamentoListModule'
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
