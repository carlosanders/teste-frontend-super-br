import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EspecieRelevanciaComponent} from './especie-relevancia.component';
import {RouterModule, Routes} from '@angular/router';
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
} from '../../../../../@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {CdkSharedModule} from '../../../../../@cdk/shared.module';
import {LoginService} from '../../../auth/login/login.service';

const routes: Routes = [
    {
        path: '',
        component: EspecieRelevanciaComponent,
        children: [
            {
                path       : 'listar',
                loadChildren: () => import('./especie-relevancia-list/especie-relevancia-list.module').then(m => m.EspecieRelevanciaListModule),
            },
            {
                path       : 'editar',
                loadChildren: () => import('./especie-relevancia-edit/especie-relevancia-edit.module').then(m => m.EspecieRelevanciaEditModule),
            },
            {
                path: '**',
                redirectTo: 'listar'
            }
        ]
    }
];


@NgModule({
    declarations: [EspecieRelevanciaComponent],
    imports: [
        CommonModule,
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
        LoginService
    ]
})
export class EspecieRelevanciaModule {
}
