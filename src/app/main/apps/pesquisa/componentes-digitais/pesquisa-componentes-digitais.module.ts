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

import {CdkSharedModule} from '@cdk/shared.module';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {RouterModule, Routes} from '@angular/router';
import {CdkComponenteDigitalGridModule} from '@cdk/components/componente-digital/cdk-componente-digital-grid/cdk-componente-digital-grid.module';
import {ComponentesDigitaisComponent} from './componentes-digitais.component';
import {ComponentesDigitaisStoreModule} from './store/store.module';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: ComponentesDigitaisComponent
    }
];

const path = 'app/main/apps/pesquisa/componentes-digitais';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

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
        CdkSharedModule,

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
