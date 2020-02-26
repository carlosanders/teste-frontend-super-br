import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSortModule, MatMenuModule, MatAutocompleteModule, MatRippleModule,
    MatExpansionModule
} from '@cdk/angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { CdkAssuntoListComponent } from './cdk-assunto-list.component';
import { CdkAssuntoListItemComponent } from './cdk-assunto-list-item/cdk-assunto-list-item.component';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '@cdk/pipes/pipes.module';
import { FuseSidebarModule } from '@fuse/components';
import { ProcessoService } from '@cdk/services/processo.service';
import { AssuntoService} from '@cdk/services/assunto.service';
import { DndModule } from 'ngx-drag-drop';

@NgModule({
    declarations: [
        CdkAssuntoListComponent,
        CdkAssuntoListItemComponent
    ],
    imports: [

        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatSortModule,
        MatMenuModule,
        MatAutocompleteModule,

        DndModule,

        TranslateModule,

        PipesModule,

        FuseSharedModule,
        FuseSidebarModule,
        MatRippleModule,
        MatExpansionModule
    ],
    providers: [
        ProcessoService,
        AssuntoService
    ],
    exports: [
        CdkAssuntoListComponent
    ]
})
export class CdkAssuntoListModule {
}
