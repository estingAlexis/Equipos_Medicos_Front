import { trigger, state, style, transition, animate, group, query, stagger, keyframes } from '@angular/animations';
import { Pipe, PipeTransform } from '@angular/core';

export const Slide = [
    trigger('slideInOut', [
        transition(':enter', [
          style({ transform: 'translateX(25%)' }),
          style({opacity: 0.0}),
          animate('200ms ease-in', style({transform: 'translateX(0%)', opacity: 1})),
        ]),
        transition(':leave', [
          animate('200ms ease-in', style({transform: 'translatex(-25%)', opacity: 0.0}))
        ])
      ])
];

export const APP: any = {
    ApiEndpoint: 'http://ec2-18-223-126-248.us-east-2.compute.amazonaws.com:5000/rest/v1/',
    UrlImages: 'http://localhost:5000/rest/v1/usuario/img/'
}
