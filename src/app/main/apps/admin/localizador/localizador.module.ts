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
import {LocalizadorComponent} from './localizador.component';
import {LocalizadorService} from '@cdk/services/localizador.service';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: LocalizadorComponent,
        children: [
            {
                path       : 'listar',
                loadChildren: () => import('./localizador-list/localizador-list.module').then(m => m.LocalizadorListModule),
            },
            {
                path       : 'editar',
                loadChildren: () => import('./localizador-edit/localizador-edit.module').then(m => m.LocalizadorEditModule),
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
        LocalizadorComponent
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
        LocalizadorService
    ],
    exports: [
        LocalizadorComponent
    ]
})
export class LocalizadorModule {
}
