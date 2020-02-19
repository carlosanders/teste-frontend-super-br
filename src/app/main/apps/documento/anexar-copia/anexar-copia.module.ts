import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {FuseSharedModule} from '@fuse/shared.module';
import {AnexarCopiaComponent} from './anexar-copia.component';
import {RouterModule, Routes} from '@angular/router';
import {MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatTooltipModule} from '@cdk/angular/material';

const routes: Routes = [
    {
        path: ':processoHandle',
        component: AnexarCopiaComponent,
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
        AnexarCopiaComponent
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
        AnexarCopiaComponent
    ]
})
export class AnexarCopiaModule {
}
