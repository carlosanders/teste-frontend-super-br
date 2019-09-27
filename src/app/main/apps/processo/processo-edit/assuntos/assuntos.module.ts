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
import {AssuntosComponent} from './assuntos.component';
import {AssuntoService} from '@cdk/services/assunto.service';
import {RouterModule, Routes} from '@angular/router';
import {AssuntoAdministrativoService} from '@cdk/services/assunto-administrativo.service';

const routes: Routes = [
    {
        path: '',
        component: AssuntosComponent,
        children: [
            {
                path       : 'listar',
                loadChildren: () => import('./assunto-list/assunto-list.module').then(m => m.AssuntoListModule),
            },
            {
                path       : 'editar',
                loadChildren: () => import('./assunto-edit/assunto-edit.module').then(m => m.AssuntoEditModule),
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
        AssuntosComponent
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
        AssuntoService,
        AssuntoAdministrativoService
    ],
    exports: [
        AssuntosComponent
    ]
})
export class AssuntosModule {
}
