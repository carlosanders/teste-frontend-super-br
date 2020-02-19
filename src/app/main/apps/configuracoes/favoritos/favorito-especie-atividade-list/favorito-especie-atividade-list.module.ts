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
import {FavoritoEspecieAtividadeListComponent} from './favorito-especie-atividade-list.component';
import {FavoritoService} from '@cdk/services/favorito.service';
import {RouterModule, Routes} from '@angular/router';
import {FavoritoListEspecieAtividadeStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {CdkFavoritoGridModule} from '@cdk/components/favorito/cdk-favorito-grid/cdk-favorito-grid.module';
import {CdkFavoritoFormModule} from '@cdk/components/favorito/cdk-favorito-form/cdk-favorito-form.module';

const routes: Routes = [
    {
        path: '',
        component: FavoritoEspecieAtividadeListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        FavoritoEspecieAtividadeListComponent
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
        CdkFavoritoFormModule,
        TranslateModule,

        FuseSharedModule,

        CdkFavoritoGridModule,

        FavoritoListEspecieAtividadeStoreModule,
    ],
    providers: [
        FavoritoService,
        fromGuards.ResolveGuard
    ],
    exports: [
        FavoritoEspecieAtividadeListComponent
    ]
})
export class FavoritoEspecieAtividadeListModule {
}
