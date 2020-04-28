import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsuariosExternosComponent} from './usuarios-externos.component';
import {RouterModule, Routes} from '@angular/router';
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
} from '../../../../../@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {CdkSharedModule} from '../../../../../@cdk/shared.module';
import {LoginService} from '../../../auth/login/login.service';

const routes: Routes = [
    {
        path: '',
        component: UsuariosExternosComponent,
        children: [
            {
                path: 'listar',
                loadChildren: () => import('./usuarios-externos-list/usuarios-externos-list.module').then(m => m.UsuariosExternosListModule),
            },
            {
                path       : 'editar',
                loadChildren: () => import('./usuarios-externos-edit/usuarios-externos-edit.module').then(m => m.UsuariosExternosEditModule),
            },
            {
                path: '**',
                redirectTo: 'listar'
            }
        ],
    }
];


@NgModule({
    declarations: [UsuariosExternosComponent],
    imports: [
        CommonModule,
        RouterModule,
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
        LoginService
    ]
})
export class UsuariosExternosModule {
}
