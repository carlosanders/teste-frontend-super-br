import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {FolderListComponent} from './folder-list.component';
import {FolderService} from '@cdk/services/folder.service';
import {RouterModule, Routes} from '@angular/router';
import {FolderListStoreModule} from './store/store.module';
import {ModalidadeFolderService} from '@cdk/services/modalidade-folder.service';
import * as fromGuards from './store/guards';
import {CdkFolderGridModule} from '@cdk/components/folder/cdk-folder-grid/cdk-folder-grid.module';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: '',
        component: FolderListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/configuracoes/folders/folder-list';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

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

        CdkSharedModule,

        CdkFolderGridModule,

        FolderListStoreModule,
        PathModule,
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
