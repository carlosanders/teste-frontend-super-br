import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {CdkComponenteDigitalGridModule} from '@cdk/components/componente-digital/cdk-componente-digital-grid/cdk-componente-digital-grid.module';
import {ComponentesDigitaisComponent} from './componentes-digitais.component';
import {ComponentesDigitaisBlocoStoreModule} from './store/store.module';
import {modulesConfig} from 'modules/modules-config';
import {MatListModule} from '@angular/material/list';

const routes: Routes = [
    {
        path: '',
        component: ComponentesDigitaisComponent,
        children: [
            {
                path       : 'documento',
                loadChildren: () => import('app/main/apps/documento/documento.module').then(m => m.DocumentoModule),
            }
        ]
    }
];

const path = 'app/main/apps/modelos/componentes-digitais';

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

        ComponentesDigitaisBlocoStoreModule,

        TranslateModule,
        CdkSharedModule,

        CdkComponenteDigitalGridModule,
        MatListModule
    ],
    providers: [
    ],
    exports: [
        ComponentesDigitaisComponent
    ]
})
export class ModelosComponentesDigitaisModule {
}
