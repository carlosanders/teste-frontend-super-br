import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {FavoritoService} from '@cdk/services/favorito.service';
import {CdkFavoritoGridFilterComponent} from './cdk-favorito-grid-filter.component';

@NgModule({
    declarations: [
        CdkFavoritoGridFilterComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FuseSharedModule,
    ],
    providers: [
        FavoritoService,
    ],
    exports: [
        CdkFavoritoGridFilterComponent
    ]
})
export class CdkFavoritoGridFilterModule {
}
