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
import {ModalidadeFaseService} from '@cdk/services/modalidade-fase.service';
import {CdkModalidadeFaseGridComponent} from './cdk-modalidade-fase-grid.component';
import {CdkModalidadeFaseAutocompleteModule} from '@cdk/components/modalidade-fase/cdk-modalidade-fase-autocomplete/cdk-modalidade-fase-autocomplete.module';
import {CdkModalidadeFaseGridFilterModule} from './cdk-modalidade-fase-grid-filter/cdk-modalidade-fase-grid-filter.module';
import {CdkModalidadeFaseMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkModalidadeFaseGridComponent,
        CdkModalidadeFaseMainSidebarComponent,
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

        CdkModalidadeFaseAutocompleteModule,
        CdkModalidadeFaseGridFilterModule,

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [
        ModalidadeFaseService,
    ],
    exports: [
        CdkModalidadeFaseGridComponent
    ]
})
export class CdkModalidadeFaseGridModule {
}
