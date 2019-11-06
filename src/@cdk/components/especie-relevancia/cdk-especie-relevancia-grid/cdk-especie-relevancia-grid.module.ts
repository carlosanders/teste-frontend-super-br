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
} from '@angular/material';

import {FuseSidebarModule} from '@fuse/components';
import {FuseSharedModule} from '@fuse/shared.module';
import {EspecieRelevanciaService} from '@cdk/services/especie-relevancia.service';
import {CdkEspecieRelevanciaGridComponent} from './cdk-especie-relevancia-grid.component';
import {CdkEspecieRelevanciaAutocompleteModule} from '@cdk/components/especie-relevancia/cdk-especie-relevancia-autocomplete/cdk-especie-relevancia-autocomplete.module';
import {CdkEspecieRelevanciaGridFilterModule} from './cdk-especie-relevancia-grid-filter/cdk-especie-relevancia-grid-filter.module';
import {CdkEspecieRelevanciaMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkEspecieRelevanciaGridComponent,
        CdkEspecieRelevanciaMainSidebarComponent,
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

        CdkEspecieRelevanciaAutocompleteModule,
        CdkEspecieRelevanciaGridFilterModule,

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [
        EspecieRelevanciaService,
    ],
    exports: [
        CdkEspecieRelevanciaGridComponent
    ]
})
export class CdkEspecieRelevanciaGridModule {
}
