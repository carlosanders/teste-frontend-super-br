import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressSpinnerModule, MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatToolbarModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';

import * as fromGuards from './store/guards';
import {CaixaEmailComponent} from './caixa-email.component';
import {PipesModule} from '@cdk/pipes/pipes.module';
import {ResizableModule} from 'angular-resizable-element';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {modulesConfig} from 'modules/modules-config';
import {MatBadgeModule} from '@angular/material/badge';
import {ContaEmailService} from '@cdk/services/conta-email.service';
import {CaixaEmailFolderSidebarComponent} from './sidebars/folder/caixa-email-folder-sidebar.component';
import {CaixaEmailStoreModule} from './store/store.module';
import {EmailClientService} from './services/email-client.service';
import {MailListComponent} from './mail-list/mail-list.component';
import {MailDetailsComponent} from './mail-details/mail-details.component';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {CdkProcessoAutocompleteModule} from '@cdk/components/processo/cdk-processo-autocomplete/cdk-processo-autocomplete.module';
import {CdkProcessoGridsearchModule} from '@cdk/components/processo/cdk-processo-autocomplete/cdk-processo-gridsearch/cdk-processo-gridsearch.module';
import {ProcessoService} from '@cdk/services/processo.service';
import {MailProcessoFormComponent} from './mail-processo-form/mail-processo-form.component';

const routes: Routes = [
    {
        path: ':contaEmailHandle/:folderHandle',
        component: CaixaEmailComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/caixa-email';

modulesConfig.forEach((module) => {
    if (module['routes'].hasOwnProperty(path)) {
        module['routes'][path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        CaixaEmailComponent,
        CaixaEmailFolderSidebarComponent,
        MailListComponent,
        MailDetailsComponent,
        MailProcessoFormComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatSelectModule,
        MatToolbarModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatTooltipModule,
        MatDividerModule,
        TranslateModule,
        ResizableModule,
        PipesModule,
        InfiniteScrollModule,
        CdkSharedModule,
        CdkSidebarModule,
        MatBadgeModule,
        NgxUpperCaseDirectiveModule,
        MatSlideToggleModule,
        MatRadioModule,
        CaixaEmailStoreModule,
        CdkProcessoAutocompleteModule,
        CdkProcessoGridsearchModule,
    ],
    providers: [
        fromGuards.ResolveGuard,
        ContaEmailService,
        EmailClientService,
        ProcessoService
    ]
})

export class CaixaEmailModule {
}
