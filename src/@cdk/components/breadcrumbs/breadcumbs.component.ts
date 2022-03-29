import { Subject } from 'rxjs';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import { filter, map, takeUntil } from 'rxjs/operators';
import {ActivatedRoute, NavigationEnd, PRIMARY_OUTLET, Router} from '@angular/router';
import {Breadcrumb} from './breadcrumb.model';

@Component({
    selector: 'breadcrumb',
    templateUrl: './breadcumbs.component.html',
    styleUrls: ['./breadcumbs.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class BreadcumbsComponent implements OnInit, OnDestroy {
    @Input()
    module: string;

    @Input()
    icone: string = 'assignment_ind';

    @Input()
    startPath: string = null;

    breadcrumb: Breadcrumb[] = [];

    private _unsubscribeAll: Subject<any> = new Subject();

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private _changeDetectorRef: ChangeDetectorRef,
    ) {
        this.breadCrumbData();
    }

    static getHandleValue(route: ActivatedRoute, handleName: string): string|null {
        do {
            if(route.snapshot.params[handleName]) {
                return route.snapshot.params[handleName];
            }
            route = route.parent;
        }
        while(route.parent);

        return null;
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    breadCrumbData(): void {
        this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                map(() => this.activatedRoute),
                filter(route => route.outlet === PRIMARY_OUTLET),
                takeUntil(this._unsubscribeAll)
            ).subscribe((route) => {
            this.updateData(route);
        });
    }

    updateData(route: ActivatedRoute): void {
        this.breadcrumb = [];
        route.pathFromRoot.forEach((childRoute) => {
            const url = childRoute.snapshot.pathFromRoot
                .filter(c => c.url.length)
                .map(c => c.url.map(u => u.path).join('/'))
                .join('/');
            // console.log('URL: ', url);
            if (childRoute.snapshot.routeConfig?.data?.breadcrumb) {
                const data = childRoute.snapshot.data.breadcrumb;
                const breadcrumb = Array.isArray(data) ?
                    JSON.parse(JSON.stringify(data)) :
                    [JSON.parse(JSON.stringify(data))];

                breadcrumb.forEach((crumb: Breadcrumb) => {
                    // console.log('crumb:', crumb);

                    if (this.startPath) {
                        if (url.match(this.startPath)) {
                            // se encontramos o caminho desejado para iniciar, limpamos a pilha de crumbs
                            this.breadcrumb = [];
                        }
                    }

                    if (crumb.url) {
                        const urlChunks = crumb.url.split('/');

                        for (const chunk of urlChunks) {
                            if (chunk.includes(':')) {
                                const handleName  = chunk.replace(':', '');
                                const handleValue = BreadcumbsComponent.getHandleValue(childRoute, handleName);
                                crumb.url = crumb.url.replace(`:${handleName}`, handleValue);
                            }
                        }
                    }

                    crumb.link = this.absolute(crumb.url ? url + `/${crumb.url}` : url);
                    const labelParams = crumb.label.match(/[^{{]+(?=}})/g);

                    if (labelParams) {
                        for (const labelParam of labelParams) {
                            const handleValue = BreadcumbsComponent.getHandleValue(route, labelParam.trim());
                            if (handleValue) {
                                crumb.label = crumb.label.replace('{{' + labelParam + '}}', handleValue);
                            }
                        }
                    }

                    if(crumb.module !== this.module) {
                        console.warn(`O módulo do breadcrumb (${crumb.module}) é diferente do informado no componente (${this.module})`);
                        return;
                    }

                    if (!this.breadcrumb.find(b => JSON.stringify(b) === JSON.stringify(crumb))) {
                            this.breadcrumb.push(crumb);
                            // console.log(crumb);
                    }
                });

            }
        });
        this._changeDetectorRef.markForCheck();
    }

    navigateTo(url: string): void {
        this.router.navigateByUrl(url).then();
    }

    absolute(url: string): string {
        const st = url.split('/');

        for (let i = 0; i < st.length; i++) {
            if (st[i] === '..'){
                //remove indice o anterior
                //e depois remove o atual
                st.splice(--i,1);
                st.splice(i--,1);
            } else if (st[i] === '.') {
                st.splice(i--,1);
            }
        }
        return st.join('/');
    }
}
