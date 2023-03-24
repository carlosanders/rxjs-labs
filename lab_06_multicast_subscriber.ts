//### lab 6 ###
import './style.css';

import { of, map, Observable, Observer } from 'rxjs';

const multicastSubscriber = () => {
  //contexto oculto
  console.log(
    'chamou a funcao que retorna a fnc de subinscricao, mas ela nao eh a fn de subinscricao'
  );
  const listOfValues: number[] = [1, 2, 3, 4, 5];
  let observers: Observer<any>[] = [];
  let beganEmit = false;
  let timeOutId: any;

  // funcao subscricao
  return (observer) => {
    console.log('chamou a funcao subinscricao, no contexto escondido');
    observers.push(observer);

    // soh para o primeiro
    if (!beganEmit) {
      const myMultcastObserver = {
        next: (v) => observers.forEach((o) => o.next(v)),
        complete: () => observers.forEach((o) => o.complete()),
        error: (e) => observers.forEach((o) => o.error(e)),
      };

      beganEmit = true;

      //chamada uma unica vez para todos o Observadores
      emitValues(myMultcastObserver, listOfValues, 0);
    }

    return {
      unsubscribe() {
        observers.splice(observers.indexOf(observer), 1);
        //if(observers.length === 0){
        //  clearTimeout(timeOutId);
        // }
      },
    };
  };

  function emitValues(
    observer: Observer<any>,
    values: number[],
    index: number
  ) {
    console.log('funcao que emite os valores');
    timeOutId = setTimeout(() => {
      if (index === values.length) {
        observer.complete();
      } else {
        observer.next(values[index]);
        //agendar a exec do proximo
        emitValues(observer, values, ++index);
      }
    }, 1000);
  }
};

const observerJosemar = {
  next: (v) => console.log(`Josemar - o valor eh: ${v}`),
  complete: () => console.log(`Josemar - completou`),
  error: (e) => console.log(`Josemar - error: ${e}`),
};

const observerJosimar = {
  next: (v) => console.log(`Josimar - o valor eh: ${v}`),
  complete: () => console.log(`Josimar - completou`),
  error: (e) => console.log(`Josimar - error: ${e}`),
};

const observerInstrutor = {
  next: (v) => console.log(`Instrutor - o valor eh: ${v}`),
  complete: () => console.log(`Instrutor - completou`),
  error: (e) => console.log(`Instrutor - error: ${e}`),
};

const observable = new Observable(multicastSubscriber());
console.log(
  'o observable recebeu a fnc de subinscricao mas ainda nao a chamou'
);
let j = observable.subscribe(observerJosemar);

setTimeout(() => {
  j.unsubscribe();
}, 3000);
setTimeout(() => {
  observable.subscribe(observerJosimar);
}, 3000);

setTimeout(() => {
  observable.subscribe(observerInstrutor);
}, 3000);
