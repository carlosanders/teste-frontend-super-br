import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EspecieAtividadeComponent} from './especie-atividade.component';
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
        component: EspecieAtividadeComponent,
        children: [
            {
                path       : 'listar',
                loadChildren: () => import('./especie-atividade-list/especie-atividade-list.module').then(m => m.EspecieAtividadeListModule),
            },
            {
                path       : 'editar',
                loadChildren: () => import('./especie-atividade-edit/especie-atividade-edit.module').then(m => m.EspecieAtividadeEditModule),
            },
            {
                path       : 'tipo-documento-list',
                loadChildren: () => import('./tipo-documento-list/tipo-documento.module').then(m => m.TipoDocumentoModule),
            },
            {
                path: '**',
                redirectTo: 'listar'
            }
        ]
    }
];


@NgModule({
    declarations: [EspecieAtividadeComponent],
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
export class EspecieAtividadeModule {
}
