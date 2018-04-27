import { trigger, animate, style, group, animateChild, query, stagger, transition } from '@angular/animations';

export const routerTransition =
    trigger('routerTransition', [
        // Transition from home to any other route
        transition('home => *', [
            group([
                query(':enter', style({ position: 'fixed', width: '100%', height: '100%', zIndex: 999 }), { optional: true }),
                query(':leave', style({ position: 'fixed', width: '100%', height: '100%' }), { optional: true })
            ]),
            group([
                query(':enter', [
                    style({ transform: 'translateY(25%)' }),
                    animate('0.1s', style({ transform: 'translateY(0%)' }))
                ], { optional: true }),

                query(':enter', [
                    style({ opacity: 0 }),
                    animate('0.1s', style({ opacity: 1 }))
                ], { optional: true }),
            ])
        ]),

        // Transition from any route back to home
        transition('* => home', [
            group([
                query(':enter', style({ position: 'fixed', width: '100%', height: '100%', }), { optional: true }),
                query(':leave', style({ position: 'fixed', width: '100%', height: '100%', zIndex: 999 }), { optional: true })
            ]),
            group([
                query(':leave', [
                    animate('0.1s', style({ opacity: 0, transform: 'translateY(25%)' }))
                ], { optional: true }),
            ])
        ])
    ]);
