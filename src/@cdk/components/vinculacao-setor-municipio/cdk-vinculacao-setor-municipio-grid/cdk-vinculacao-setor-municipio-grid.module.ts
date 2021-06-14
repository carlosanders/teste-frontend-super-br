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
import {VinculacaoUsuarioService} from '@cdk/services/vinculacao-usuario.service';
import {CdkVinculacaoSetorMunicipioGridComponent} from './cdk-vinculacao-setor-municipio-grid.component';
import {CdkVinculacaoUsuarioAutocompleteModule} from '@cdk/components/vinculacao-usuario/cdk-vinculacao-usuario-autocomplete/cdk-vinculacao-usuario-autocomplete.module';
import {CdkVinculacaoSetorMunicipioFilterModule} from '../sidebars/cdk-vinculacao-setor-municipio-filter/cdk-vinculacao-setor-municipio-filter.module';

@NgModule({
    declarations: [
        CdkVinculacaoSetorMunicipioGridComponent,
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

        CdkVinculacaoUsuarioAutocompleteModule,
        CdkVinculacaoSetorMunicipioFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        VinculacaoUsuarioService,
    ],
    exports: [
        CdkVinculacaoSetorMunicipioGridComponent
    ]
})
export class CdkVinculacaoSetorMunicipioGridModule {
}
