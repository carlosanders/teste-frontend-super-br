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
import {RelevanciaService} from '@cdk/services/relevancia.service';
import {CdkRelevanciaGridComponent} from './cdk-relevancia-grid.component';
import {CdkRelevanciaAutocompleteModule} from '@cdk/components/relevancia/cdk-relevancia-autocomplete/cdk-relevancia-autocomplete.module';
import {CdkRelevanciaGridFilterModule} from './cdk-relevancia-grid-filter/cdk-relevancia-grid-filter.module';
import {CdkRelevanciaMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkRelevanciaGridComponent,
        CdkRelevanciaMainSidebarComponent,
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

        CdkRelevanciaAutocompleteModule,
        CdkRelevanciaGridFilterModule,

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [
        RelevanciaService,
    ],
    exports: [
        CdkRelevanciaGridComponent
    ]
})
export class CdkRelevanciaGridModule {
}
