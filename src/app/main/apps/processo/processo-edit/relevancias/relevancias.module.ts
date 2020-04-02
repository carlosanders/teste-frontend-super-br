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
import {RelevanciasComponent} from './relevancias.component';
import {RelevanciaService} from '@cdk/services/relevancia.service';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
    {
        path: '',
        component: RelevanciasComponent,
        children: [
            {
                path       : 'listar',
                loadChildren: () => import('./relevancia-list/relevancia-list.module').then(m => m.RelevanciaListModule),
            },
            {
                path       : 'editar',
                loadChildren: () => import('./relevancia-edit/relevancia-edit.module').then(m => m.RelevanciaEditModule),
            },
            {
                path: '**',
                redirectTo: 'listar'
            }
        ]
    }

];

@NgModule({
    declarations: [
        RelevanciasComponent
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
    ],
    providers: [
        RelevanciaService
    ],
    exports: [
        RelevanciasComponent
    ]
})
export class RelevanciasModule {
}
