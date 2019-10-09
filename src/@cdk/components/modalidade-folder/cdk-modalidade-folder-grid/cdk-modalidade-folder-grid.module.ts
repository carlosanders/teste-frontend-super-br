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

import {FuseSharedModule} from '@fuse/shared.module';
import {ModalidadeFolderService} from '@cdk/services/modalidade-folder.service';
import {CdkModalidadeFolderGridComponent} from './cdk-modalidade-folder-grid.component';
import {CdkModalidadeFolderAutocompleteModule} from '@cdk/components/modalidade-folder/cdk-modalidade-folder-autocomplete/cdk-modalidade-folder-autocomplete.module';
import {CdkModalidadeFolderGridFilterModule} from './cdk-modalidade-folder-grid-filter/cdk-modalidade-folder-grid-filter.module';

@NgModule({
    declarations: [
        CdkModalidadeFolderGridComponent
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

        CdkModalidadeFolderAutocompleteModule,
        CdkModalidadeFolderGridFilterModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeFolderService,
    ],
    exports: [
        CdkModalidadeFolderGridComponent
    ]
})
export class CdkModalidadeFolderGridModule {
}
