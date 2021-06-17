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
import {DocumentosAvulsosComponent} from './documentos-avulsos.component';
import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import {RouterModule, Routes} from '@angular/router';
import {EspecieDocumentoAvulsoService} from '@cdk/services/especie-documento-avulso.service';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: DocumentosAvulsosComponent,
        children: [
            {
                path       : 'listar',
                loadChildren: () => import('./documento-avulso-list/processo-documento-avulso-list.module').then(m => m.ProcessoDocumentoAvulsoListModule),
            },
            {
                path       : 'editar',
                loadChildren: () => import('./documento-avulso-edit/processo-documento-avulso-edit.module').then(m => m.ProcessoDocumentoAvulsoEditModule),
            },
            {
                path       : 'responder',
                loadChildren: () => import('./responder/responder.module').then(m => m.ResponderModule),
            },
            {
                path       : 'documento',
                loadChildren: () => import('./componente-digital/componente-digital.module').then(m => m.ComponenteDigitalModule),
            },
            {
                path: 'status-barramento-oficio',
                loadChildren: () => import(
                    './status-barramento-oficio/status-barramento-oficio.module'
                    ).then(m => m.StatusBarramentoOficioModule)
            }
        ]
    }
];

const path = 'app/main/apps/processo/processo-edit/documentos-avulsos';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});


routes[0].children.push({
    path: '**',
    redirectTo: 'listar'
});

@NgModule({
    declarations: [
        DocumentosAvulsosComponent
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
        MatTooltipModule,
    ],
    providers: [
        DocumentoAvulsoService,
        EspecieDocumentoAvulsoService
    ],
    exports: [
        DocumentosAvulsosComponent
    ]
})
export class ProcessoDocumentosAvulsosModule {
}
