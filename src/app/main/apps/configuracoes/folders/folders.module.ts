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
} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {FuseSharedModule} from '@fuse/shared.module';
import {FoldersComponent} from './folders.component';
import {FolderService} from '@cdk/services/folder.service';
import {RouterModule, Routes} from '@angular/router';
import {ModalidadeFolderService} from '@cdk/services/modalidade-folder.service';

const routes: Routes = [
    {
        path: '',
        component: FoldersComponent,
        children: [
            {
                path       : 'listar',
                loadChildren: './folder-list/folder-list.module#FolderListModule',
            },
            {
                path       : 'editar',
                loadChildren: './folder-edit/folder-edit.module#FolderEditModule',
            },
            {
                path: '**',
                redirectTo: 'listar'
            }
        ]
    }

];

@NgModule({
    declarations: [
        FoldersComponent
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
    ],
    providers: [
        FolderService,
        ModalidadeFolderService
    ],
    exports: [
        FoldersComponent
    ]
})
export class FoldersModule {
}
