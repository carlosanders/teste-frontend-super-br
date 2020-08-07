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

@Component({
    selector: 'widgets',
    templateUrl: './widgets.component.html',
    styleUrls: ['./widgets.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : cdkAnimations
})
export class WidgetsComponent implements OnInit, AfterViewInit {

    widgets: Widget[] = [];
    conteudo: any[] = [];

    @ViewChild('dynamicComponent', {static: false, read: ViewContainerRef})
    container: ViewContainerRef;
    @ViewChild('dynamicComponent', { read: ElementRef, static: true })
    containerElementRef: ElementRef;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _dynamicService: DynamicService,
    ) {
    }

    ngOnInit(): void {
        this.widgets = widgetConfig;
        this.widgets.sort((a, b) => (a.ordem > b.ordem) ? 1 : -1);
        // console.log(this.container);
    }

    ngAfterViewInit(): void {
        console.log(this.container);
        console.log(this.containerElementRef);
        this.widgets.forEach((widget: Widget) => {
            console.log(widget);
            console.log(widget.module);
            this._dynamicService.loadComponent(widget.module)
                .then(componentFactory => this.container.createComponent(componentFactory));
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    get containerElement(): HTMLElement {
        return this.containerElementRef.nativeElement;
    }
}
