import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatAutocompleteModule,
    MatExpansionModule
} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {FuseSharedModule} from '@fuse/shared.module';
import {AfastamentosComponent} from './afastamentos.component';
import {AfastamentoService} from '@cdk/services/afastamento.service';
import {RouterModule, Routes} from '@angular/router';
import {TemplateService} from '@cdk/services/template.service';

const routes: Routes = [
    {
        path: '',
        component: AfastamentosComponent,
        children: [
            {
                path       : 'listar',
                loadChildren: './afastamento-list/afastamento-list.module#AfastamentoListModule',
            },
            {
                path       : 'editar',
                loadChildren: './afastamento-edit/afastamento-edit.module#AfastamentoEditModule',
            },
            {
                path: '**',
                redirectTo: 'listar'
            }
        ]
    }

];

@NgModule({
    declarations: [
        AfastamentosComponent
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

        FuseSharedModule,
    ],
    providers: [
        AfastamentoService,
        TemplateService
    ],
    exports: [
        AfastamentosComponent
    ]
})
export class AfastamentosModule {
}
