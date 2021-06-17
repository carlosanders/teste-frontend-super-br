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
    MatTableModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {DocumentoIdentificadorComponent} from './documento-identificador.component';
import {DocumentoIdentificadorService} from '@cdk/services/documento-identificador.service';
import {RouterModule, Routes} from '@angular/router';
import {modulesConfig} from 'modules/modules-config';
import {MatTooltipModule} from '@angular/material/tooltip';

const routes: Routes = [
    {
        path: '',
        component: DocumentoIdentificadorComponent,
        children: [
            {
                path       : 'listar',
                loadChildren: () => import('./documento-identificador-list/documento-identificador-list.module').then(m => m.DocumentoIdentificadorListModule),
            },
            {
                path       : 'editar',
                loadChildren: () => import('./documento-identificador-edit/documento-identificador-edit.module').then(m => m.DocumentoIdentificadorEditModule),
            },
            {
                path: '**',
                redirectTo: 'listar'
            }
        ]
    }
];

const path = 'app/main/apps/pessoa/pessoa-edit/documento-identificador';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        DocumentoIdentificadorComponent
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

        TranslateModule,

        CdkSharedModule,
        MatTooltipModule,
    ],
    providers: [
        DocumentoIdentificadorService
    ],
    exports: [
        DocumentoIdentificadorComponent
    ]
})
export class DocumentoIdentificadorModule {
}
