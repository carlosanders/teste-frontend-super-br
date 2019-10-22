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
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {FavoritoService} from '@cdk/services/favorito.service';
import {CdkFavoritoGridComponent} from './cdk-favorito-grid.component';
import {CdkFavoritoGridFilterModule} from './cdk-favorito-grid-filter/cdk-favorito-grid-filter.module';

@NgModule({
    declarations: [
        CdkFavoritoGridComponent
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

        CdkFavoritoGridFilterModule,

        FuseSharedModule,
        MatTooltipModule,
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
