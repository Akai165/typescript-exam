//NOTA BENE: Per tutto il file per spiegare le interfacce verrà usato il termine Oggetto.
//Per quanto l'utilizzo sia lo stesso, la semantica e alcune logiche dietro sono leggermente diverse
//Vi prego di guardare bene le differenze prima di dare per scontato ciò che è scritto in questo file
//Buono studio


/* Scrivere una funzione TypeScript moveToEnd1(a, k, f), 
dove a è un array che rappresenta una lista di valori di un dato tipo, 
k è un valore di quel tipo, e f è una funzione che confronta due valori 
di quel tipo e restituisce un valore booleano.
moveToEnd1 cerca la prima occorrenza di k nella lista che soddisfa f.
Se k si trova nella lista, restituisce la sua posizione nella lista (contando da 0)
e porta l’elemento di a che contiene k in fondo alla lista, altrimenti restituisce -1.
*/

//alla funzione viene passato come parametro un arrayt, k di tipo generico e f di tipo funzione (a, b) => bool
function moveToEnd1<T>(a: T[], k: T, f: (a: T, b: T) => boolean): number {
  //find index trova il valore del primo elemento che rispetta la condizione dopo =>
  const index = a.findIndex((item) => f(item, k));

  //se l'indice è diverso da -1 (valore non trovato) vado a prendere l'elemento e lo metto in fondo alla lista (push)
  if (index != -1) {
    const element = a.splice(index, 1)[0];
    a.push(element);
  }

  //vado a restituire l'indice dell'elemento
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

//vado a creare l'oggetto Nodo che avrà nodo sx e dx (opzionali ?:), un valore e un sotto.
interface TreeNode {
  sx?: TreeNode; //Si usa il punto interrogativo per indicare che può essere di quel tipo o no
  dx?: TreeNode;
  val: number;
  sotto: number;
}

//passo come parametro un nodo T che può essere nodo o undefined
function contaSotto(T: TreeNode | undefined): number {
  //se il nodo non esiste ritorno 0.
  if (!T) {
    return 0;
  }

  //vado a contare il numero di nodi a sinistra e destra ricorsivamente
  let nodiSx: number = contaSotto(T.sx);
  let nodiDx: number = contaSotto(T.dx);
  //aggiungo il valore dei nodi sottostanti alla variabile sotto aggiungendo 1 (T incluso)
  T.sotto = nodiSx + nodiDx + 1;
  //restituisco il numero di nodi sottostanti
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

//ogetto nodo con sx e dx opzionali, val e conta.
interface TreeNode {
  sx?: TreeNode;
  dx?: TreeNode;
  val: number;
  conta: number;
}

//passo alla funzione un nodo T di tipo nodo o undefined
function contaAlbero(T: TreeNode | undefined): number {
  //se il nodo non esiste ritorno 0
  if (!T) {
    return 0;
  }

  //inizializzo il valore di conta a -Infinito
  if (T.conta === undefined) {
    T.conta = Number.NEGATIVE_INFINITY;
  }
  //conto i sottoalberi di destra ricorsivamente
  let contaDx = contaAlbero(T.dx);
  //inserisco il valore di contaDx dentro la proprietà del nodo
  T.conta = contaDx;
  //se ho dei nodi pure a sinistra conto anche quelli
  if (T.sx) {
    contaAlbero(T.sx);
  }
  //Se T.sx esiste => contaAlbero(T.sx) altrimenti => return 0
  return contaDx + (T.sx ? contaAlbero(T.sx) : 0) + 1;
}

//Stessa soluzione per esercizio sottoalberoSinistro, guarda ex. sopra per i commenti
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

//oggetto albero con valore, sx e dx opzionali (?:)
interface tree {
  val?: number;
  sx?: tree;
  dx?: tree;
}

//passo alla funzione un nodo che può essere tree o undefined
function PotaAlberiT(T: tree | undefined): void {
  //se il nodo è undefined allora interrompo la funzione
  if (T == undefined) return;
  //se il valore del nodo non è null o undefined (si controlla usanto !), e < di 0, allora
  if (T.val! < 0) {
    //andiamo ad eliminare il nodo eliminando tutti i suoi elementi
    delete T.val;
    delete T.sx;
    delete T.dx;
    return;
  } else { //altrimenti
    //se il nodo sinistro e il valore del nodo sinistro sono diversi da null o undefined e < di 0, allora eliminiamo il nodo sx
    if (T.sx && T.sx.val! < 0) delete T.sx;
    else PotaAlberiT(T.sx); //altrimenti andiamo a richiamare la funzione per il sottoalbero sinistro
    //se il nodo sinistro e il valore del nodo destro sono diversi da null o undefined e < di 0, allora eliminiamo il nodo dx
    if (T.dx && T.dx.val! < 0) delete T.dx;
    else PotaAlberiT(T.dx); //altrimenti andiamo a richiamare la funzione per il sottoalbero destro
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
//questo esercizio è il cancro, spero vivamente all'esame di non averlo che sennò mi sparo in bocca

//inizializzo un nodo di tipo generico con value di tipo generico, un successivo e un precedente 
//entrambi di tipo Nodo oppure undefined se non esistono
class Nodo<T> {
  value: T;
  next: Nodo<T> | undefined;
  prec: Nodo<T> | undefined;
  //nel costruttore inizializzo solamente il valore del nodo (unico parametro)
  constructor(value: T) {
    this.value = value;
    this.next = undefined;
    this.prec = undefined;
  }
}

//inizializzo la classe DrunkenList di tipo generico con una testa, una coda e una lunghezza totale. 
class DrunkenList<T> {
  head: Nodo<T> | undefined;
  tail: Nodo<T> | undefined;
  length: number;
  //nel costruttore inizializzo solo la lunghezza a 0, il resto rimane undefined
  //(verranno inizializzati tramite i metodi interni)
  constructor() {
    this.length = 0;
    this.head = undefined;
    this.tail = undefined;
  }
  //passo come parametro una value che sarà la nuova coda della lista
  insert_tail(value: T) {
    //se la coda è undefined (non esiste ne testa ne coda)
    if (this.tail == undefined) {
      //vado a creare un nuovo Nodo nella testa
      this.head = new Nodo(value);
      //la coda diventa la testa (abbiamo solo 1 nodo)
      this.tail = this.head;
    } else { //altrimenti
      //il nodo successivo alla coda diventa un nuovo nodo (prima undefined)
      this.tail.next = new Nodo(value);
      //il nodo precedente al nuovo nodo creato diventa la coda precedente
      this.tail.next.prec = this.tail;
      //la nuova coda diventa il nuovo nodo
      this.tail = this.tail.next;
    }
    //aumento di 1 la lunghezza della lista
    this.length += 1;
  }

  //passo come parametro una value che sarà la nuova testa della lista
  insert_head(value: T) {
    //se la testa è undefined (non esiste testa ne coda)
    if (this.head == undefined) {
      //la testa diventa il nuovo nodo creato
      this.head = new Nodo(value);
      //la testa diventerà anche la coda (abbiamo solo 1 nodo)
      this.tail = this.head;
    } else { //altrimenti
      //il nodo precedente alla testa diventa un nuovo nodo (prima undefined)
      this.head.prec = new Nodo(value);
      //sposto la testa dall'inizio alla seconda posizione
      this.head.prec.next = this.head;
      //faccio diventare il nuovo nodo la nuova testa
      this.head = this.head.prec;
    }
    //aumento la lunghezza della lista di 1
    this.length += 1;
  }
  //per far funzionare la funzione deve esserci almeno 1 elemento nella lista
  remove_tail(): T {
    //se non esiste una coda (non ci sono nodi)
    if (this.tail == undefined) {
      //lancio un nuovo errore ReferenceError()
      throw new ReferenceError();
    }
    //memorizzo il valore dell'ultimo nodo (la coda)
    let val = this.tail.value;
    //se la coda non ha nodi precedenti (unico elemento della lista)
    if (this.tail.prec == undefined) {
      //vado a mettere sia testa che coda ad undefined
      this.head = undefined;
      this.tail = undefined;
    } else {
      //vado a cancellare la coda dell'elemento (basandomi sul penultimo elemento)
      this.tail.prec.next = undefined;
      //sostituisco la coda con il penultimo elemento della lista
      this.tail = this.tail.prec;
    }

    //diminuisco la lunghezza 
    this.length -= 1;
    //ritorno il valore eliminato
    return val;
  }
  //per far funzionare la funzione deve esserci almeno 1 elemento nella lista
  remove_head(): T {
    //se non esiste una testa (non esistono nodi)
    if (this.head == undefined) {
      //lancio un nuovo errore ReferenceError()
      throw new ReferenceError();
    }

    //memorizzo il valore del nodo in testa
    let val = this.head.value;

    //se è l'unico nodo della lista
    if (this.head.next == undefined) {
      //imposto sia testa che coda ad undefined (non esiste più una lista)
      this.head = undefined;
      this.tail = undefined;
    } else { //altrimenti
      //cancello il nodo attuale in testa basandomi sul nodo successivo
      this.head.next.prec = undefined;
      //imposto il secondo nodo come nuova testa
      this.head = this.head.next;
    }

    //diminuisco la grandezza 
    this.length -= 1;
    //ritorno il valore dell'elemento eliminato
    return val;
  }

  //inserire in testa un nuovo valore
  push(value: T) {
    //vado ad inserire il nuovo valore in testa richiamando la funzione 
    this.insert_head(value);
    //se la lista ha un numero di elementi dispari, inserisce l'elemento anche in coda
    if ((this.length - 1) % 2 != 0) {
      this.insert_tail(value);
    }
  }

  pop(): T {
    //se la lunghezza della lista è pari
    if (this.length % 2 == 0) {
      //andiamo a rimuovere la coda
      return this.remove_tail();
    } else { //se è dispari
      //andiamo a rimuovere la testa
      return this.remove_head();
    }
  }
  //abbiamo bisogno di restituire il contenuto della lista in forma di array
  as_array(): T[] {
    //il primo elemento è la testa
    let ptr = this.head;
    //creo l'array
    let arr = [];
    //fino a che ptr non è undefined
    while (ptr != undefined) {
      //inserisco nell'array il valore di ptr
      arr.push(ptr.value);
      //e faccio diventare ptr il nodo successivo
      ptr = ptr.next;
    }
    //restituisco l'array
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

//definisco un tipo point (array di 2 numeri)
type Point = [number, number];
//creo un oggetto ListaPunti con attributi un valore Point e un nodo succesivo (oppure null)
interface ListaPunti {
  val: Point;
  next: Node | null;
}
//passo alla funzioen come parametro una lista L e una funzione p (point) => bool
function filter(l: Node | null, p: (point: Point) => boolean): Point[] {
  //se non esiste una lista ritorno un array vuoto
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

//definisco il tipo CompareFunction come una funzione che dati 2 valori (a, b) => number restituisca un numero
type CompareFunction<T> = (a: T, b: T) => number;

//creo la classe OrdSet
class OrdSet<T> {
  //elementi del set (tipo array)
  private elements: T[];
  //funzione per comparare 2 elementi (tipo CompareFunction)
  private cmp: CompareFunction<T>;

  //al costruttore passo solo la funzione, non ho bisogno di sapere niente per l'array
  constructor(cmp: CompareFunction<T>) {
    this.elements = [];
    this.cmp = cmp;
  }

  //passo come parametro un elemento e
  add(e: T): void {
    //verifico che non esista già un el;emento nell'array che sia uguale ad e
    if (!this.elements.some((el) => this.cmp(el, e) === 0)) {
      //se non esiste, aggiungo l'elemento all'array 
      this.elements.push(e);
      //ordino l'array usando come parametro la funzione cmp
      this.elements.sort(this.cmp);
    }
  }
  //rimuovere e
  remove(e: T): void {
    //rimuove tutti gli elementi che non vanno a valere 0 dopo il controllo con la funzione cmp
    this.elements = this.elements.filter((el) => this.cmp(el, e) !== 0);
  }
  //vado a restituire un array di elementi concatenando gli elementi del set ordinato
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

//definisco il tipo CompareFunction (2 elementi che restituiscono un bool)
type CompareFunction<T> = (a: T, b: T) => boolean;

//passo come parametro alla funzione un array T, una variabile K di un tipo e una funzione CompareFunction (f)
function moveToFront1<T>(a: T[], k: T, f: CompareFunction<T>): number {
  //cerco la prima occorrenza di k che soddisfa f e ne prendo l'indice
  const index = a.findIndex((item) => f(item, k));
  //se l'indice è !== da -1 (esistono elementi)
  if (index !== -1) {
    //memorizzo l'elemento in una variabile
    const foundItem = a[index];
    //vado a cancellare l'elemento dall'array
    a.splice(index, 1);
    //vado a inserire l'elemento in cima alla lista
    a.unshift(foundItem);
    //resituisco il vecchio indice dell'elemento
    return index;
  }
  //ritorno -1 nel caso non ci siano elementi che soddisfino la funzione f
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

//creo la classe MoveToEndC con parametri un array e una funzione che dati 2 valori restituisce un bool
class MoveToEndC<T> {
  a: T[];
  f: (t: T, k: T) => boolean;

  //nel costruttore passo come parametro la funzione e l'array da controllare
  constructor(arr: T[], compareFn: (t: T, k: T) => boolean) {
    this.a = arr;
    this.f = compareFn;
  }

  //passo come parametro un valore dello stesso tipo di quelli di a
  move(k: T): number {
    //controllo il primo elemento k nella lista che soddisfa f
    const index = this.a.findIndex((item) => this.f(item, k));
    //se l'elemento si trova nella lista
    if (index !== -1) {
      //vado ad eliminare la posizione dell'elemento e memorizzarmelo
      const movedElement = this.a.splice(index, 1)[0];
      //vado a mettere l'elemento in fondo all'array
      this.a.push(movedElement);
      //restituisco l'indice precedente del valore
      return index;
    }
    //ritorno -1 nel caso non ci siano elementi che soddisfino la funzione f
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

//creo la classe MoveToFrontC con valori un array a e una funzione f che da 2 elementi restituisce bool
class MoveToFrontC<T> {
  a: T[];
  f: (t: T, k: T) => boolean;

  //costruttore passando un array e una funzione
  constructor(arr: T[], compareFn: (t: T, k: T) => boolean) {
    this.a = arr;
    this.f = compareFn;
  }

  //prendo un valore k in ingresso
  move(k: T): number {
    //trovo l'indice della prima ricorrenza di k che soddisfa f
    const index = this.a.findIndex((item) => this.f(item, k));
    //se esiste un elemento che sodddisfa f
    if (index !== -1) {
      //mi salvo l'elemento e lo elimino dalla lista
      const movedElement = this.a.splice(index, 1)[0];
      //aggiungo l'elemento alla lista in cima
      this.a.unshift(movedElement);
      //ritorno il vecchio indice dell'elemento cancellato
      return index;
    }
    //se non esistono elementi che soddisfano f ritorno -1
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

//definisco il tipo point (array di 2 numeri)
type Point = [number, number];
//definisco il tipo predicato (da un punto ritorno un bool)
type Predicate = (x: Point) => boolean;
//creo oggetto List con valori un val (Point) e un next ch può essere un List o un null
interface List {
  val: Point;
  next: List | null;
}
//prendo come argomenti una lista (o null) e un predicato, restituisco un array di punti
//nota: l'array deve essere calcolato ricorsivamente per poterlo dare per giusto
function filter(list: List | null, p: Predicate): Point[] {
  //definisco un array vuoto
  let res: Point[] = [];
  //se la lista esiste
  if (list) {
    //se il valore corrente della lista soddisfa p, metto il valore dentro l'array
    if (p(list.val)) res.push(list.val);
    //concateno a res il risultato ricorsivo della funzione con il prossimo elemento
    res = res.concat(filter(list.next, p));
  }
  //restituisco il risultato finito
  return res;
}
//prendo come parametri una lista (o null) e un predicato
function sortedFilter(list: List | null, p: Predicate): Point[] {
  //definisco res come la lista list filtrata tramite p
  let res = filter(list, p);
  //viene inizializzata una funzione sort sull'array con parametri una x e una y (entrambe Point)
  res.sort((x: Point, y: Point) => {
    //se le coordinate di x e y sono uguali
    if (x[0] == y[0]) return x[1] - y[1]; //confronto le coordinate di y 
    else return x[0] - y[0]; //se sono diverse, confronto le x
  });
  //restituisco il risultto
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

//nota: questa versione accetta stringhe e controlla la validità a runtime
//una versione che dichiarasse un tipo ValidTypeNames="string"|"number" ecc.
//sarebbe ragionevole, ma non consentirebbe di lanciare l'eccezione come richiesto dal testo.

//definisco un errore WrongTypeError che estende errore
class WrongTypeError extends Error {}

//definisco la classe Discarica
class Discarica {
  //cestini è una mappa fra nomi di tipo (string, number, ecc..) e un'array di valori di quel tipo
  private cestini: { [tipo: string]: any[] } = {};
  //contatori è una mappa tra un tipo e il numero di elementi di quel tipo 
  private contatori: { [tipo: string]: number } = {};

  //controllo per i tipo di dato ammessi
  private valid(t: string): boolean {
    return /string|number|boolean|undefined|object|function/.test(t);
  }

  //prendo un valore di qualsiasi tipo
  public butta(v: any): void {
    //se non esiste un cestino del tipo di v, allora lo creo e aggiorno la quantità
    if (!(typeof v in this.cestini)) {
      this.cestini[typeof v] = [];
      this.contatori[typeof v] = 0;
    }
    //se esiste un cestino del tipo di v, allora aggiungo in coda v e aumento il suo contatore
    this.cestini[typeof v].push(v);
    this.contatori[typeof v]++;
  }

  //prendo come paramentro una stringa (tipo di dato)
  public svuota(t: string): any[] {
    //se il tipo passato non è corretto, mando un errore WrongTypeError
    if (!this.valid(t)) throw new WrongTypeError(`Invalid type name ${t}`);
    //se t è nei cestini
    if (t in this.cestini) {
      //mi salvo tutti gli elementi nel cestino
      let r = this.cestini[t];
      //svuoto il cestino di quel tipo
      this.cestini[t] = [];
      //restituisco gli elementi che erano nel cestino
      return r;
    } else {
      //ritorno un array vuoto
      return [];
    }
  }

  //prendo un tipo come parametro
  public quanti(t: string): number {
    //controllo se il tipo è valido, altrimenti lancio un errore
    if (!this.valid(t)) throw new WrongTypeError(`Invalid type name ${t}`);
    //se t è nei contatori, ritorno il suo contatore corrispondente
    if (t in this.contatori) return this.contatori[t];
    //altrimenti restituisco 0
    else return 0;
  }

  //
  public classi(): Set<Function> {
    // imposto ad s un nuovo set, 
    let s = new Set<Function>();
    let o = this.cestini["object"] || []; //imposto ad o o un cestino di un oggetto, oppure un array vuoto
    //per ogni elemento di o, aggiungici il costruttore. 
    o.forEach((e) => s.add(e.constructor));
    //restituisco il set
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

//imposto il tipo cbool con valori true, false, 1, 0. Ogni altro valore non può essere accettato
type cbool = true | 1 | false | 0;

//passo come parametro un array omogeneo e un preficato f
//la funzione restituirà 2 array
function setaccio<T>(a: T[], f: (val: T) => cbool): { yes: T[]; no: T[] } {
  //array per elementi che passano il check
  const yes: T[] = [];
  //array per elementi che non passano il check
  const no: T[] = [];

  //per ogni elemento dell'array, se passa va in yes, altrimenti va in no
  for (const val of a) {
    if (f(val)) {
      yes.push(val);
    } else {
      no.push(val);
    }
  }
  //return degli array
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

//definisco l'oggetto nodo con dentro un valore e un figlio Nodo
interface Nodo<T> {
  val: T;
  children: Nodo<T>[];
}

//passo come parametro alla funzione una root, una funzione controlla e confronta. 
function trova<T>(
  root: Nodo<T>,
  controlla: (val: T) => boolean,
  confronta: (val1: T, val2: T) => number
): T[] {
  //definisco l'array risultato
  const risultato: T[] = [];

  //sottofunzione ricorsiva per la visita dell'albero k-ario
  function visita(nodo: Nodo<T>) {
    //se il valore del nodo passa il controllo, lo aggiungo all'array
    if (controlla(nodo.val)) {
      risultato.push(nodo.val);
    }
    //faccio il sort dell'array tramite il criterio di confronta
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

//oggetto nodo con valori un val e dei figli (opzionali)
interface Nodo<T> {
  val: T;
  figli?: Nodo<T>[];
}

//prendo come parametro una root di tipo Nodo e una funzione s da T a bool
function sbarba<T>(root: Nodo<T>, s: (x: T) => boolean): void {
  //spero non serva spiegare 
  let i: number = 0;
  //faccio la visita dell'albero tramite un ciclo while
  while (root.figli && i < root.figli.length) {
    //se il valore dei figli soddisfa s
    if (s(root.figli[i].val)) {
      //elimino i figli
      root.figli.splice(i, 1);
    } else {
      //altrimenti passo la funzione ricorsivamente ai figli e aumento il contatore
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


//specifico il tipo Point (array di 2 numeri) e il tipo Predicate (funzione da un Point a un bool)
type Point = [number, number];
type Predicate = (x: Point) => boolean;

//creo l'oggetto List con un Point e un List successivo o null
interface List {
  val: Point;
  next: List | null;
}

//prendo come parametro un list o un null, e un predicato.
function filter(list: List | null, p: Predicate): Point[] {
  //inizializzo l'array di punti risultato
  let res: Point[] = [];
  //se list esiste
  if (list) {
    if (p(list.val)) res.push(list.val); //se il valore del nodo rispetta p, lo metto nel risultato
    res = res.concat(filter(list.next, p)); //ordino l'array in base alla posizione dei nodi nella Lista
  }
  //return del risultato
  return res;
}

//prendo sempre come parametro List o null e un predicato
function sortedFilter(list: List | null, p: Predicate): Point[] {
  //inizializzo il risultato con una lista basata su list ma filtrata in base a p
  let res = filter(list, p);
  //ordino il res basandomi su x e y, se x[0] == y[0]
  res.sort((x: Point, y: Point) => {
    if (x[0] == y[0]) return x[1] - y[1]; //return del confronto in base ai punti successivi
    else return x[0] - y[0]; //return del confronto in base ai punti attuali
  });
  return res;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Conta Max (testo dell'esercizio perso)
*/

//definisco l'oggetto Nodo con sx e dx opzionali (Nodo), un val e un grande. 
interface Nodo {
  sx?: Nodo;
  dx?: Nodo;
  val: number;
  grande: number;
}

//prendo come parametro un nodo T
function contaMax(T: Nodo): number {
  //funzione ricorsiva per calcolare il massimo dei valori nei sottoalberi di un nodo
  function calcolaMassimo(nodo: Nodo | undefined): number {
    //se il nodo non esiste ritorno -infinito (da traccia dell'esercizio)
    if (!nodo) return Number.NEGATIVE_INFINITY;

    //calcolo del massimo della parte destra e sinistra dell'albero
    const maxSx = calcolaMassimo(nodo.sx);
    const maxDx = calcolaMassimo(nodo.dx);
    //faccio il massimo tra il valore corrente, il valore massimo di sinistra e destra
    const maxCorrente = Math.max(nodo.val, maxSx, maxDx);

    nodo.grande = maxCorrente; // Imposta il massimo nel nodo corrente
    //return del maxCorrente
    return maxCorrente;
  }

  // Calcola il massimo di tutto l'albero in modo ricorsivo
  calcolaMassimo(T);

  return T.grande; // Restituisce il massimo della radice
}

//Per il MIN: Stessi commenti del Max ma logicamente al contrario

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

//inizializzo un errore LavaggioError (customError)
class LavaggioError extends Error {}

//vado a inizializzare delle costanti per ogni tipo di tessuto
enum TipoTessuto {
  Cotone = 1.1,
  Seta = 2.0,
  Sintetico = 0.9,
  Lana = 1.75,
}

//vado a inizializzare dlele costanti per ogni tipo di Lavaggio
enum TipoLavaggio {
  Intensivo = 90,
  Secco = 60,
  Delicati = 30,
}

//tipo di variabile Lavaggio, array di 2 variabili precedentemente inizializzate (costanti)
type Lavaggio = [TipoTessuto, TipoLavaggio];

//funzione che prende un Lavaggio e va a prendere i 2 dati dentro la variabile e calcola quando durerà
function durata_lavaggio(lavaggio: Lavaggio): number {
  return lavaggio[0] * lavaggio[1];
}

//prendo un array di Lavaggio
function processa(lavaggi: Lavaggio[]): void {
  //per ogni lavaggio, faccio il controllo che siano compatibili. Se non lo sono lancio un errore
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
  //Sorting del lavaggio in base a quanto impiega
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

//definisco il tipo MulFun<T> che da 2 elementi T porta ad un T
type MulFun<T> = (e1: T, e2: T) => T;
//definisco un errore custom per gestire le eccezioni
class SizeError extends Error {}

//creo la classe matrix con il numero di righe, colonne, M (array doppio) e MulFun
class Matrix<T> {
  row: number;
  col: number;
  private M: T[][];
  private mul: MulFun<T>;
  //nel costruttore chiedo righe e colonne + la funzione f
  constructor(r: number, c: number, f: MulFun<T>) {
    this.M = [];
    this.row = r;
    this.col = c;
    this.mul = f;
  }

  //scorro tutti gli elementi della matrice e per ogni ciclo inserisco n
  init(n: T) {
    for (let i = 0; i < this.row; i++) {
      this.M.push([]);
      for (let j = 0; j < this.col; j++) {
        this.M[i].push(n);
      }
    }
  }
  //tramite le coordinate restituisco l'elemento corrispondente
  get_el(i: number, j: number): T {
    return this.M[i][j];
  }

  //tramite le coordinate inserisco l'elemento corrispondente
  set_el(i: number, j: number, el: T) {
    this.M[i][j] = el;
  }
  
  //faccio il prodotto di hadam
  hadam_product(B: Matrix<T>): Matrix<T> {
    if (this.row != B.row || this.col != B.col) throw new SizeError(); //se le 2 matrici non hanno la stessa dimensione lancio un errore
    let C: Matrix<T> = new Matrix(this.row, this.col, this.mul); //creo una nuova matrice dove inserire i risultati
    if (this.row > 0) {
      C.init(this.M[0][0]); //inizializzo la matrice nella casella [0][0]
      for (let i = 0; i < this.row; i++) //Per ogni elemento delle 2 matrici
        for (let j = 0; j < this.col; j++)
          //metto che il valore di C[i][j] sia la moltiplicazione dei valori corrispondenti delle 2 matrici 
          C.set_el(i, j, this.mul(this.M[i][j], B.get_el(i, j)));
    }
    //restituisco la matrice C
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

//creo un errore Custom
class AlberoInvalido extends Error {}

//creo la classe NodoBin con dentro un valore, una label e un array di figli
class NodoBinT<T> {
  val: T;
  label: string;
  children: NodoBinT<T>[];
  //uso il costruttore per inizializzare il Nodo passanto un valore e una stringa da Label
  constructor(val: T, label: string = "") {
    this.val = val;
    this.label = label;
    this.children = [];
  }
  //metodo per aggiungere un figli
  add(...children: NodoBinT<T>[]): void {
    //se ci sono già 2 o più figli allora lancio un errore
    if (this.children.length + children.length > 2)
      throw new AlberoInvalido("Not binary");
    //altrimenti inserisco l'elemento
    else this.children.push(...children);
  }

  //generatore per IterableIterator
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

//creo il tipo CmpFun, da 2 tipi uguali restituisce un number
type CmpFun<T> = (a: T, b: T) => number;

//classe OrdSet con dentro un cmp (funzione) e un set di elemento
class OrdSet<T> {
  cmp: CmpFun<T>;
  elements: T[];

  //creo l'array e setto la funzione di controllo
  constructor(cmp: CmpFun<T>) {
    this.cmp = cmp;
    this.elements = [];
  }
  //metodo per aggiungere un elemento e
  add(e: T): void {
    //se l'elemento non è già presente dentro il set, lo inserisco
    if (this.elements.findIndex((f: T) => this.cmp(e, f) == 0) == -1)
      this.elements.push(e);
  }
  //metodo per la rimozione di un elemento e
  remove(e: T): void {
    var i: number;
    //se l'elemento e è presente nel set, lo rimuovo
    if ((i = this.elements.findIndex((f: T) => this.cmp(e, f) == 0)) >= 0)
      this.elements.splice(i, 1);
  }


  list(): T[] {
    //faccio il sort degli elementi in base a cmp
    this.elements.sort(this.cmp);
    //restituisco il risultato
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

//creo l'oggetto TNode con dentro val e children
interface TNode<T> {
  val: T;
  children: TNode<T>[];
}

//funzione biggest
function biggest<T>(
  root: TNode<T> | undefined, //prendo come parametro root, TNode o undefined
  bigger: (x: T, y: T) => boolean //prendo come parametro la funzione bigger (da 2 tipi a un bool)
): T | undefined {
  if (!root) return undefined; //se non esiste root, ritorno undefined
  else return _biggest(root, bigger);//altrimenti ritorno il maggiore (chiamo la funzione _biggest)
}

//prendo root e bigger come parametri (come prima)
function _biggest<T>(root: TNode<T>, bigger: (x: T, y: T) => boolean): T {
  if (root.children.length == 0) return root.val; //se la lunghezza dei digli di root è 0, ritorno se stesso visto che è l'unico
  let m: T = root.val; //prendo il valore del nodo corrente (max temporaneo)
  for (let c of root.children) { //per ogni figlio della radice
    let b: T = _biggest(c, bigger); //prendo ricorsivamente il più grande
    if (bigger(b, m)) m = b; //se b > m allora m ne prende il valore
  }
  //restituisco m che conterrà il max
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

//inizializzo errore Custom
class GiornoPienoError extends Error {}

//definisco 2 tipo di dato, Data (2 numeri e una stringa (giorno mese anno)) e Evento (data e una stringa)
type Data = [number, string, number];
type Evento = [Data, string];


function compara_date(d1: Data, d2: Data) {
  return d1[0] == d2[0] && d1[1] == d2[1] && d1[2] == d2[2];
}

//creo la classe agenda con dentro eventi e massimo numero di eventi per giorno
class Agenda {
  eventi: Evento[];
  max_eventi: number;
  //inizializzo il massimo numero di eventi
  constructor(max_eventi: number) {
    this.eventi = [];
    this.max_eventi = max_eventi;
  }
  //questo metodo prende gli eventi totali e li filtra in base alla data
  lista_eventi(data: Data): Evento[] {
    return this.eventi.filter((e) => compara_date(e[0], data));
  }

  aggiungi(evento: Evento): void {
    //prendo la data dell'evento
    let data = evento[0];
    //conto quanti eventi sono in quella data
    let n_eventi = this.lista_eventi(data).length;
    //se rimangono posti disponibili, inserisco l'evento
    if (n_eventi < this.max_eventi) {
      this.eventi.push(evento);
    } else { //altrimenti lancio  un errore Giorno Pieno
      throw new GiornoPienoError();
    }
  }

  libera(data: Data): number {
    //prendo gli eventi di questa data
    let n_eventi = this.lista_eventi(data).length;
    //li cancello 
    this.eventi = this.eventi.filter((e) => !compara_date(e[0], data));
    //ritorno quanti eventi sono stati cancellati
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

//inizializzo l'oggetto Nodo con val obbligatorio e sx, dx opzionali
interface Nodo {
  val: string;
  sx?: Nodo;
  dx?: Nodo;
}

//prendo come parametro il nodo della funzione
function sxdx(T: Nodo): [string, string] {
  let l = ""; //stringa con valore di tutti i nodi sinistri
  let r = ""; //stringa con valore di tutti i nodi destri

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
  //ritorno le 2 stringhe
  return [l, r];
}
