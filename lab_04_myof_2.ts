//### lab 4 ###
import './style.css';

import { of, map, Observable } from 'rxjs';

const myOf = (values: number[]) => {
  return new Observable((observer) => {
    setTimeout(() => values.forEach((v) => observer.next(v)), 4000);
  });
};

const observer1 = {
  next: (v) => console.log(`1 - o valor eh: ${v}`),
  complete: () => console.log(`1 - completou`),
  error: (e) => console.log(`1 - error: ${e}`),
};

const observer2 = {
  next: (v) => console.log(`2 - o valor eh: ${v}`),
  complete: () => console.log(`2 - completou`),
  error: (e) => console.log(`2 - error: ${e}`),
};

const obsevable = myOf([1, 2, 3]);

obsevable.subscribe(observer1);
console.log('ola 1');
obsevable.subscribe(observer2);
console.log('ola 2');
