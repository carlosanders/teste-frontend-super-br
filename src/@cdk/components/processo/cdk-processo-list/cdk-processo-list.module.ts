import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSortModule, MatMenuModule, MatAutocompleteModule, MatRippleModule,
} from '@cdk/angular/material';

import { CdkSharedModule } from '@cdk/shared.module';
import { CdkProcessoListComponent } from '@cdk/components/processo/cdk-processo-list/cdk-processo-list.component';
import { CdkProcessoListItemComponent } from '@cdk/components/processo/cdk-processo-list/cdk-processo-list-item/cdk-processo-list-item.component';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '@cdk/pipes/pipes.module';
import { CdkSidebarModule } from '@cdk/components';
import { CdkProcessoListMainSidebarComponent } from './sidebars/main/main.component';
import { CdkEspecieProcessoAutocompleteModule } from '@cdk/components/especie-processo/cdk-especie-processo-autocomplete/cdk-especie-processo-autocomplete.module';
import { EspecieProcessoService } from '@cdk/services/especie-processo.service';
import { ProcessoService } from '@cdk/services/processo.service';
import {CdkProcessoAutocompleteModule} from '@cdk/components/processo/cdk-processo-autocomplete/cdk-processo-autocomplete.module';
import { DndModule } from 'ngx-drag-drop';
import {MatTooltipModule} from '@angular/material/tooltip';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
    declarations: [
        CdkProcessoListComponent,
        CdkProcessoListItemComponent,
        CdkProcessoListMainSidebarComponent
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

        CdkEspecieProcessoAutocompleteModule,
        CdkProcessoAutocompleteModule,

        TranslateModule,

        PipesModule,
        MatTooltipModule,
        InfiniteScrollModule,
        CdkSharedModule,
        CdkSidebarModule,
        MatRippleModule,
        MatExpansionModule,
    ],
    providers: [
        EspecieProcessoService,
        ProcessoService
    ],
    exports: [
        CdkProcessoListComponent
    ]
})
export class CdkProcessoListModule {
}
