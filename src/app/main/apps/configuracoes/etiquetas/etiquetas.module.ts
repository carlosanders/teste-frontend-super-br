import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
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
import {EtiquetasComponent} from './etiquetas.component';
import {EtiquetaService} from '@cdk/services/etiqueta.service';
import {RouterModule, Routes} from '@angular/router';
import {ModalidadeEtiquetaService} from '@cdk/services/modalidade-etiqueta.service';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: EtiquetasComponent,
        children: [
            {
                path       : 'listar',
                loadChildren: () => import('./etiqueta-list/etiqueta-list.module').then(m => m.EtiquetaListModule),
            },
            {
                path       : 'editar',
                loadChildren: () => import('./etiqueta-edit/etiqueta-edit.module').then(m => m.EtiquetaEditModule),
            },
            {
                path: '**',
                redirectTo: 'listar'
            }
        ]
    }
];

const path = 'app/main/apps/configuracoes/etiquetas';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        EtiquetasComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatExpansionModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatCheckboxModule,
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
        EtiquetaService,
        ModalidadeEtiquetaService
    ],
    exports: [
        EtiquetasComponent
    ]
})
export class EtiquetasModule {
}
