import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatSelectModule,
    MatToolbarModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';

import {FavoritoEditComponent} from './favorito-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkFavoritoFormModule} from '@cdk/components/favorito/cdk-favorito-form/cdk-favorito-form.module';
import {FavoritoEditStoreModule} from './store/store.module';
import {FavoritoService} from '@cdk/services/favorito.service';

import * as fromGuards from './store/guards';
import {LoginService} from '../../../../auth/login/login.service';
import {PathModule} from '@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: ':favoritoHandle',
        component: FavoritoEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        FavoritoEditComponent
    ],
    imports: [

        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatSelectModule,
        MatToolbarModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatTooltipModule,

        CdkFavoritoFormModule,

        FavoritoEditStoreModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
        PathModule,
    ],
    providers: [
        FavoritoService,
        fromGuards.ResolveGuard
    ]
})
export class FavoritoEditModule {
}
