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
import {PessoaComponent} from './pessoa.component';
import {RouterModule, Routes} from '@angular/router';
import {PessoaService} from '@cdk/services/pessoa.service';
import {modulesConfig} from 'modules/modules-config';
import {PessoaEditService} from './pessoa-edit/pessoa-edit.service';

const routes: Routes = [
    {
        path: '',
        component: PessoaComponent,
        children: [
            {
                path       : 'listar',
                loadChildren: () => import('./pessoa-list/pessoa-list.module').then(m => m.PessoaListModule),
            },
            {
                path       : 'editar',
                loadChildren: () => import('./pessoa-edit/pessoa-edit.module').then(m => m.PessoaEditModule),
            },
            {
                path: '**',
                redirectTo: 'listar'
            }
        ]
    }
];

const path = 'app/main/apps/pessoa';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        PessoaComponent
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

        CdkSharedModule
    ],
    providers: [
        PessoaService,
        PessoaEditService
    ],
    exports: [
        PessoaComponent
    ]
})
export class PessoaModule {
}
