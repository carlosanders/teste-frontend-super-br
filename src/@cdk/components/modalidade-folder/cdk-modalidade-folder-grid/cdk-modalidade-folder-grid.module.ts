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

import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {ModalidadeFolderService} from '@cdk/services/modalidade-folder.service';
import {CdkModalidadeFolderGridComponent} from './cdk-modalidade-folder-grid.component';
import {CdkModalidadeFolderAutocompleteModule} from '@cdk/components/modalidade-folder/cdk-modalidade-folder-autocomplete/cdk-modalidade-folder-autocomplete.module';
import {CdkModalidadeFolderGridFilterModule} from './cdk-modalidade-folder-grid-filter/cdk-modalidade-folder-grid-filter.module';
import {CdkModalidadeFolderMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkModalidadeFolderGridComponent,
        CdkModalidadeFolderMainSidebarComponent,
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

        CdkSharedModule,
        CdkSidebarModule,
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
