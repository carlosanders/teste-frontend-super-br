import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSortModule, MatMenuModule, MatAutocompleteModule, MatRippleModule,
} from '@cdk/angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { CdkDocumentoAvulsoListComponent } from './cdk-documento-avulso-list.component';
import { CdkDocumentoAvulsoListItemComponent } from './cdk-documento-avulso-list-item/cdk-documento-avulso-list-item.component';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '@cdk/pipes/pipes.module';
import { FuseSidebarModule } from '@fuse/components';
import { CdkDocumentoAvulsoListMainSidebarComponent } from './sidebars/main/main.component';
import { ProcessoService } from '@cdk/services/processo.service';
import { CdkProcessoAutocompleteModule } from '@cdk/components/processo/cdk-processo-autocomplete/cdk-processo-autocomplete.module';
import { CdkSetorAutocompleteModule } from '@cdk/components/setor/cdk-setor-autocomplete/cdk-setor-autocomplete.module';
import { DndModule } from 'ngx-drag-drop';
import {SetorService} from '../../../services/setor.service';

@NgModule({
    declarations: [
        CdkDocumentoAvulsoListComponent,
        CdkDocumentoAvulsoListItemComponent,
        CdkDocumentoAvulsoListMainSidebarComponent
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

        CdkProcessoAutocompleteModule,
        CdkSetorAutocompleteModule,

        TranslateModule,

        PipesModule,

        FuseSharedModule,
        FuseSidebarModule,
        MatRippleModule,
    ],
    providers: [
        ProcessoService,
        SetorService
    ],
    exports: [
        CdkDocumentoAvulsoListComponent
    ]
})
export class CdkDocumentoAvulsoListModule {
}
