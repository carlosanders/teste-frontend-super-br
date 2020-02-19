import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatAutocompleteModule,
    MatExpansionModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {FuseSharedModule} from '@fuse/shared.module';
import {FolderListComponent} from './folder-list.component';
import {FolderService} from '@cdk/services/folder.service';
import {RouterModule, Routes} from '@angular/router';
import {FolderListStoreModule} from './store/store.module';
import {ModalidadeFolderService} from '@cdk/services/modalidade-folder.service';
import * as fromGuards from './store/guards';
import {CdkFolderGridModule} from '@cdk/components/folder/cdk-folder-grid/cdk-folder-grid.module';

const routes: Routes = [
    {
        path: '',
        component: FolderListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        FolderListComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatExpansionModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,

        TranslateModule,

        FuseSharedModule,

        CdkFolderGridModule,

        FolderListStoreModule,
    ],
    providers: [
        FolderService,
        ModalidadeFolderService,
        fromGuards.ResolveGuard
    ],
    exports: [
        FolderListComponent
    ]
})
export class FolderListModule {
}
