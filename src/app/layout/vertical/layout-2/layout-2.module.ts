import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {CdkSidebarModule} from '@cdk/components';
import {CdkSharedModule} from '@cdk/shared.module';

import {ContentModule} from 'app/layout/components/content/content.module';
import {FooterModule} from 'app/layout/components/footer/footer.module';
import {NavbarModule} from 'app/layout/components/navbar/navbar.module';
import {QuickPanelModule} from 'app/layout/components/quick-panel/quick-panel.module';
import {ToolbarModule} from 'app/layout/components/toolbar/toolbar.module';

import {VerticalLayout2Component} from './layout-2.component';
import {AjudaPanelModule} from '../../components/ajuda-panel/ajuda-panel.module';
import {NotificationModule} from '../../../../notification/notification.module';

@NgModule({
    declarations: [
        VerticalLayout2Component
    ],
    imports: [
        RouterModule,

        CdkSharedModule,
        CdkSidebarModule,

        ContentModule,
        FooterModule,
        NavbarModule,
        QuickPanelModule,
        AjudaPanelModule,
        ToolbarModule,
        NotificationModule
    ],
    exports: [
        VerticalLayout2Component
    ]
})
export class VerticalLayout2Module {
}
