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
import {ContatoService} from '@cdk/services/contato.service';
import {CdkContatoGridComponent} from './cdk-contato-grid.component';
import {CdkContatoAutocompleteModule} from '@cdk/components/contato/cdk-contato-autocomplete/cdk-contato-autocomplete.module';
import {CdkContatoFilterModule} from '../sidebars/cdk-contato-filter/cdk-contato-filter.module';

@NgModule({
    declarations: [
        CdkContatoGridComponent,
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

        CdkContatoAutocompleteModule,
        CdkContatoFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        ContatoService,
    ],
    exports: [
        CdkContatoGridComponent
    ]
})
export class CdkContatoGridModule {
}
