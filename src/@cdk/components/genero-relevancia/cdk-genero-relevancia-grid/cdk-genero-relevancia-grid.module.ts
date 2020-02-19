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
    MatSelectModule,
} from '@cdk/angular/material';

import {FuseSidebarModule} from '@fuse/components';
import {FuseSharedModule} from '@fuse/shared.module';
import {GeneroRelevanciaService} from '@cdk/services/genero-relevancia.service';
import {CdkGeneroRelevanciaGridComponent} from './cdk-genero-relevancia-grid.component';
import {CdkGeneroRelevanciaAutocompleteModule} from '@cdk/components/genero-relevancia/cdk-genero-relevancia-autocomplete/cdk-genero-relevancia-autocomplete.module';
import {CdkGeneroRelevanciaGridFilterModule} from './cdk-genero-relevancia-grid-filter/cdk-genero-relevancia-grid-filter.module';
import {CdkGeneroRelevanciaMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkGeneroRelevanciaGridComponent,
        CdkGeneroRelevanciaMainSidebarComponent,
    ],
    imports: [
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatSelectModule,

        CdkGeneroRelevanciaAutocompleteModule,
        CdkGeneroRelevanciaGridFilterModule,

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [
        GeneroRelevanciaService,
    ],
    exports: [
        CdkGeneroRelevanciaGridComponent
    ]
})
export class CdkGeneroRelevanciaGridModule {
}
