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
    MatTableModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {JuntadaListComponent} from './juntada-list.component';
import {JuntadaService} from '@cdk/services/juntada.service';
import {RouterModule, Routes} from '@angular/router';
import {JuntadaListStoreModule} from 'app/main/apps/processo/processo-edit/juntadas/juntada-list/store/store.module';
import * as fromGuards from 'app/main/apps/processo/processo-edit/juntadas/juntada-list/store/guards';
import {CdkJuntadaGridModule} from '@cdk/components/juntada/cdk-juntada-grid/cdk-juntada-grid.module';
import {CdkComponenteDigitalCardListModule} from '@cdk/components/componente-digital/cdk-componente-digital-card-list/cdk-componente-digital-card-list.module';
import {modulesConfig} from 'modules/modules-config';
import {AssinaturaService} from '@cdk/services/assinatura.service';
import {VinculacaoDocumentoService} from '@cdk/services/vinculacao-documento.service';

const routes: Routes = [
    {
        path: '',
        component: JuntadaListComponent,
        children: [
            {
                path: 'documento',
                loadChildren: () => import('app/main/apps/documento/documento.module').then(m => m.DocumentoModule),
            }
        ],
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/processo/processo-edit/juntadas/juntada-list';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        JuntadaListComponent
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
        MatTooltipModule,

        TranslateModule,

        CdkSharedModule,

        CdkJuntadaGridModule,

        JuntadaListStoreModule,
        CdkComponenteDigitalCardListModule,
    ],
    providers: [
        JuntadaService,
        AssinaturaService,
        VinculacaoDocumentoService,
        fromGuards.ResolveGuard
    ],
    exports: [
        JuntadaListComponent
    ]
})
export class JuntadaListModule {
}
