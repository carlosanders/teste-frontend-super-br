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
import {VolumesComponent} from './volumes.component';
import {VolumeService} from '@cdk/services/volume.service';
import {RouterModule, Routes} from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';


const routes: Routes = [
    {
        path: '',
        component: VolumesComponent,
        children: [
            {
                path       : 'listar',
                loadChildren: () => import('./volume-list/volume-list.module').then(m => m.VolumeListModule),
            },
            {
                path       : 'editar',
                loadChildren: () => import('./volume-edit/volume-edit.module').then(m => m.VolumeEditModule),
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
        VolumesComponent
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
        VolumeService
    ],
    exports: [
        VolumesComponent
    ]
})
export class VolumesModule {
}
