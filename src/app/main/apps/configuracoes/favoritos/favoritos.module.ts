import {NgModule} from '@angular/core';
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
import {FavoritosComponent} from './favoritos.component';
import {FavoritoService} from '@cdk/services/favorito.service';
import {RouterModule, Routes} from '@angular/router';
import {TemplateService} from '@cdk/services/template.service';
import {MatTooltipModule} from '@angular/material/tooltip';

const routes: Routes = [
    {
        path: '',
        component: FavoritosComponent,
        children: [
            {
                path       : 'listar',
                loadChildren: () => import('./favorito-list/favorito-list.module').then(m => m.FavoritoListModule),
            },
            {
                path       : 'editar',
                loadChildren: () => import('./favorito-edit/favorito-edit.module').then(m => m.FavoritoEditModule),
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
        FavoritosComponent
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
        MatTooltipModule,
    ],
    providers: [
        FavoritoService,
        TemplateService
    ],
    exports: [
        FavoritosComponent
    ]
})
export class FavoritosModule {
}
