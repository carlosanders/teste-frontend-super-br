import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CdkSharedModule} from '@cdk/shared.module';

import {TranslateModule} from '@ngx-translate/core';
import {MatIconModule} from '@cdk/angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {RestaurarComponent} from './restaurar.component';
import {DocumentoEditRestaurarStoreModule} from './store/store.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {DocumentoService} from '@cdk/services/documento.service';

const routes: Routes = [
    {
        path: '',
        component: RestaurarComponent
    }
];

@NgModule({
    declarations: [
        RestaurarComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatIconModule,
        MatButtonModule,
        MatMenuModule,

        DocumentoEditRestaurarStoreModule,

        TranslateModule,
        CdkSharedModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        MatSlideToggleModule,
    ],
    providers: [
        DocumentoService,
    ],
    exports: [
        RestaurarComponent
    ]
})
export class RestaurarModule {
}
