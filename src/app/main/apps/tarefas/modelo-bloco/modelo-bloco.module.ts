import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CdkSharedModule} from '@cdk/shared.module';

import {TranslateModule} from '@ngx-translate/core';
import {ModeloBlocoComponent} from './modelo-bloco.component';
import {modulesConfig} from 'modules/modules-config';
import {MatButtonModule, MatIconModule, MatTooltipModule} from '@cdk/angular/material';
const routes: Routes = [
    {
        path: '',
        component: ModeloBlocoComponent,
        children: [
            {
                path: 'modelo',
                loadChildren: () => import('./modelo/modelo.module').then(m => m.ModeloModule)
            },
            {
                path: 'componente-digital',
                loadChildren: () => import('./componentes-digitais/modelos-componentes-digitais.module').then(m => m.ModelosComponentesDigitaisModule)
            }
        ],
    },
    {
        path: '**',
        redirectTo: 'modelo'
    }
];

const path = 'app/main/apps/tarefas/modelo-bloco';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        ModeloBlocoComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        TranslateModule,
        CdkSharedModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
    ],
    providers: [
    ]
})
export class ModeloBlocoModule {
}
