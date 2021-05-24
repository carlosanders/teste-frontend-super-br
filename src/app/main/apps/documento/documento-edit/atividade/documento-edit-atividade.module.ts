import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CdkSharedModule} from '@cdk/shared.module';

import {TranslateModule} from '@ngx-translate/core';
import {MatIconModule} from '@cdk/angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {DocumentoEditAtividadeComponent} from './documento-edit-atividade.component';
import {DocumentoEditAtividadeStoreModule} from './store/store.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {AtividadeService} from '@cdk/services/atividade.service';
import {CdkAtividadeFormModule} from '@cdk/components/atividade/cdk-atividade-form/cdk-atividade-form.module';

const routes: Routes = [
    {
        path: '',
        component: DocumentoEditAtividadeComponent
    }
];

@NgModule({
    declarations: [
        DocumentoEditAtividadeComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatIconModule,
        MatButtonModule,
        MatMenuModule,

        DocumentoEditAtividadeStoreModule,

        TranslateModule,
        CdkSharedModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        MatSlideToggleModule,
        CdkAtividadeFormModule,
    ],
    providers: [
        AtividadeService,
    ],
    exports: [
        DocumentoEditAtividadeComponent
    ]
})
export class DocumentoEditAtividadeModule {
}
