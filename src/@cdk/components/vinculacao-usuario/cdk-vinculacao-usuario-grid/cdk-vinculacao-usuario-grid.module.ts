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
import {CdkVinculacaoUsuarioGridComponent} from './cdk-vinculacao-usuario-grid.component';
import {CdkVinculacaoUsuarioAutocompleteModule} from '@cdk/components/vinculacao-usuario/cdk-vinculacao-usuario-autocomplete/cdk-vinculacao-usuario-autocomplete.module';
import {CdkVinculacaoUsuarioFilterModule} from '../sidebars/cdk-vinculacao-usuario-filter/cdk-vinculacao-usuario-filter.module';

@NgModule({
    declarations: [
        CdkVinculacaoUsuarioGridComponent,
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
        CdkVinculacaoUsuarioFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        VinculacaoUsuarioService,
    ],
    exports: [
        CdkVinculacaoUsuarioGridComponent
    ]
})
export class CdkVinculacaoUsuarioGridModule {
}
