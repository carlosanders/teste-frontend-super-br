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
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeFolderService } from '@cdk/services/modalidade-folder.service';
import { CdkModalidadeFolderGridComponent} from './cdk-modalidade-folder-grid.component';
import { CdkModalidadeFolderGridFilterComponent } from './cdk-modalidade-folder-grid-filter/cdk-modalidade-folder-grid-filter.component';
import { CdkModalidadeFolderAutocompleteModule } from '@cdk/components/modalidade-folder/cdk-modalidade-folder-autocomplete/cdk-modalidade-folder-autocomplete.module';

@NgModule({
    declarations: [
        CdkModalidadeFolderGridComponent,
        CdkModalidadeFolderGridFilterComponent
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

        CdkModalidadeFolderAutocompleteModule,

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
