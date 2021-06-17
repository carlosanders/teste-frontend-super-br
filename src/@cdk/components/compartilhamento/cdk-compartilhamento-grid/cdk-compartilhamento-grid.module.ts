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
import {CdkCompartilhamentoGridComponent} from './cdk-compartilhamento-grid.component';
import {CdkCompartilhamentoFilterModule} from '../sidebars/cdk-compartilhamento-filter/cdk-compartilhamento-filter.module';

@NgModule({
    declarations: [
        CdkCompartilhamentoGridComponent,
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
        CdkCompartilhamentoFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        UsuarioService,
    ],
    exports: [
        CdkCompartilhamentoGridComponent
    ]
})
export class CdkCompartilhamentoGridModule {
}
