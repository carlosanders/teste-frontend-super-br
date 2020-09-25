import {
    AfterViewInit, ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnInit, QueryList,
    ViewChild, ViewChildren, ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import {widgetConfig} from './widget-config';
import {Widget} from './widget';
import {DynamicService} from '../modules/dynamic.service';
import {cdkAnimations} from '@cdk/animations';
import {LoginService} from '../app/main/auth/login/login.service';

@Component({
    selector: 'widgets',
    templateUrl: './widgets.component.html',
    styleUrls: ['./widgets.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class WidgetsComponent implements OnInit, AfterViewInit {

    widgets: Widget[] = [];

    @ViewChildren('dynamicComponent', {read: ViewContainerRef})
    public containers: QueryList<ViewContainerRef>;

    gridColsInstance: any;

    maxColspan = 1;
    maxRowspan = 1;

    /**
     *
     * @param _changeDetectorRef
     * @param _dynamicService
     * @param _loginService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _dynamicService: DynamicService,
        private _loginService: LoginService
    ) {
    }

    ngOnInit(): void {
        this.widgets = widgetConfig.sort((a, b) => (a.ordem > b.ordem) ? 1 : -1).filter((widget) => {
            return (!widget.role || (widget.role && this._loginService.isGranted(widget.role)));
        });
    }

    ngAfterViewInit(): void {
        this.containers.map(
            (vcr: ViewContainerRef, index: number) => {
                this._dynamicService.loadComponent(this.widgets[index].module)
                    .then( componentFactory  => {
                        vcr.createComponent(componentFactory);
                        this._changeDetectorRef.markForCheck();
                    });
            }
        );
    }

    colsChanged(cols): void {
        this.maxColspan = cols;
        this.maxRowspan = Math.ceil((this.widgets.length / cols));
    }
}
