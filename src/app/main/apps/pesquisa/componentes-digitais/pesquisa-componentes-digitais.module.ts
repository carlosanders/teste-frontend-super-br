import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatAutocompleteModule,
    MatExpansionModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {FuseSharedModule} from '@fuse/shared.module';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {RouterModule, Routes} from '@angular/router';
import {CdkComponenteDigitalGridModule} from '@cdk/components/componente-digital/cdk-componente-digital-grid/cdk-componente-digital-grid.module';
import {ComponentesDigitaisComponent} from './componentes-digitais.component';
import {ComponentesDigitaisStoreModule} from './store/store.module';

const routes: Routes = [
    {
        path: '',
        component: ComponentesDigitaisComponent
    }
];

@NgModule({
    declarations: [
        ComponentesDigitaisComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatExpansionModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,

        ComponentesDigitaisStoreModule,

        TranslateModule,
        FuseSharedModule,

        CdkComponenteDigitalGridModule
    ],
    providers: [
        ComponenteDigitalService
    ],
    exports: [
        ComponentesDigitaisComponent
    ]
})
export class PesquisaComponentesDigitaisModule {
}
