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
import {ModelosComponent} from './modelos.component';
import {ModeloService} from '@cdk/services/modelo.service';
import {RouterModule, Routes} from '@angular/router';
import {TemplateService} from '@cdk/services/template.service';

const routes: Routes = [
    {
        path: '',
        component: ModelosComponent,
        children: [
            {
                path       : 'listar',
                loadChildren: './modelo-list/modelo-list.module#ModeloListModule',
            },
            {
                path       : 'editar',
                loadChildren: './modelo-edit/modelo-edit.module#ModeloEditModule',
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
        ModelosComponent
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
        ModeloService,
        TemplateService
    ],
    exports: [
        ModelosComponent
    ]
})
export class ModelosModule {
}
