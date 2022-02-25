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
import {UsuarioService} from '@cdk/services/usuario.service';
import {CdkUsuarioAutocompleteModule} from '@cdk/components/usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkAcompanhamentoGridComponent} from './cdk-acompanhamento-grid.component';
import {CdkAcompanhamentoFilterModule} from '../sidebars/cdk-acompanhamento-filter/cdk-acompanhamento-filter.module';
import {
    CdkEtiquetaChipsItemModule
} from '../../etiqueta/cdk-etiqueta-chips/cdk-etiqueta-chips-item/cdk-etiqueta-chips-item.module';

@NgModule({
    declarations: [
        CdkAcompanhamentoGridComponent,
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

        CdkUsuarioAutocompleteModule,
        CdkAcompanhamentoFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
        CdkEtiquetaChipsItemModule,
    ],
    providers: [
        UsuarioService,
    ],
    exports: [
        CdkAcompanhamentoGridComponent
    ]
})
export class CdkAcompanhamentoGridModule {
}
