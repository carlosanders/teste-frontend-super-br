import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {TipoDocumentoComponent} from './tipo-documento.component';
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
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {LoginService} from '../../../auth/login/login.service';

const routes: Routes = [
    {
        path: '',
        component: TipoDocumentoComponent,
        children: [
            {
                path: 'listar',
                loadChildren: () => import('./tipo-documento-list/tipo-documento-list.module').then(m => m.TipoDocumentoListModule),
            },
            {
                path: 'editar',
                loadChildren: () => import('./tipo-documento-edit/tipo-documento-edit.module').then(m => m.TipoDocumentoEditModule),
            },
            {
                path: '**',
                redirectTo: 'listar'
            }
        ],
    }
];


@NgModule({
    declarations: [TipoDocumentoComponent],
    imports: [
        CommonModule,
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
export class TipoDocumentoModule {
}
