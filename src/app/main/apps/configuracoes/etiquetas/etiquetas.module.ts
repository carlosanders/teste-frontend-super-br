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
    MatExpansionModule, MatTooltipModule
} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {FuseSharedModule} from '@fuse/shared.module';
import {EtiquetasComponent} from './etiquetas.component';
import {EtiquetaService} from '@cdk/services/etiqueta.service';
import {RouterModule, Routes} from '@angular/router';
import {ModalidadeEtiquetaService} from '@cdk/services/modalidade-etiqueta.service';

const routes: Routes = [
    {
        path: '',
        component: EtiquetasComponent,
        children: [
            {
                path       : 'listar',
                loadChildren: './etiqueta-list/etiqueta-list.module#EtiquetaListModule',
            },
            {
                path       : 'editar',
                loadChildren: './etiqueta-edit/etiqueta-edit.module#EtiquetaEditModule',
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

        FuseSharedModule,
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
