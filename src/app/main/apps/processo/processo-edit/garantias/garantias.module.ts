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
import {GarantiasComponent} from './garantias.component';
import {GarantiaService} from '@cdk/services/garantia.service'; 
import {RouterModule, Routes} from '@angular/router';
import {GarantiaAdministrativoService} from '@cdk/services/garantia-administrativo.service';

const routes: Routes = [
    {
        path: '',
        component: GarantiasComponent,
        children: [
            {
                path       : 'listar',
                loadChildren: () => import('./garantia-list/garantia-list.module').then(m => m.GarantiaListModule),
            },
            {
                path       : 'editar',
                loadChildren: () => import('./garantia-edit/garantia-edit.module').then(m => m.GarantiaEditModule),
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
        GarantiasComponent
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
        GarantiaService,
        GarantiaAdministrativoService
    ],
    exports: [
        GarantiasComponent
    ]
})
export class GarantiasModule {
}
