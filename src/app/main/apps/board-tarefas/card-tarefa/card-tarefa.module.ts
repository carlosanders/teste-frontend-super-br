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
import {CardTarefaComponent} from './card-tarefa.component';
import {DndModule} from "ngx-drag-drop";

@NgModule({
    declarations: [
        CardTarefaComponent,
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
        DndModule
    ],
    providers: [
    ],
    exports: [
        CardTarefaComponent
    ]
})
export class CardTarefaModule {
}
