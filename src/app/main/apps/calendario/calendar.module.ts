import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ColorPickerModule} from 'ngx-color-picker';
import {CalendarModule as AngularCalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkConfirmDialogModule, CdkSidebarModule} from '@cdk/components';

import {CalendarComponent} from './calendar.component';
import {CalendarService} from 'app/main/apps/calendario/calendar.service';
import {CalendarEventFormDialogComponent} from './event-form/event-form.component';
import {TarefaService} from '@cdk/services/tarefa.service';
import {LoginService} from '../../auth/login/login.service';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import * as fromGuards from 'app/main/apps/calendario/store/guards';
import {CalendarioStoreModule} from './store/store.module';
import {CalendarioMainSidebarComponent} from './sidebars/main/main-sidebar.component';
import {MatRippleModule} from '@angular/material/core';

const routes: Routes = [
    {
        path: ':typeHandle/:targetHandle',
        component: CalendarComponent,
        children: [],
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        CalendarComponent,
        CalendarEventFormDialogComponent,
        CalendarioMainSidebarComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatDatepickerModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSlideToggleModule,
        MatToolbarModule,
        MatTooltipModule,

        AngularCalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory
        }),
        ColorPickerModule,

        CdkSharedModule,
        CdkConfirmDialogModule,
        MatDatetimepickerModule,
        MatNativeDatetimeModule,

        CalendarioStoreModule,
        MatRippleModule,
        CdkSidebarModule
    ],
    providers: [
        CalendarService,
        TarefaService,
        LoginService,
        fromGuards.ResolveGuard
    ],
    entryComponents: [
        CalendarEventFormDialogComponent
    ]
})
export class CalendarModule {
}
