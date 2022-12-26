import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {LoginService} from '../../auth/login/login.service';
import {Usuario} from '@cdk/models';
import {Widget} from '../../../../widgets/widget';
import {widgetConfig} from '../../../../widgets/widget-config';
import * as _ from 'lodash';
import {FormControl} from '@angular/forms';
import {of, Subject, switchMap, zip} from 'rxjs';
import {CacheGenericUserDataService} from '@cdk/services/cache.service';
import {take, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'painel',
    templateUrl: './painel.component.html',
    styleUrls: ['./painel.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class PainelComponent implements OnInit, OnDestroy{
    _profile: Usuario;
    widgets: Widget[] = [];
    widgetsControl: FormControl<string[]> = new FormControl<string[]>([]);
    private _unsubscribeAll: Subject<any> = new Subject();

    static PAINEL_WIDGETS_CACHE_KEY: string = 'PainelWidgets';

    constructor(
        private _cacheGenericUserDataService: CacheGenericUserDataService,
        private _changeDetectorRef: ChangeDetectorRef,
        public _loginService: LoginService
    ) {
        this._profile = _loginService.getUserProfile();
        this.widgetsControl.valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((selectedWidgets) => {
                this.widgets.forEach((widget) => widget.hidden = !selectedWidgets.includes(widget.moduleName));
                this.widgetsConfigsChange(this.widgets);
            });

        const widgets = _.cloneDeep(widgetConfig)
            .filter((widget) => widget.isVisible(this._profile, this._loginService));

        zip(widgets.map((widget) => (!widget.nome || !widget.moduleName) ? widget.module() : of(widget)))
            .pipe(
                takeUntil(this._unsubscribeAll),
                switchMap((loadedModules) => {
                    widgets.forEach((widget, index) => {
                        if (!widget.moduleName) {
                            widget.moduleName = loadedModules[index].name;
                        }
                        if (!widget.nome) {
                            widget.nome = loadedModules[index].name.replace('Module', '');
                        }
                    });

                    return of(widgets);
                })
            )
            .subscribe((widgets: Widget[]) => {
                this._cacheGenericUserDataService.get(PainelComponent.PAINEL_WIDGETS_CACHE_KEY)
                    .pipe(
                        takeUntil(this._unsubscribeAll),
                        switchMap((widgets: Widget[]) => !widgets?.length ? of([]) : of(widgets))
                    )
                    .subscribe((cachedWidgets: Widget[]) => {
                        widgets.forEach((originalWidget) => {
                            const cachedWidget = cachedWidgets.find((widget) => widget.moduleName === originalWidget.moduleName);
                            if (cachedWidget) {
                                originalWidget.ordem = cachedWidget.ordem;
                                originalWidget.hidden = cachedWidget.hidden;
                            }
                        });
                        this.widgets = [...this._reindexOrdemWidgets(widgets)];

                        this.widgetsControl.setValue(
                            this.widgets
                                .filter((widget) => !widget.hidden)
                                .map((widget) => widget.moduleName),
                            {emitEvent: false}
                        );
                        this._changeDetectorRef.detectChanges();
                    });
            });
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    private _reindexOrdemWidgets(widgets: Widget[]): Widget[] {
        widgets = widgets.sort((widgetA: Widget, widgetB: Widget) => {
            if (widgetA.ordem > widgetB.ordem) {
                return 1;
            }

            if (widgetA.ordem < widgetB.ordem) {
                return -1;
            }

            return 0;
        });
        //reseting ordem
        let orderSum = 0;
        widgets
            .filter((widget) => !widget.hidden)
            .forEach((widget: Widget) => {
                orderSum += 10;
                widget.ordem = orderSum;
            });
        let lastOrderValue = this._getLastOrderWidgetOrderNumber(widgets);
        widgets
            .filter((widget) => widget.hidden)
            .forEach((widget: Widget) => {
                lastOrderValue += 10;
                widget.ordem = lastOrderValue;
            });

        return widgets.sort((widgetA: Widget, widgetB: Widget) => {
            if (widgetA.ordem > widgetB.ordem) {
                return 1;
            }

            if (widgetA.ordem < widgetB.ordem) {
                return -1;
            }

            return 0;
        });
    }

    private _getLastOrderWidgetOrderNumber(widgets: Widget[]): number {
        return Math.max(
            ...widgets
                .filter((widget) => !widget.hidden)
                .map((widget) => widget.ordem)
        );
    }

    widgetsConfigsChange(widgets: Widget[]): void {
        this.widgets = [...this._reindexOrdemWidgets(widgets)];
        this._cacheGenericUserDataService.set(
            widgets,
            PainelComponent.PAINEL_WIDGETS_CACHE_KEY,
            60 * 60 * 24 * 1000
        ).pipe(
            take(1)
        ).subscribe();
        this._changeDetectorRef.detectChanges();
    }

    resetWidgetsConfig(): void {
        this._cacheGenericUserDataService.delete(PainelComponent.PAINEL_WIDGETS_CACHE_KEY);
        const widgets = _.cloneDeep(widgetConfig)
            .filter((widget) => widget.isVisible(this._profile, this._loginService));

        zip(widgets.map((widget) => (!widget.nome || !widget.moduleName) ? widget.module() : of(widget)))
            .pipe(
                takeUntil(this._unsubscribeAll),
                switchMap((loadedModules) => {
                    widgets.forEach((widget, index) => {
                        if (!widget.moduleName) {
                            widget.moduleName = loadedModules[index].name;
                        }
                        if (!widget.nome) {
                            widget.nome = loadedModules[index].name.replace('Module', '');
                        }
                    });

                    return of(widgets);
                })
            )
            .subscribe((widgets: Widget[]) => {
                this.widgets = [...this._reindexOrdemWidgets(widgets)];

                this.widgetsControl.setValue(
                    this.widgets
                        .filter((widget) => !widget.hidden)
                        .map((widget) => widget.moduleName),
                );

                this._changeDetectorRef.detectChanges();
            });
    }
}
