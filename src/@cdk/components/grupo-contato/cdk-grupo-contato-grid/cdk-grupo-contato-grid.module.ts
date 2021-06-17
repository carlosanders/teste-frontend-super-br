import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
} from '@cdk/angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {GrupoContatoService} from '@cdk/services/grupo-contato.service';
import {CdkGrupoContatoGridComponent} from './cdk-grupo-contato-grid.component';
import {CdkGrupoContatoAutocompleteModule} from '@cdk/components/grupo-contato/cdk-grupo-contato-autocomplete/cdk-grupo-contato-autocomplete.module';
import {CdkGrupoContatoFilterModule} from '../sidebars/cdk-grupo-contato-filter/cdk-grupo-contato-filter.module';

@NgModule({
    declarations: [
        CdkGrupoContatoGridComponent,
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

        CdkGrupoContatoAutocompleteModule,
        CdkGrupoContatoFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        GrupoContatoService,
    ],
    exports: [
        CdkGrupoContatoGridComponent
    ]
})
export class CdkGrupoContatoGridModule {
}
