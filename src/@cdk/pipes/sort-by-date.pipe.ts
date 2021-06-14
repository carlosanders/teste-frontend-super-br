import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'sortByDate'})
export class SortByDatePipe implements PipeTransform
{
    /**
     *
     * @param value
     * @param args
     */
    transform(value: any, attr:string, sort:string, emptyFirst?: boolean): any
    {
        if (!value || !(value instanceof Array)) {
            return value;
        }
        if (sort.toUpperCase() === 'ASC') {
            return value.sort((a, b) => {
                if (emptyFirst) {
                    if (!b[attr]) {
                        return 1;
                    }
                    if (!a[attr]) {
                        return 1;
                    }
                }

                return new Date(b[attr]).getTime() - new Date(a[attr]).getTime();
            })
        } else {
            return value.sort((a, b) => {
                if (emptyFirst) {
                    if (!b[attr]) {
                        return 1;
                    }
                    if (!a[attr]) {
                        return 1;
                    }
                }

                return new Date(a[attr]).getTime() - new Date(b[attr]).getTime()
            })
        }
    }
}
