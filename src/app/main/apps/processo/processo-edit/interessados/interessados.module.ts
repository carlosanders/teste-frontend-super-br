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
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {InteressadosComponent} from './interessados.component';
import {InteressadoService} from '@cdk/services/interessado.service';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: InteressadosComponent,
        children: [
            {
                path       : 'listar',
                loadChildren: () => import('./interessado-list/interessado-list.module').then(m => m.InteressadoListModule),
            },
            {
                path       : 'editar',
                loadChildren: () => import('./interessado-edit/interessado-edit.module').then(m => m.InteressadoEditModule),
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
        InteressadosComponent
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
        InteressadoService
    ],
    exports: [
        InteressadosComponent
    ]
})
export class InteressadosModule {
}
