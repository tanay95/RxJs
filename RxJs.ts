import { combineAll, concat, interval, map, take, timer,of, concatAll, endWith, finalize, forkJoin, delay, mergeAll } from 'rxjs';

//combineAll
const source$ =  interval(1000).pipe(take(2));
const example$ = source$.pipe(map(val => interval(1000).pipe(map(i => `Result (${val}) ${i}`),take(5))));

example$.pipe(combineAll()).subscribe(console.log);

//combineLatest
//const timerOne$ = timer(1000,4000);
//const timerTwo$ = timer(2000,4000);
//const timerThree$ = timer(3000,4000);

//combineLatest(timerOne$,timerTwo$,timerThree$,(one,two,three) => {
//    return `Timer one latest: ${one},Timer secound latest: ${two},Timer three latest: ${three},`
//}).subscribe(console.log);

//concat
concat(of(1,2,3),of(4,5,6),of(7,8,9)).subscribe(console.log);

const obs1 = interval(1000).pipe(take(5));
const obs2 = interval(500).pipe(take(2));
const obs3 = interval(2000).pipe(take(1));

const source = of(obs1,obs2,obs3);
//concatAll
const example = source.pipe(concatAll());
example.subscribe(console.log);

//endWith + finalize
const exEndWith$ = of("Hello","Friend","GoodBye","Friend");
exEndWith$.pipe(endWith('Friend'),finalize(() => console.log('final')))
.subscribe(console.log);

//if any of the inner observables supplied to forkJoin error you will lose the value of any other observables that would or have already completed if you do not catch the error correctly on the inner observable.
//forkJoin
const exForJoin$ = forkJoin({sourceOne: of('Hello'),
sourceTwo: of('You').pipe(delay(1000)),
sourceThree: of('there') 
}).pipe(map(v => v.sourceOne + v.sourceTwo + v.sourceThree))

exForJoin$.subscribe(console.log);

//MergeAll
const exMergeAll$ = source.pipe(mergeAll(2));
console.log('merge all');
exMergeAll$.subscribe(console.log);
