import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {RegrasEtiquetaComponent} from './regras-etiqueta.component';
import {RouterModule, Routes} from '@angular/router';
import {modulesConfig} from 'modules/modules-config';
import {RegraEtiquetaService} from '@cdk/services/regra-etiqueta.service';

const routes: Routes = [
    {
        path: '',
        component: RegrasEtiquetaComponent,
        children: [
            {
                path       : 'listar',
                loadChildren: () => import('./regra-etiqueta-list/regra-etiqueta-list.module').then(m => m.RegraEtiquetaListModule),
            },
            {
                path       : 'editar',
                loadChildren: () => import('./regra-etiqueta-edit/regra-etiqueta-edit.module').then(m => m.RegraEtiquetaEditModule),
            },
            {
                path: '**',
                redirectTo: 'listar'
            }
        ]
    }

];

const path = 'app/main/apps/coordenador/etiquetas/etiqueta-edit/regras-etiqueta';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        RegrasEtiquetaComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatExpansionModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatTooltipModule,

        TranslateModule,

        CdkSharedModule,
    ],
    providers: [
        RegraEtiquetaService
    ],
    exports: [
        RegrasEtiquetaComponent
    ]
})
export class RegrasEtiquetaModule {
}
