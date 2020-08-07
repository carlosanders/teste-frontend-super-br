import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnInit,
    ViewChild, ViewContainerRef,
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
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class WidgetsComponent implements OnInit, AfterViewInit {

    widgets: Widget[] = [];
    conteudo: any[] = [];

    @ViewChild('dynamicComponent', {static: false, read: ViewContainerRef})
    container: ViewContainerRef;

    @ViewChild('container', {read: ElementRef, static: true})
    containerElementRef: ElementRef;

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
        this.widgets.filter((widget) => widget.ordem !== 999).forEach((widget: Widget) => {
            this._dynamicService.loadComponent(widget.module)
                .then(componentFactory => this.container.createComponent(componentFactory));
        });
        setTimeout(() => {
            this.widgets.filter((widget) => widget.ordem === 999).forEach((widget: Widget) => {
                this._dynamicService.loadComponent(widget.module)
                    .then(componentFactory => this.container.createComponent(componentFactory));
            });
        }, 100);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
}
