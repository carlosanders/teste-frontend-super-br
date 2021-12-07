import {NgModule} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {ModelosComponent} from './modelos.component';
import {RouterModule, Routes} from '@angular/router';
import {MatButtonModule, MatIconModule, MatStepperModule, MatTooltipModule} from '@cdk/angular/material';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: ModelosComponent,
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

const path = 'app/main/apps/modelos';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        ModelosComponent
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
export class ModelosModule {
}
