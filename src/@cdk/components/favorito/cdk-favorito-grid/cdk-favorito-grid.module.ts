import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatRadioModule,
    MatSelectModule, MatTooltipModule,
} from '@cdk/angular/material';

import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {FavoritoService} from '@cdk/services/favorito.service';
import {CdkFavoritoGridComponent} from './cdk-favorito-grid.component';
import {CdkFavoritoGridFilterModule} from './cdk-favorito-grid-filter/cdk-favorito-grid-filter.module';
import {CdkFavoritoMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkFavoritoGridComponent,
        CdkFavoritoMainSidebarComponent,
    ],
    imports: [
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatRadioModule,
        MatTooltipModule,

        CdkFavoritoGridFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
        FavoritoService,
    ],
    exports: [
        CdkFavoritoGridComponent
    ]
})
export class CdkFavoritoGridModule {
}
