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
import {RepositoriosComponent} from './repositorios.component';
import {RepositorioService} from '@cdk/services/repositorio.service';
import {RouterModule, Routes} from '@angular/router';
import {ModalidadeRepositorioService} from '@cdk/services/modalidade-repositorio.service';
import {MatTooltipModule} from '@angular/material/tooltip';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: RepositoriosComponent,
        children: [
            {
                path       : 'listar',
                loadChildren: () => import('./repositorio-list/repositorio-list.module').then(m => m.RepositorioListModule),
            },
            {
                path       : 'editar',
                loadChildren: () => import('./repositorio-edit/repositorio-edit.module').then(m => m.RepositorioEditModule),
            },
            {
                path: '**',
                redirectTo: 'listar'
            }
        ]
    }

];

const path = 'app/main/apps/configuracoes/repositorios';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        RepositoriosComponent
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
        RepositorioService,
        ModalidadeRepositorioService
    ],
    exports: [
        RepositoriosComponent
    ]
})
export class RepositoriosModule {
}
