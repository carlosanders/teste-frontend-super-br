import {NgModule} from '@angular/core';

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
import {FolderListColumnComponent} from './folder-list-column.component';
import {DndModule} from "ngx-drag-drop";
import {CardTarefaModule} from "../card-tarefa/card-tarefa.module";
import {InfiniteScrollModule} from "ngx-infinite-scroll";

@NgModule({
    declarations: [
        FolderListColumnComponent
    ],
    imports: [
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
        CardTarefaModule
    ],
    providers: [
    ],
    exports: [
        FolderListColumnComponent
    ]
})
export class FolderListColumnModule {
}
