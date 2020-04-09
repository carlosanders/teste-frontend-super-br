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
import {UsuarioService} from '@cdk/services/usuario.service';
import {CdkBlocoResponsaveisComponent} from './cdk-bloco-responsaveis-grid.component';
import {SetorService} from '../../../services/setor.service';
import {CdkUsuarioGridModule} from '../../usuario/cdk-usuario-grid/cdk-usuario-grid.module';
import {CdkSetorGridModule} from '../../setor/cdk-setor-grid/cdk-setor-grid.module';
import {CdkSetorAutocompleteModule} from '../../setor/cdk-setor-autocomplete/cdk-setor-autocomplete.module';
import {CdkSetorFilterModule} from '../../setor/sidebars/cdk-setor-filter/cdk-setor-filter.module';
import {CdkUsuarioAutocompleteModule} from '../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkUsuarioFilterModule} from '../../usuario/sidebars/cdk-usuario-filter/cdk-usuario-filter.module';
import {CdkBlocoResponsaveisFilterModule} from '../cdk-bloco-responsaveis-grid/cdk-bloco-responsaveis-filter/cdk-bloco-responsaveis-filter.module';
import {CdkBlocoResponsaveisMainSidebarComponent} from './sidebars/main.bloco-responsaveis.component';

@NgModule({
    declarations: [
        CdkBlocoResponsaveisComponent,
        CdkBlocoResponsaveisMainSidebarComponent
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

        CdkSharedModule,
        CdkSidebarModule,

        CdkUsuarioGridModule,
        CdkSetorGridModule,
        CdkSetorAutocompleteModule,
        CdkSetorFilterModule,
        CdkUsuarioAutocompleteModule,
        CdkUsuarioFilterModule,
        CdkBlocoResponsaveisFilterModule,
        MatTooltipModule,
    ],
    providers: [
        UsuarioService,
        SetorService
    ],
    exports: [
        CdkBlocoResponsaveisComponent,
        CdkBlocoResponsaveisMainSidebarComponent
    ]
})
export class CdkBlocoResponsaveisGridModule {
}
