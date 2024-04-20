/* Scrivere una funzione TypeScript moveToEnd1(a, k, f), 
dove a è un array che rappresenta una lista di valori di un dato tipo, 
k è un valore di quel tipo, e f è una funzione che confronta due valori 
di quel tipo e restituisce un valore booleano.
moveToEnd1 cerca la prima occorrenza di k nella lista che soddisfa f.
Se k si trova nella lista, restituisce la sua posizione nella lista (contando da 0)
e porta l’elemento di a che contiene k in fondo alla lista, altrimenti restituisce -1.
*/
function moveToEnd1<T>(a: T[], k: T, f: (a: T, b: T) => boolean): number {
  //find index trova il valore del primo elemento che rispetta la condizione dopo =>
  const index = a.findIndex((item) => f(item, k));

  if (index != -1) {
    const element = a.splice(index, 1)[0];
    a.push(element);
  }

  return index;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Si consideri una struttura dati ad albero binario, 
i cui nodi sono oggetti con quattro proprietà: sx e dx, 
che riferiscono rispettivamente al figlio sinistro e al figlio destro del nodo stesso; val e sotto,
due valori interi. Le proprietà sx e dx sono opzionali.
Si scriva in TS una funzione contaSotto(T) che, 
dato un albero binario T come argomento, conti per ogni nodo t in T (inclusa la radice) 
il numero di nodi appartenenti al sotto-albero di cui t è radice (t incluso). 
Questo valore deve essere scritto in sotto. La funzione restituisce il valore sotto della radice di T.
*/
interface TreeNode {
  sx?: TreeNode; //Si usa il punto interrogativo per indicare che può essere di quel tipo o no
  dx?: TreeNode;
  val: number;
  sotto: number;
}

function contaSotto(T: TreeNode | undefined): number {
  if (!T) {
    return 0;
  }

  let nodiSx: number = contaSotto(T.sx);
  let nodiDx: number = contaSotto(T.dx);

  T.sotto = nodiSx + nodiDx + 1;

  return T.sotto;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Si consideri una struttura dati ad albero binario, 
i cui nodi sono oggetti con quattro proprietà: sx e dx, 
che riferiscono rispettivamente al figlio sinistro e al figlio destro del nodo stesso;
val e conta, due valori interi. Le proprietà sx e dx sono opzionali.
Si scriva in TS una funzione contaAlbero(T) che, 
dato un albero binario T come argomento, conti per ogni nodo t in T (inclusa la radice)
il numero di nodi appartenenti al sotto-albero destro di cui t è radice (t escluso). 
Questo valore deve essere scritto in conta.
Nota: Si assuma che il valore di conta in ogni nodo in T sia inizialmente -Infinity.
Nota: NON USATE IL TIPO any.*/

interface TreeNode {
  sx?: TreeNode;
  dx?: TreeNode;
  val: number;
  conta: number;
}

function contaAlbero(T: TreeNode | undefined): number {
  if (!T) {
    return 0;
  }

  //Inizializzo il valore di conta a -Infinito
  if (T.conta === undefined) {
    T.conta = Number.NEGATIVE_INFINITY;
  }

  let contaDx = contaAlbero(T.dx);

  T.conta = contaDx;

  if (T.sx) {
    contaAlbero(T.sx);
  }
  //Se T.sx esiste => contaAlbero(T.sx) altrimenti => return 0
  return contaDx + (T.sx ? contaAlbero(T.sx) : 0) + 1;
}

//Stessa soluzione per esercizio sottoalberoSinistro
interface Nodo {
  sx?: Nodo;
  dx?: Nodo;
  val: number;
  conta: number;
}

function contaSottoalbero(nodo: Nodo | undefined): number {
  if (!nodo) return 0;

  const sinistro = contaSottoalbero(nodo.sx);
  const destro = contaSottoalbero(nodo.dx);

  nodo.conta = sinistro;
  return sinistro + destro + 1;
}

function contaAlbero(T: Nodo): void {
  contaSottoalbero(T);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Si scriva in TS una funzione PotaAlberiT(T), 
che prende come parametro un albero binario T 
(i cui nodi sono implementati come visto a lezione come 
oggetti con chiavi val di tipo number, sx che contiene il nodo sinistro,
e dx che contiene il nodo destro). La funzione taglia i sottoalberi 'secchi'.
Un sottoalbero è secco se il valore nella radice del sottoalbero è < 0.
Il taglio avviene eliminando il nodo secco (si veda l'esempio).
La funzione non deve restituire nulla.
La soluzione deve essere scritta in TypeScript, 
definendo opportunamente i tipi, e non usando any o unknown.
*/
interface tree {
  val?: number;
  sx?: tree;
  dx?: tree;
}

function PotaAlberiT(T: tree | undefined): void {
  if (T == undefined) return;
  if (T.val! < 0) {
    delete T.val;
    delete T.sx;
    delete T.dx;
    return;
  } else {
    if (T.sx && T.sx.val! < 0) delete T.sx;
    else PotaAlberiT(T.sx);

    if (T.dx && T.dx.val! < 0) delete T.dx;
    else PotaAlberiT(T.dx);
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Si scriva in TS una struttura dati generica DrunkenList<T> che implementi 
una linked list (lista collegata) su degli oggetti generici di tipo Nodo<T>.
La classe DrunkenList<T> prevede un costruttore senza argomenti per inizializzare 
una lista vuota, una proprietà length contenente il numero di elementi della lista, 
ed espone le seguenti operazioni:
-push che prende come argomento un oggetto di tipo T e lo 
inserisce in testa se la lista contiene un numero pari di elementi, 
sia in testa che in coda se contiene un numero dispari.
-pop che rimuove e ritorna l'elemento in testa alla lista se questa
ha un numero dispari di elementi, l'elemento in coda se invece la lunghezza è pari. 
Nel caso la lista sia vuota, la funzione lancia un’eccezione con tipo 
ReferenceError (non la dovete ridefinire voi).
as_array che restituisce il contenuto della lista sotto forma di array.
La soluzione deve essere scritta in TypeScript, tenendo conto della corretta
dichiarazione dei tipi in ingresso ed in uscita dei metodi (e non usando any o unknown).
Nota: la lista deve essere implementata in modo collegato (linked).
*/

class Nodo<T> {
  value: T;
  next: Nodo<T> | undefined;
  prec: Nodo<T> | undefined;

  constructor(value: T) {
    this.value = value;
    this.next = undefined;
    this.prec = undefined;
  }
}

class DrunkenList<T> {
  head: Nodo<T> | undefined;
  tail: Nodo<T> | undefined;
  length: number;

  constructor() {
    this.length = 0;
    this.head = undefined;
    this.tail = undefined;
  }

  insert_tail(value: T) {
    if (this.tail == undefined) {
      this.head = new Nodo(value);
      this.tail = this.head;
    } else {
      this.tail.next = new Nodo(value);
      this.tail.next.prec = this.tail;
      this.tail = this.tail.next;
    }
    this.length += 1;
  }

  insert_head(value: T) {
    if (this.head == undefined) {
      this.head = new Nodo(value);
      this.tail = this.head;
    } else {
      this.head.prec = new Nodo(value);
      this.head.prec.next = this.head;
      this.head = this.head.prec;
    }
    this.length += 1;
  }

  remove_tail(): T {
    // At least one element should be in the list
    if (this.tail == undefined) {
      throw new ReferenceError();
    }

    // Valore dell'ultimo nodo
    let val = this.tail.value;

    // Unico elemento
    if (this.tail.prec == undefined) {
      this.head = undefined;
      this.tail = undefined;
    } else {
      // Penultimo senza successore
      this.tail.prec.next = undefined;
      // Sostituisci ultimo con penultimo
      this.tail = this.tail.prec;
    }

    // Diminuisci lunghezza
    this.length -= 1;
    // Ritorna valore
    return val;
  }

  remove_head(): T {
    // At least one element should be in the list
    if (this.head == undefined) {
      throw new ReferenceError();
    }

    // Valore dell'ultimo nodo
    let val = this.head.value;

    // Unico elemento
    if (this.head.next == undefined) {
      this.head = undefined;
      this.tail = undefined;
    } else {
      // Sostituisci testa
      this.head.next.prec = undefined;
      // Sostituisci ultimo con penultimo
      this.head = this.head.next;
    }

    // Diminuisci lunghezza
    this.length -= 1;
    // Ritorna valore
    return val;
  }

  push(value: T) {
    // Inserisci in testa
    this.insert_head(value);
    // Inserisci anche in coda
    if ((this.length - 1) % 2 != 0) {
      this.insert_tail(value);
    }
  }

  pop(): T {
    if (this.length % 2 == 0) {
      // Rimuove coda se pari
      return this.remove_tail();
    } else {
      // Rimuove testa se dispari
      return this.remove_head();
    }
  }

  as_array(): T[] {
    let ptr = this.head;
    let arr = [];
    while (ptr != undefined) {
      arr.push(ptr.value);
      ptr = ptr.next;
    }
    return arr;
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Si consideri una lista di punti nel piano cartesiano; 
la lista è implementata mediante oggetti avente due proprietà, 
con chiavi val e next, dove val rappresenta un punto nel piano cartesiano e deve essere 
definito come coppia di numeri, e next il successivo punto nella lista (l'ultimo ha next a null). 
Ad esempio, la coppia [-2,3] sarà usata per rappresenta il punto la cui coordinata 
x è -2 e la cui coordinata y è 4.
Si implementi in JavaScript la funzione filter(l,p) definita come segue: Dati in input una lista l e un predicato p, 
filter restituisce un array contenente tutti i punti in l che soddisfano il predicato p, nello stesso ordine 
in cui appaiono nella lista originale. L'array DEVE essere calcolato RICORSIVAMENTE affinchè l'esercizio 
sia valutato positivamente.
Si implementi, inoltre, una funzione sortedFilter che calcoli lo stesso array di filter, 
restituendolo però ordinato per coordinate crescenti (ovvero mettendo prima i punti con 
coordinate x minori e, a parità di x, quelli con coordinate y minori).
L'esercizio dovrebbe essere in Javascript ma lo sto facendo in Typescript
*/
type Point = [number, number];
interface ListaPunti {
  val: Point;
  next: Node | null;
}

function filter(l: Node | null, p: (point: Point) => boolean): Point[] {
  if (!l) return [];

  let currentPoint = l.val;
  let restOfList = filter(l.next, p);

  if (p(currentPoint)) {
    return [currentPoint, ...restOfList];
  } else {
    return restOfList;
  }
}

function sortedFilter(l: Node | null, p: (point: Point) => boolean): Point[] {
  let filteredList = filter(l, p);

  filteredList.sort((a, b) => {
    if (a[0] === b[0]) {
      return a[1] - b[1];
    } else {
      return a[0] - b[0];
    }
  });

  return filteredList;
}

//JS VERSION
function JSfilter(l, p) {
  if (!l) return [];

  const currentPoint = l.val;
  const restOfList = filter(l.next, p);

  if (p(currentPoint)) {
    return [currentPoint, ...restOfList];
  } else {
    return restOfList;
  }
}

function JSsortedFilter(l, p) {
  const filteredList = filter(l, p);

  filteredList.sort((a, b) => {
    if (a[0] === b[0]) {
      return a[1] - b[1];
    } else {
      return a[0] - b[0];
    }
  });

  return filteredList;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Si vuole implementare una classe TypeScript OrdSet che fornisca un insieme ordinato 
di elementi di tipo omogeneo. Un insieme ordinato ha le consuete proprietà di un insieme,
ma in più mantiene un ordine fra i suoi elementi. Nel nostro caso, l'ordinamento desiderato 
è implementato da una funzione cmp(a,b) che restituisce un qualunque numero minore di 0 se 
, esattamente 0 se 
, e un qualunque numero maggiore di 0 se 
. Si noti che il concetto di "maggiore", "minore", "uguale" è definito dalla funzione cmp, 
non è necessariamente l'ordinamento degli operatori <, >, >=, <=, ==, ===, !=, !== di TypeScript.
La classe deve implementare i seguenti metodi:
un costruttore, che prende come argomento la funzione cmp da usare per i confronti
un metodo add(e) che aggiunge l'elemento e all'insieme (se e è già presente, l'insieme non viene modificato)
un metodo remove(e) che rimuove l'elemento e dall'insieme (se e non è presente, l'insieme non viene modificato)
un metodo list() che restituisce un array contenente gli elementi dell'insieme, nell'ordine stabilito da cmp
Come sempre, si curi di definire i tipi nella maniera più precisa possibile.
*/

type CompareFunction<T> = (a: T, b: T) => number;

class OrdSet<T> {
  private elements: T[];
  private cmp: CompareFunction<T>;

  constructor(cmp: CompareFunction<T>) {
    this.elements = [];
    this.cmp = cmp;
  }

  add(e: T): void {
    if (!this.elements.some((el) => this.cmp(el, e) === 0)) {
      this.elements.push(e);
      this.elements.sort(this.cmp);
    }
  }

  remove(e: T): void {
    this.elements = this.elements.filter((el) => this.cmp(el, e) !== 0);
  }

  list(): T[] {
    return [...this.elements];
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Scrivere una funzione TypeScript moveToFront1(a, k, f), 
dove a è un array che rappresenta una lista di valori di un dato tipo, 
k è un valore di quel tipo, e f è una funzione che confronta due valori di 
quel tipo e restituisce un valore booleano.
moveToFront1 cerca la prima occorrenza di k nella lista che soddisfa f.
Se k si trova nella lista, restituisce la sua posizione nella lista 
(contando da 0) e porta l’elemento di a che contiene k in testa alla 
lista, altrimenti restituisce -1.
Nota: Si assuma che la testa della lista sia l'elemento 0 di a, 
mentre la coda l'ultimo. Come sempre, si curi di definire i tipi 
nella maniera più precisa possibile.
*/

type CompareFunction<T> = (a: T, b: T) => boolean;

function moveToFront1<T>(a: T[], k: T, f: CompareFunction<T>): number {
  const index = a.findIndex((item) => f(item, k));
  if (index !== -1) {
    const foundItem = a[index];
    a.splice(index, 1);
    a.unshift(foundItem);
    return index;
  }
  return -1;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Scrivere una classe TypeScript MoveToEndC, che gestisce valori di qualsiasi tipo. 
In particolare, la classe ha come proprietà:
-un array a che rappresenta una lista di valori di un dato tipo;
-una funzione f che confronta due valori di quel tipo e restituisce un valore booleano.
La classe ha un costruttore che inizializza le due proprietà con i valori passati come argomento, 
nell'ordine l'array e la funzione. Inoltre, la classe implementa un metodo move(k), 
dove k è un valore dello stesso tipo dei valori in a.
move cerca la prima occorrenza di k nella lista che soddisfa f. 
Se k si trova nella lista, restituisce la sua posizione nella lista 
(contando da 0) e porta l’elemento di a che contiene k in coda alla
lista, altrimenti restituisce -1.
Nota: Si assuma che la testa della lista sia l'elemento 0 di a, 
mentre la coda l'ultimo. Come sempre, si curi di definire i tipi 
nella maniera più precisa possibile.
*/

class MoveToEndC<T> {
  a: T[];
  f: (t: T, k: T) => boolean;

  constructor(arr: T[], compareFn: (t: T, k: T) => boolean) {
    this.a = arr;
    this.f = compareFn;
  }

  move(k: T): number {
    const index = this.a.findIndex((item) => this.f(item, k));

    if (index !== -1) {
      const movedElement = this.a.splice(index, 1)[0];
      this.a.push(movedElement);
      return index;
    }

    return -1;
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Scrivere una classe TypeScript MoveToFrontC, che gestisce valori di qualsiasi tipo. 
In particolare, la classe ha come proprietà:
-un array a che rappresenta una lista di valori di un dato tipo;
-una funzione f che confronta due valori di quel tipo e restituisce un valore booleano.
La classe ha un costruttore che inizializza le due proprietà con i valori passati come argomento, 
nell'ordine l'array e la funzione. Inoltre, la classe implementa un metodo move(k), 
dove k è un valore dello stesso tipo dei valori in a.
move cerca la prima occorrenza di k nella lista che soddisfa f. 
Se k si trova nella lista, restituisce la sua posizione nella lista 
(contando da 0) e porta l’elemento di a che contiene k in cima alla
lista, altrimenti restituisce -1.
Nota: Si assuma che la testa della lista sia l'elemento 0 di a, 
mentre la coda l'ultimo. Come sempre, si curi di definire i tipi 
nella maniera più precisa possibile.
*/

class MoveToFrontC<T> {
  a: T[];
  f: (t: T, k: T) => boolean;

  constructor(arr: T[], compareFn: (t: T, k: T) => boolean) {
    this.a = arr;
    this.f = compareFn;
  }

  move(k: T): number {
    const index = this.a.findIndex((item) => this.f(item, k));

    if (index !== -1) {
      const movedElement = this.a.splice(index, 1)[0];
      this.a.unshift(movedElement);
      return index;
    }

    return -1;
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Si consideri l'interfaccia List definita come segue:
interface List {
val: Point
next: List | null
}
dove il tipo Point rappresenta un punto nel piano cartesiano e deve 
essere definito come coppia di numeri. Ad esempio, la coppia [-2,3] 
sarà usata per rappresenta il punto la cui coordinata x è -2 e la cui coordinata y è 4.
Si implementi in TypeScript la funzione filter definita come segue: 
Dati in input una lista l e un predicato p, filter restituisce un array 
contenente tutti i Point in l che soddisfano il predicato p, nello stesso 
ordine in cui appaiono nella lista originale. L'array DEVE essere calcolato 
RICORSIVAMENTE affinchè l'esercizio sia valutato positivamente.
Si implementi, inoltre, una funzione sortedFilter che calcoli lo stesso array 
di filter, restituendolo però ordinato per coordinate crescenti 
(ovvero mettendo prima i punti con coordinate x minori e, a parità di x, 
quelli con coordinate y minori).
Suggerimento: sortedFilter può essere realizzata riusando la 
funzione filter per calcolare l'array, ordinandolo successivamente 
sfruttando le funzioni offerte dalla libreria Array di JS.
Tutti i tipi devono essere rigorosamente e accuratamente annotati.
*/

type Point = [number, number];
type Predicate = (x: Point) => boolean;

interface List {
  val: Point;
  next: List | null;
}

function filter(list: List | null, p: Predicate): Point[] {
  let res: Point[] = [];
  if (list) {
    if (p(list.val)) res.push(list.val);
    res = res.concat(filter(list.next, p));
  }
  return res;
}

function sortedFilter(list: List | null, p: Predicate): Point[] {
  let res = filter(list, p);
  res.sort((x: Point, y: Point) => {
    if (x[0] == y[0]) return x[1] - y[1];
    else return x[0] - y[0];
  });
  return res;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Si vuole realizzare una raccolta differenziata di valori TypeScript. 
Si scriva una classe Discarica con le seguenti proprietà:
una proprietà privata cestini, il cui valore è una mappa fra nomi di 
tipi (espressi come stringa, come restituito dall'operatore typeof) e 
una sequenza di valori di quel tipo;
un metodo pubblico butta(v) che, dato un qualunque valore v, lo aggiunge 
in coda al cestino corrispondente al suo tipo;
un metodo pubblico svuota(t) che, ricevuta una stringa t, restituisce 
un array con tutti i valori di tipo t precedentemente buttati (in ordine cronologico),
e svuota il cestino del tipo t. Se t non è un nome di tipo valido, il
metodo deve lanciare un'eccezione di tipo WrongTypeError (che dovrete definire);
un metodo pubblico quanti(t) che, ricevuta una string t, restituisce 
il numero totale di valori di tipo t buttati (sia già svuotati che ancora nel cestino). 
Se t non è un nome di tipo valido, il metodo deve lanciare un'eccezione 
di tipo WrongTypeError (che dovrete definire);
un metodo pubblico classi() che restituisce un Set contenente tutte le 
classi dei valori di tipo "object" attualmente presenti nel cestino relativo.
Si curi di annotare più precisamente possibile tutti i tipi.
*/

// Nota: questa versione accetta stringhe e controlla la validità a runtime
// Una versione che dichiarasse un tipo ValidTypeNames="string"|"number" ecc.
// sarebbe ragionevole, ma non consentirebbe di lanciare l'eccezione come richiesto dal testo.

class WrongTypeError extends Error {}

class Discarica {
  private cestini: { [tipo: string]: any[] } = {};
  private contatori: { [tipo: string]: number } = {};

  private valid(t: string): boolean {
    return /string|number|boolean|undefined|object|function/.test(t);
  }

  public butta(v: any): void {
    if (!(typeof v in this.cestini)) {
      this.cestini[typeof v] = [];
      this.contatori[typeof v] = 0;
    }
    this.cestini[typeof v].push(v);
    this.contatori[typeof v]++;
  }

  public svuota(t: string): any[] {
    if (!this.valid(t)) throw new WrongTypeError(`Invalid type name ${t}`);
    if (t in this.cestini) {
      let r = this.cestini[t];
      this.cestini[t] = [];
      return r;
    } else {
      return [];
    }
  }

  public quanti(t: string): number {
    if (!this.valid(t)) throw new WrongTypeError(`Invalid type name ${t}`);
    if (t in this.contatori) return this.contatori[t];
    else return 0;
  }

  public classi(): Set<Function> {
    let s = new Set<Function>();
    let o = this.cestini["object"] || [];
    o.forEach((e) => s.add(e.constructor));
    return s;
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Si scriva in TypeScript una funzione setaccio(a,f) che, 
preso un array omogeneo a di un qualche tipo, e una funzione f 
che dato un valore del tipo degli elementi di a restituisca un 
valore di tipo "cbool", restituisca un oggetto con due proprietà: 
una di nome "yes" il cui valore è un array degli elementi di a che
soddisfano f, e una di nome "no" il cui valore è un array degli 
elementi di a che non soddisfano f, ciascuno nello stesso ordine 
in cui gli elementi comparivano in a.
Il tipo cbool include (solo) i valori true e 1 che vengono 
interpretati come "soddisfatto", e false e 0 che vengono interpretati 
come "non soddisfatto". NOTA: dovrete dichiarare il tipo cbool 
nel vostro codice (con esattamente questo nome).
Abbiate cura di annotare il più precisamente possibile i tipi di tutte le dichiarazioni.
*/

type cbool = true | 1 | false | 0;

function setaccio<T>(a: T[], f: (val: T) => cbool): { yes: T[]; no: T[] } {
  const yes: T[] = [];
  const no: T[] = [];

  for (const val of a) {
    if (f(val)) {
      yes.push(val);
    } else {
      no.push(val);
    }
  }

  return { yes, no };
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Si consideri la seguente interfaccia TS:
interface Nodo<T> {
val: T,
children: Nodo<T>[]
}
per la rappresentazione di alberi generici k-ari.
Si definisca una funzione trova che prende in input tre parametri:
La radice root di un albero k-ario rappresentato come indicato sopra 
(e contenente almeno un valore).
Una funzione controlla che, dato un valore del tipo contenuto nell'albero, 
restituisce un booleano.
Una funzione confronta che, dati due valori del tipo contenuto nell'albero, 
restituisce un numero (minore di zero se il primo valore è da considerarsi 
più piccolo del secondo, uguale a zero se sono uguali, e maggiore di zero 
se il primo valore è da considerarsi più grande del secondo).
La funzione trova restituisce un array contenente i valori contenuti nell'
albero radicato in root e che soddisfano il predicato controlla. 
L'array restituito è ordinato secondo la funzione confronta.
*/
interface Nodo<T> {
  val: T;
  children: Nodo<T>[];
}

function trova<T>(
  root: Nodo<T>,
  controlla: (val: T) => boolean,
  confronta: (val1: T, val2: T) => number
): T[] {
  const risultato: T[] = [];

  // Funzione ricorsiva per attraversare l'albero
  function visita(nodo: Nodo<T>) {
    if (controlla(nodo.val)) {
      risultato.push(nodo.val);
    }
    nodo.children.sort((a, b) => confronta(a.val, b.val)); // Ordina i figli del nodo corrente
    for (const child of nodo.children) {
      visita(child); // Chiama ricorsivamente la funzione per ogni figlio
    }
  }

  visita(root); // Avvia la visita dall'elemento radice

  return risultato.sort(confronta); // Ordina il risultato finale
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*i definisca l'interfaccia Nodo per rappresentare alberi k-ari generici con campi 
val e figli. Si definisca poi una funzione sbarba che, dati in input la radice 
di un albero e un predicato s, elimini tutti i sottoalberi radicati in un nodo 
il cui valore soddisfa s.
La soluzione deve essere scritta in TypeScript, definendo opportunamente i tipi, e non usando any o unknown.
*/
interface Nodo<T> {
  val: T;
  figli?: Nodo<T>[];
}

function sbarba<T>(root: Nodo<T>, s: (x: T) => boolean): void {
  let i: number = 0;
  while (root.figli && i < root.figli.length) {
    if (s(root.figli[i].val)) {
      root.figli.splice(i, 1);
    } else {
      sbarba(root.figli[i], s);
      i++;
    }
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Si consideri l'interfaccia List definita come segue:
interface List {
val: Point;
next: List | null
}
dove il tipo Point rappresenta un punto nel piano cartesiano e deve essere definito 
come coppia di numeri. Ad esempio, la coppia [-2,3] sarà usata per rappresenta il punto 
la cui coordinata x è -2 e la cui coordinata y è 4.
Si implementi in TypeScript la funzione filter definita come segue: Dati in input una lista 
l e un predicato p, filter restituisce un array contenente tutti i Point in l che soddisfano 
il predicato p, nello stesso ordine in cui appaiono nella lista originale. L'array DEVE essere 
calcolato RICORSIVAMENTE affinchè l'esercizio sia valutato positivamente.
Si implementi, inoltre, una funzione sortedFilter che calcoli lo stesso array di filter, 
restituendolo però ordinato per coordinate crescenti (ovvero mettendo prima i punti con 
  coordinate x minori e, a parità di x, quelli con coordinate y minori).
Suggerimento: sortedFilter può essere realizzata riusando la funzione filter per calcolare 
l'array, ordinandolo successivamente sfruttando le funzioni offerte dalla libreria Array di JS.
*/

type Point = [number, number];
type Predicate = (x: Point) => boolean;

interface List {
  val: Point;
  next: List | null;
}

function filter(list: List | null, p: Predicate): Point[] {
  let res: Point[] = [];
  if (list) {
    if (p(list.val)) res.push(list.val);
    res = res.concat(filter(list.next, p));
  }
  return res;
}

function sortedFilter(list: List | null, p: Predicate): Point[] {
  let res = filter(list, p);
  res.sort((x: Point, y: Point) => {
    if (x[0] == y[0]) return x[1] - y[1];
    else return x[0] - y[0];
  });
  return res;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Si consideri l'interfaccia List definita come segue:
interface List {
val: Point;
next: List | null
}
dove il tipo Point rappresenta un punto nel piano cartesiano e deve essere definito 
come coppia di numeri. Ad esempio, la coppia [-2,3] sarà usata per rappresenta il punto 
la cui coordinata x è -2 e la cui coordinata y è 4.
Si implementi in TypeScript la funzione filter definita come segue: Dati in input una lista 
l e un predicato p, filter restituisce un array contenente tutti i Point in l che soddisfano 
il predicato p, nello stesso ordine in cui appaiono nella lista originale. L'array DEVE essere 
calcolato RICORSIVAMENTE affinchè l'esercizio sia valutato positivamente.
Si implementi, inoltre, una funzione sortedFilter che calcoli lo stesso array di filter, 
restituendolo però ordinato per coordinate crescenti (ovvero mettendo prima i punti con 
  coordinate x minori e, a parità di x, quelli con coordinate y minori).
Suggerimento: sortedFilter può essere realizzata riusando la funzione filter per calcolare 
l'array, ordinandolo successivamente sfruttando le funzioni offerte dalla libreria Array di JS.
*/

interface Nodo {
  sx?: Nodo;
  dx?: Nodo;
  val: number;
  grande: number;
}

function contaMax(T: Nodo): number {
  // Funzione ricorsiva per calcolare il massimo dei valori nei sottoalberi di un nodo
  function calcolaMassimo(nodo: Nodo | undefined): number {
    if (!nodo) return Number.NEGATIVE_INFINITY;

    const maxSx = calcolaMassimo(nodo.sx);
    const maxDx = calcolaMassimo(nodo.dx);
    const maxCorrente = Math.max(nodo.val, maxSx, maxDx);

    nodo.grande = maxCorrente; // Imposta il massimo nel nodo corrente

    return maxCorrente;
  }

  // Calcola il massimo di tutto l'albero in modo ricorsivo
  calcolaMassimo(T);

  return T.grande; // Restituisce il massimo della radice
}

//Per il MIN:

interface Nodo {
  sx?: Nodo;
  dx?: Nodo;
  val: number;
  piccolo: number;
}

function contaMin(T: Nodo): number {
  // Funzione ricorsiva per calcolare il minimo dei valori nei sottoalberi di un nodo
  function calcolaMinimo(nodo: Nodo | undefined): number {
    if (!nodo) return Number.POSITIVE_INFINITY;

    const minSx = calcolaMinimo(nodo.sx);
    const minDx = calcolaMinimo(nodo.dx);
    const minCorrente = Math.min(nodo.val, minSx, minDx);

    nodo.piccolo = minCorrente; // Imposta il minimo nel nodo corrente

    return minCorrente;
  }

  // Calcola il minimo di tutto l'albero in modo ricorsivo
  calcolaMinimo(T);

  return T.piccolo; // Restituisce il minimo della radice
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Si consideri in TS la gestione di una lavanderia, definendo 
una enum TipoLavaggio per modellare i tipi di lavaggio ammessi, 
ovvero Intensivo (90 minuti), Secco (60 minuti) e Delicati (30 minuti), e 
una enum TipoTessuto per modellare i tipi di tessuto trattati, 
ovvero Cotone, Seta, Sintetico, Lana.
Si consideri inoltre che i tessuti modificano i tempi di lavaggio secondo i seguenti moltiplicatori: 
Cotone -> 1.1
Seta -> 2
Sintetico -> 0.9
Lana -> 1.75
Inoltre, alcuni tessuti sono incompatibili con alcuni tipi di lavaggio: 
Seta e Lana non possono essere lavate con Intensivo, mentre il Sintetico 
non può essere lavato a Secco. 
Si definisca infine il tipo Lavaggio, da definire come una tupla contenente 
un TipoTessuto e un TipoLavaggio, in questo ordine.
Si scriva una funzione processa(lavaggi) che, dato un array di elementi 
di tipo Lavaggio, lo ordini in place in base al tempo di esecuzione 
(calcolato come il tempo del tipo lavaggio modificato secondo il tipo di tessuto lavato), 
lanciando un'eccezione di tipo LavaggioError se viene richiesto un tipo di lavaggio incompatibile con un tessuto
La soluzione deve essere scritta in TypeScript, definendo opportunamente i tipi, 
e non usando any o unknown. Saranno preferite le soluzioni che sfruttino le enum per 
codificare opportunamente i tempi di lavaggio ed i loro moltiplicatori.
*/

class LavaggioError extends Error {}

enum TipoTessuto {
  Cotone = 1.1,
  Seta = 2.0,
  Sintetico = 0.9,
  Lana = 1.75,
}

enum TipoLavaggio {
  Intensivo = 90,
  Secco = 60,
  Delicati = 30,
}

type Lavaggio = [TipoTessuto, TipoLavaggio];

function durata_lavaggio(lavaggio: Lavaggio): number {
  return lavaggio[0] * lavaggio[1];
}

function processa(lavaggi: Lavaggio[]): void {
  // Check lavaggio
  for (let lavaggio of lavaggi) {
    if (
      (lavaggio[1] == TipoLavaggio.Intensivo &&
        (lavaggio[0] == TipoTessuto.Seta || lavaggio[0] == TipoTessuto.Lana)) ||
      (lavaggio[1] == TipoLavaggio.Secco &&
        lavaggio[0] == TipoTessuto.Sintetico)
    ) {
      throw new LavaggioError();
    }
  }
  // In-place sorting
  lavaggi.sort((a: Lavaggio, b: Lavaggio): number => {
    return durata_lavaggio(a) - durata_lavaggio(b);
  });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Si vuole implementare una classe TypeScript Matrix che fornisca l'implementazione di una 
matrice contenente elementi di tipo omogeneo insieme alla possibilità di eseguire un prodotto di Hadamard 
tra le due matrici. Il prodotto di Hadamard tra due matrici 
restituisce un nuova matrice in cui ciascun elemento è il prodotto degli elementi corrispondenti in e 
Nel nostro caso, per implementare il prodotto 
 tra elementi di tipo generico (
 e 
), verrà passato al costruttore della classe una funzione 
 che restituisce l'elemento 
 che è il risultato del prodotto tra 
 e 
 (che avranno sempre lo stesso tipo).
La classe deve implementare solo i seguenti campi pubblici:
row: numero di righe della matrice
col: numero di colonne della matrice
La classe deve implementare i seguenti metodi pubblici:
un costruttore, che prende come argomenti (in ordine): numero righe, numero colonne e la funzione prodF
un metodo 
 che inizializza la matrice mettendo in ogni posizione il valore 
un metodo 
 che restituisce l'elemento della matrice in posizione (i,j)
un metodo 
 che inserisce il valore 
 in posizione (i,j) della matrice
un metodo 
 che restituisce una nuovo oggetto Matrix ottenuto dal prodotto di Hadamard tra l'oggetto matrice corrente e B. Se la matrice corrente e la matrice B non hanno la stessa dimensione il metodo lancia un eccezione 
 (da definire adeguatamente).
E' possibile implementare tutti i campi privati che si ritiene necessari (ma DEVONO essere privati).

Come sempre, si curi di definire i tipi nella maniera più precisa possibile: l'uso di 
 non è ammesso.
*/

type MulFun<T> = (e1: T, e2: T) => T;
class SizeError extends Error {}

class Matrix<T> {
  row: number;
  col: number;
  private M: T[][];
  private mul: MulFun<T>;

  constructor(r: number, c: number, f: MulFun<T>) {
    this.M = [];
    this.row = r;
    this.col = c;
    this.mul = f;
  }

  init(n: T) {
    for (let i = 0; i < this.row; i++) {
      this.M.push([]);
      for (let j = 0; j < this.col; j++) {
        this.M[i].push(n);
      }
    }
  }

  get_el(i: number, j: number): T {
    return this.M[i][j];
  }

  set_el(i: number, j: number, el: T) {
    this.M[i][j] = el;
  }

  hadam_product(B: Matrix<T>): Matrix<T> {
    if (this.row != B.row || this.col != B.col) throw new SizeError();
    let C: Matrix<T> = new Matrix(this.row, this.col, this.mul);
    if (this.row > 0) {
      C.init(this.M[0][0]);
      for (let i = 0; i < this.row; i++)
        for (let j = 0; j < this.col; j++)
          C.set_el(i, j, this.mul(this.M[i][j], B.get_el(i, j)));
    }
    return C;
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Si scriva in TypeScript una classe NodoBinT che implementi un nodo di un albero binario, 
con le seguenti caratteristiche:
ogni nodo ha un campo valore di nome val, di tipo qualunque (generics), un 
campo label (una etichetta di tipo stringa), e due figli memorizzati in un array children
il costruttore ha come argomenti il valore e l'etichetta, che per default è la stringa vuota
ogni nodo ha un metodo add() che prende come argomento un numero qualunque di 
altri NodoBinT, i cui elementi diventano figli del nodo, in ordine da sx a dx. 
Il tentativo di aggiungere più di due figli deve lanciare una eccezione di tipo 
AlberoInvalido (che dovrete definire nel vostro codice)
ogni nodo ha un generatore visit() che restituisce, in pre-order (ovvero anticipata: 
visitando prima il padre, poi i figli nell'ordine in cui sono stati aggiunti) tutti 
i valori dei nodi del sottoalbero radicato nel nodo, uno alla volta. NOTA: Il tipo di 
ritorno del generatore è IterableIterator (da istanziare con il tipo giusto).
La soluzione deve essere scritta in TypeScript, definendo opportunamente i tipi, e non usando any o unknown.
*/

class AlberoInvalido extends Error {}

class NodoBinT<T> {
  val: T;
  label: string;
  children: NodoBinT<T>[];
  constructor(val: T, label: string = "") {
    this.val = val;
    this.label = label;
    this.children = [];
  }

  add(...children: NodoBinT<T>[]): void {
    if (this.children.length + children.length > 2)
      throw new AlberoInvalido("Not binary");
    else this.children.push(...children);
  }

  *visit(): IterableIterator<T> {
    yield this.val;
    for (var c of this.children) {
      for (var v of c.visit()) yield v;
    }
    return;
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Si vuole implementare una classe TypeScript OrdSet che fornisca un insieme ordinato di elementi di tipo omogeneo. 
Un insieme ordinato ha le consuete proprietà di un insieme, ma in più mantiene un ordine fra i suoi elementi. 
Nel nostro caso, l'ordinamento desiderato è implementato da una funzione cmp(a,b) che restituisce un qualunque 
numero minore di 0 se 
, esattamente 0 se 
, e un qualunque numero maggiore di 0 se 
. Si noti che il concetto di "maggiore", "minore", "uguale" è definito dalla funzione cmp, 
non è necessariamente l'ordinamento degli operatori <, >, >=, <=, ==, ===, !=, !== di TypeScript.
La classe deve implementare i seguenti metodi:
un costruttore, che prende come argomento la funzione cmp da usare per i confronti
un metodo add(e) che aggiunge l'elemento e all'insieme (se e è già presente, l'insieme non viene modificato)
un metodo remove(e) che rimuove l'elemento e dall'insieme (se e non è presente, l'insieme non viene modificato)
un metodo list() che restituisce un array contenente gli elementi dell'insieme, nell'ordine stabilito da cmp
Come sempre, si curi di definire i tipi nella maniera più precisa possibile
*/

type CmpFun<T> = (a: T, b: T) => number;

class OrdSet<T> {
  cmp: CmpFun<T>;
  elements: T[];

  constructor(cmp: CmpFun<T>) {
    this.cmp = cmp;
    this.elements = [];
  }

  add(e: T): void {
    if (this.elements.findIndex((f: T) => this.cmp(e, f) == 0) == -1)
      this.elements.push(e);
  }

  remove(e: T): void {
    var i: number;
    if ((i = this.elements.findIndex((f: T) => this.cmp(e, f) == 0)) >= 0)
      this.elements.splice(i, 1);
  }

  list(): T[] {
    this.elements.sort(this.cmp);
    return this.elements;
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Si consideri la seguente interfaccia TNode, che definisce i nodi di un albero k-ario:
interface TNode<T> {
val: T,
children: TNode<T>[]
}
Si scriva una funzione biggest che prende in input due parametri: la radice root di 
un albero e una funzione bigger che dati due valori (del tipo contenuto nell'albero) 
restituisce true se il primo valore è maggiore del secondo e false altrimenti. La funzione 
biggest deve calcolare ricorsivamente l'elemento più grande nell'albero radicato in root secondo 
la funzione bigger. Se l'albero non contiene nessun elemento, la funzione deve restituire undefined.
Nota: La soluzione deve essere scritta in TypeScript, tipando ogni firma e dichiarazione nel 
modo più preciso possibile (es. usare any, invalida l'esercizio).
*/

interface TNode<T> {
  val: T;
  children: TNode<T>[];
}

function biggest<T>(
  root: TNode<T> | undefined,
  bigger: (x: T, y: T) => boolean
): T | undefined {
  if (!root) return undefined;
  else return _biggest(root, bigger);
}

function _biggest<T>(root: TNode<T>, bigger: (x: T, y: T) => boolean): T {
  if (root.children.length == 0) return root.val;
  let m: T = root.val;
  for (let c of root.children) {
    let b: T = _biggest(c, bigger);
    if (bigger(b, m)) m = b;
  }
  return m;
}

/*Si definisca in TS una classe Agenda il cui costruttore prende in input il numero 
massimo di eventi che possono essere memorizzati per giorno nell'agenda. 
Gli eventi sono gestiti tramite un array di tipo Evento.
Ogni (tipo) Evento è modellato come una tupla contenente un oggetto di tipo 
Data ed una stringa rappresentante la descrizione dell'evento.
A sua volta, (il tipo) Data è una tripla che codifica il giorno come un numero, 
il mese come una stringa, e l'anno come un un numero.
La classe Agenda dispone dei seguenti metodi:
aggiungi: il metodo permette di inserire un oggetto Evento all'interno dell'agenda. 
La funzione controlla il massimo numero di eventi giornalieri e lancia un'eccezione 
GiornoPienoError se questo fosse superato dall'aggiunta del nuovo evento.
lista_eventi: il metodo restituisce un array contenente tutti gli Eventi registrati 
nella Data passata come argomento.
libera: Dato un oggetto Data passato come argomento, il metodo elimina tutti gli eventi
presenti nella giornata in input e restituisce il numero di eventi cancellati.
La soluzione deve essere scritta in TypeScript, tenendo conto della corretta dichiarazione dei tipi in ingresso ed in uscita dei metodi (e non usando any o unknown).
*/

class GiornoPienoError extends Error {}

type Data = [number, string, number];
type Evento = [Data, string];

function compara_date(d1: Data, d2: Data) {
  return d1[0] == d2[0] && d1[1] == d2[1] && d1[2] == d2[2];
}

class Agenda {
  eventi: Evento[];
  max_eventi: number;

  constructor(max_eventi: number) {
    this.eventi = [];
    this.max_eventi = max_eventi;
  }

  lista_eventi(data: Data): Evento[] {
    return this.eventi.filter((e) => compara_date(e[0], data));
  }

  aggiungi(evento: Evento): void {
    // Ottieni data
    let data = evento[0];
    // Conta eventi in data
    let n_eventi = this.lista_eventi(data).length;
    // Eventualmente aggiungi
    if (n_eventi < this.max_eventi) {
      this.eventi.push(evento);
    } else {
      throw new GiornoPienoError();
    }
  }

  libera(data: Data): number {
    let n_eventi = this.lista_eventi(data).length;
    this.eventi = this.eventi.filter((e) => !compara_date(e[0], data));
    return n_eventi;
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Si scriva una funzione Typescript sxdx(T) che, ricevuto come argomento un albero 
binario T strutturato come visto a lezione (oggetti con chiavi val di tipo string, 
sx che contiene il nodo sinistro, e dx che contiene il nodo destro), e con valori 
di tipo stringa, restituisca una coppia [l,r] in cui l è la stringa che si ottiene 
concatenando i valori di tutti i nodi, partendo dalla radice e scendendo sempre a 
sinistra finché è possibile, mentre r è la analoga stringa ottenuta scendendo sempre a destra.
La soluzione deve essere scritta in TypeScript, definendo opportunamente i tipi, e non usando any o unknown.
*/

interface Nodo {
  val: string;
  sx?: Nodo;
  dx?: Nodo;
}

function sxdx(T: Nodo): [string, string] {
  let l = "";
  let r = "";

  // Funzione ausiliaria per concatenare i valori scendendo sempre a sinistra
  function sinistra(nodo: Nodo | undefined) {
    while (nodo) {
      l += nodo.val;
      nodo = nodo.sx;
    }
  }

  // Funzione ausiliaria per concatenare i valori scendendo sempre a destra
  function destra(nodo: Nodo | undefined) {
    while (nodo) {
      r += nodo.val;
      nodo = nodo.dx;
    }
  }

  sinistra(T); // Concatena i valori scendendo sempre a sinistra dalla radice
  destra(T); // Concatena i valori scendendo sempre a destra dalla radice

  return [l, r];
}
