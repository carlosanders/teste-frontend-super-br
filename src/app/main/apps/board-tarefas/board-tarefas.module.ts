import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import * as fromGuards from './store/guards/index';

import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRippleModule,
    MatSelectModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatDividerModule,
    MatProgressBarModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';
import {BoardTarefasComponent} from './board-tarefas.component';
import {modulesConfig} from 'modules/modules-config';
import {TarefaService} from '@cdk/services/tarefa.service';
import {FolderService} from '@cdk/services/folder.service';
import {DndModule} from 'ngx-drag-drop';
import {BoardTarefasStoreModule} from './store/store.module';
import {BoardTarefasMainSidebarComponent} from './sidebars/main/main-sidebar.component';
import {FolderListColumnModule} from './folder-list-column/folder-list-column.module';
import {FolderFormComponent} from './folder-form/folder-form.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

const routes: Routes = [
    {
        path: ':generoHandle',
        component: BoardTarefasComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/board-tarefas';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        BoardTarefasComponent,
        BoardTarefasMainSidebarComponent,
        FolderFormComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatSelectModule,
        MatToolbarModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatTooltipModule,
        MatProgressBarModule,
        MatDividerModule,
        TranslateModule,
        CdkSharedModule,
        CdkSidebarModule,
        DndModule,
        InfiniteScrollModule,
        FolderListColumnModule,
        BoardTarefasStoreModule,
    ],
    providers: [
        TarefaService,
        FolderService,
        fromGuards.ResolveGuard,
    ],
    entryComponents: [
    ]
})
export class BoardTarefasModule {
}
