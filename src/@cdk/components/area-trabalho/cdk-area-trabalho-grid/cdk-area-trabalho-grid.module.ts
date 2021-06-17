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
import {CdkAreaTrabalhoGridComponent} from './cdk-area-trabalho-grid.component';
import {CdkAreaTrabalhoFilterModule} from '../sidebars/cdk-area-trabalho-filter/cdk-area-trabalho-filter.module';

@NgModule({
    declarations: [
        CdkAreaTrabalhoGridComponent,
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
        CdkAreaTrabalhoFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        UsuarioService,
    ],
    exports: [
        CdkAreaTrabalhoGridComponent
    ]
})
export class CdkAreaTrabalhoGridModule {
}
