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

import {FuseSharedModule} from '@fuse/shared.module';
import {SigilosComponent} from './sigilos.component';
import {SigiloService} from '@cdk/services/sigilo.service';
import {RouterModule, Routes} from '@angular/router';
import {TipoSigiloService} from '@cdk/services/tipo-sigilo.service';

const routes: Routes = [
    {
        path: '',
        component: SigilosComponent,
        children: [
            {
                path       : 'listar',
                loadChildren: () => import('./sigilo-list/sigilo-list.module').then(m => m.SigiloListModule),
            },
            {
                path       : 'editar',
                loadChildren: () => import('./sigilo-edit/sigilo-edit.module').then(m => m.SigiloEditModule),
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
        SigilosComponent
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
        SigiloService,
        TipoSigiloService
    ],
    exports: [
        SigilosComponent
    ]
})
export class SigilosModule {
}
