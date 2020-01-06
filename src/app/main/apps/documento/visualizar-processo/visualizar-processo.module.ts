import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {FuseSharedModule} from '@fuse/shared.module';
import {VisualizarProcessoComponent} from './visualizar-processo.component';
import {RouterModule, Routes} from '@angular/router';
import {MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatTooltipModule} from '@angular/material';

const routes: Routes = [
    {
        path: ':processoHandle',
        component: VisualizarProcessoComponent,
        children: [
            {
                path: 'visualizar',
                loadChildren: () => import('app/main/apps/processo/processo-view/processo-view.module').then(m => m.ProcessoViewModule)
            }
        ]
    }
];

@NgModule({
    declarations: [
        VisualizarProcessoComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatIconModule,
        MatButtonModule,
        TranslateModule,
        FuseSharedModule,

        MatTooltipModule,
        MatProgressSpinnerModule

    ],
    providers: [
    ],
    exports: [
        VisualizarProcessoComponent
    ]
})
export class VisualizarProcessoModule {
}
