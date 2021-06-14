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
import {SigilosComponent} from './sigilos.component';
import {SigiloService} from '@cdk/services/sigilo.service';
import {RouterModule, Routes} from '@angular/router';
import {TipoSigiloService} from '@cdk/services/tipo-sigilo.service';
import {MatTooltipModule} from '@angular/material/tooltip';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: SigilosComponent,
        children: [
            {
                path       : 'listar',
                loadChildren: () => import('./sigilo-list/sigilo-list.module').then(m => m.SigiloListModule),
            },
            {
                path       : 'editar',
                loadChildren: () => import('./sigilo-edit/sigilo-edit.module').then(m => m.SigiloEditModule),
            },
            {
                path: '**',
                redirectTo: 'listar'
            }
        ]
    }
];

const path = 'app/main/apps/processo/processo-edit/sigilos';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        SigilosComponent
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
        SigiloService,
        TipoSigiloService
    ],
    exports: [
        SigilosComponent
    ]
})
export class SigilosModule {
}
