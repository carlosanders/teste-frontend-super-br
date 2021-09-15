import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TemplatesListComponent} from './templates-list.component';
import {RouterModule, Routes} from '@angular/router';
import {MatExpansionModule, MatIconModule} from '@cdk/angular/material';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {TranslateModule} from '@ngx-translate/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {TemplatesListStoreModule} from './store/store.module';
import {TemplateService} from '@cdk/services/template.service';
import * as fromGuards from './store/guards';
import {CdkTemplateGridModule} from '@cdk/components/template/cdk-template-grid/cdk-template-grid.module';
import {PathModule} from '@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: '',
        component: TemplatesListComponent,

        children: [
            {
                path: 'documento',
                loadChildren: () => import('app/main/apps/documento/documento.module').then(m => m.DocumentoModule),
            }
        ],
        canActivate: [fromGuards.ResolveGuard]
    }
];


@NgModule({
    declarations: [TemplatesListComponent],
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

        TemplatesListStoreModule,
        CdkTemplateGridModule,
        PathModule,
    ],
    providers: [
        TemplateService,
        fromGuards.ResolveGuard
    ],
    exports: [
        TemplatesListComponent
    ]
})
export class TemplatesListModule {
}
