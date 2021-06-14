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
import {AssinaturaListComponent} from './assinatura-list.component';
import {AssinaturaService} from '@cdk/services/assinatura.service';
import {RouterModule, Routes} from '@angular/router';
import {AssinaturaListStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {CdkAssinaturaGridModule} from '@cdk/components/assinatura/cdk-assinatura-grid/cdk-assinatura-grid.module';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: AssinaturaListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/documento/componente-digital/assinaturas/assinatura-list';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        AssinaturaListComponent
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

        TranslateModule,

        CdkSharedModule,

        CdkAssinaturaGridModule,

        AssinaturaListStoreModule,
    ],
    providers: [
        AssinaturaService,
        fromGuards.ResolveGuard
    ],
    exports: [
        AssinaturaListComponent
    ]
})
export class AssinaturaListModule {
}
