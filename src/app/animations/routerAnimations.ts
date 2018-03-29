import { trigger, animate, style, group, animateChild, query, stagger, transition } from '@angular/animations';

export const routerTransition =
    trigger('routerTransition', [
        transition('home => *', [
            group([
                query(':enter', style({ position: 'fixed', width: '100%', height: '100%', zIndex: 999 }), { optional: true }),
                query(':leave', style({ position: 'fixed', width: '100%', height: '100%' }), { optional: true })
            ]),
            group([
                query(':enter', [
                    style({ transform: 'translateY(100%)' }),
                    animate('0.3s', style({ transform: 'translateY(0%)' }))
                ], { optional: true }),
                query(':leave', [
                    style({ transform: 'translateY(0%)' }),
                    animate('0.3s', style({ opacity: 0 }))
                ], { optional: true }),
            ])
        ]),

        transition('* => home', [
            group([
                query(':enter', style({ position: 'fixed', width: '100%', height: '100%', }), { optional: true }),
                query(':leave', style({ position: 'fixed', width: '100%', height: '100%', zIndex: 999 }), { optional: true })
            ]),
            group([
                query(':leave', [
                    animate('0.3s', style({ opacity: 0, transform: 'translateX(100%)' }))
                ], { optional: true }),
            ])
        ])
    ]);
