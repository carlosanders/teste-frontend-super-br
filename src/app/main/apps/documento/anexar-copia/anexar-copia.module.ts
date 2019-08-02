import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {FuseSharedModule} from '@fuse/shared.module';
import {AnexarCopiaComponent} from './anexar-copia.component';
import {RouterModule, Routes} from '@angular/router';
import {MatButtonModule, MatIconModule, MatTooltipModule} from '@angular/material';

const routes: Routes = [
    {
        path: ':processoHandle',
        component: AnexarCopiaComponent,
        children: [
            {
                path: 'visualizar',
                loadChildren: 'app/main/apps/processo/processo-view/processo-view.module#ProcessoViewModule'
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

        MatTooltipModule

    ],
    providers: [
    ],
    exports: [
        AnexarCopiaComponent
    ]
})
export class AnexarCopiaModule {
}
