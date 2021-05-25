import { ChangeDetectorRef, Compiler, Component, Injector, NgModuleFactory, OnInit } from '@angular/core';
import { notificationConfig } from './notification-config';
import { select, Store } from '@ngrx/store';
import { getSnackbar, SnackbarExibirNotificacao } from '../app/store';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar} from '@angular/material/snack-bar';
import * as fromStore from '../app/store';
import { Subject } from 'rxjs';

@Component({
    selector: 'notification',
    template: ''
})
export class NotificationComponent implements OnInit {
    modules: any[] = [];
    private _unsubscribeAll: Subject<any>;

    /**
     * @param _changeDetectorRef
     * @param _snackbar
     * @param _store
     * @param _compiler
     * @param _injector
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _snackbar: MatSnackBar,
        private _store: Store<fromStore.State>,
        private _compiler: Compiler,
        private _injector: Injector
    ) {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.loadModules();

        this._store
            .pipe(
                select(getSnackbar),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe((snackbar) => {
                if (snackbar.exibir) {
                    this.openComponent(snackbar.notificacao);
                    this._store.dispatch(new SnackbarExibirNotificacao({exibir: false, notificacao: null}));
                }
            });
    }

    /**
     * Open
     *
     * @param notification
     */
    private openComponent(notification) {
        const modules = this.modules.sort((a, b) => (a.order > b.order) ? 1 : -1);
        const selector = modules.find(item => item.module.instance.supports(notification));

        selector.config.data = notification;
        this._snackbar.openFromComponent(
            selector.module.instance.resolveComponentFactory().componentType,
            selector.config
        );
    }

    /**
     * Load
     */
    private loadModules() {
        notificationConfig.forEach((notification) => {
            this.instanceModule(notification.module).then((moduleNotification) => {
                this.modules.push({
                    module: moduleNotification,
                    config: notification.config,
                    order: notification.order
                });
            });
        });
    }

    /**
     * Instance
     *
     * @param i
     */
    private instanceModule(i: any): Promise<any> {
        return i()
            .then((lazyModule) => {
                if (lazyModule instanceof NgModuleFactory) {
                    return lazyModule.create(this._injector);
                } else {
                    return this._compiler.compileModuleAsync(lazyModule).then(compiledModule => compiledModule.create(this._injector));
                }
            });
    }
}
