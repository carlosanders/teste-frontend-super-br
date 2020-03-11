import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
} from '@cdk/angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {VinculacaoUsuarioService} from '@cdk/services/vinculacao-usuario.service';
import {CdkVinculacaoUsuarioGridComponent} from './cdk-vinculacao-usuario-grid.component';
import {CdkVinculacaoUsuarioAutocompleteModule} from '@cdk/components/vinculacao-usuario/cdk-vinculacao-usuario-autocomplete/cdk-vinculacao-usuario-autocomplete.module';
import {CdkVinculacaoUsuarioGridFilterModule} from './cdk-vinculacao-usuario-grid-filter/cdk-vinculacao-usuario-grid-filter.module';
import {CdkVinculacaoUsuarioMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkVinculacaoUsuarioGridComponent,
        CdkVinculacaoUsuarioMainSidebarComponent,
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
        CdkVinculacaoUsuarioGridFilterModule,

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
