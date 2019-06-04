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
                loadChildren: './sigilo-list/sigilo-list.module#SigiloListModule',
            },
            {
                path       : 'editar',
                loadChildren: './sigilo-edit/sigilo-edit.module#SigiloEditModule',
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
