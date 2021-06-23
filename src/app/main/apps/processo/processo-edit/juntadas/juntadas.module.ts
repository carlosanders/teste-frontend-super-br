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
import {JuntadasComponent} from './juntadas.component';
import {JuntadaService} from '@cdk/services/juntada.service';
import {RouterModule, Routes} from '@angular/router';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: JuntadasComponent,
        children: [
            {
                path       : 'listar',
                loadChildren: () => import('./juntada-list/juntada-list.module').then(m => m.JuntadaListModule),
            },
            {
                path       : 'desentranhar',
                loadChildren: () => import('./desentranhamento-create-bloco/desentranhamento-create-bloco.module').then(m => m.DesentranhamentoCreateBlocoModule),
            },
            {
                path       : 'copiar',
                loadChildren: () => import('./documento-copia-create-bloco/documento-copia-create-bloco.module').then(m => m.DocumentoCopiaCreateBlocoModule),
            },
            {
                path       : 'vincular',
                loadChildren: () => import('./vinculacao-documento-create/vinculacao-documento-create.module').then(m => m.VinculacaoDocumentoCreateModule),
            },
            {
                path: '**',
                redirectTo: 'listar'
            }
        ]
    }
];

const path = 'app/main/apps/processo/processo-edit/juntadas';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        JuntadasComponent
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
    ],
    providers: [
        JuntadaService
    ],
    exports: [
        JuntadasComponent
    ]
})
export class JuntadasModule {
}
