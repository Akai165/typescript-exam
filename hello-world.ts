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
interface TreeNode {
  sx?: TreeNode | undefined;
  dx?: TreeNode | undefined;
  val?: number;
}

function PotaAlberi(T: TreeNode | undefined): void {
  if (!T) {
    return;
  }

  if (T.val < 0) {
    if (T.val! < 0) {
      delete T.val;
      delete T.sx;
      delete T.dx;
      return;
    }
  }

  if (T.sx) {
    if (T.sx.val < 0) delete T.sx;
    else PotaAlberi(T.sx);
  }

  if (T.dx) {
    if (T.dx.val < 0) delete T.dx;
    else PotaAlberi(T.dx);
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
  lenght: number;

  constructor() {
    this.lenght = 0;
    this.head = undefined;
    this.tail = undefined;
  }

  insert_tail(value: T) {
    if (this.tail == undefined) {
      this.head = new Nodo(value);
      this.tail = this.head;
    } else {
      this.head.prec = new Nodo(value);
      this.head.prec.next = this.head;
      this.head = this.head.prec;
    }
    this.lenght += 1;
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
    if (this.tail === undefined) {
      throw new ReferenceError();
    }

    let val = this.tail.value;

    if (this.tail.prec === undefined) {
      this.head = undefined;
      this.tail = undefined;
    } else {
      this.tail.prec.next = undefined;
      this.tail = this.tail.prec;
    }

    this.lenght -= 1;
    return val;
  }

  remove_head() {
    if (this.head === undefined) {
      throw new ReferenceError();
    }

    let val = this.head.value;

    if (this.head.next === undefined) {
      this.head = undefined;
      this.tail = undefined;
    } else {
      this.head.next.prec = undefined;
      this.head = this.head.next;
    }

    this.lenght -= 1;
    return val;
  }

  push(value: T) {
    this.insert_head(value);

    if ((this.lenght - 1) % 2 == 0) {
      return this.remove_tail();
    } else {
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

    add(e: T):void {
        if(!this.elements.some(el => this.cmp(el, e) === 0)) {
            this.elements.push(e);
            this.elements.sort(this.cmp);
        }
    }

    remove(e: T): void {
        this.elements = this.elements.filter(el => this.cmp(el, e) !== 0);
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
  const index = a.findIndex(item => f(item, k));
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
        const index = this.a.findIndex(item => this.f(item, k));

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
        const index = this.a.findIndex(item => this.f(item, k));

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

type Point = [number,number]
type Predicate = (x:Point)=>boolean

interface List {
  val: Point
  next: List | null
}

function filter(list:List|null, p:Predicate): Point[] {
  let res: Point[] = []
  if (list) {
    if (p(list.val)) res.push(list.val)
    res = res.concat(filter(list.next,p))
  }
  return res
}

function sortedFilter(list: List | null, p: Predicate): Point[] {
  let res = filter(list,p)
  res.sort((x:Point,y:Point)=>{
    if(x[0]==y[0]) return x[1] - y[1]
    else return x[0] - y[0]
  })
  return res
}

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
    private cestini:{[tipo:string]:any[]}={}
    private contatori:{[tipo:string]:number}={}

    private valid(t:string):boolean {
        return /string|number|boolean|undefined|object|function/.test(t)
    }

    public butta(v:any):void {
        if (!(typeof v in this.cestini)) {
            this.cestini[typeof v]=[]
            this.contatori[typeof v]=0
        }
        this.cestini[typeof v].push(v)
        this.contatori[typeof v]++
    }

    public svuota(t:string): any[] {
        if (!this.valid(t))
            throw new WrongTypeError(`Invalid type name ${t}`)
        if (t in this.cestini) {
            let r=this.cestini[t]
            this.cestini[t]=[]
            return r
        } else {
            return []
        }
    }

    public quanti(t:string):number {
        if (!this.valid(t))
            throw new WrongTypeError(`Invalid type name ${t}`)
        if (t in this.contatori)
            return this.contatori[t]
        else
            return 0
    }

    public classi():Set<Function> {
        let s=new Set<Function>()
        let o=this.cestini["object"]||[]
        o.forEach(e=>s.add(e.constructor))
        return s
    }
}
