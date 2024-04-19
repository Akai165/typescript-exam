/* Scrivere una funzione TypeScript moveToEnd1(a, k, f), 
dove a è un array che rappresenta una lista di valori di un dato tipo, 
k è un valore di quel tipo, e f è una funzione che confronta due valori 
di quel tipo e restituisce un valore booleano.
moveToEnd1 cerca la prima occorrenza di k nella lista che soddisfa f.
Se k si trova nella lista, restituisce la sua posizione nella lista (contando da 0)
e porta l’elemento di a che contiene k in fondo alla lista, altrimenti restituisce -1.
*/
function moveToEnd1<T>(a: T[], k: T, f:(a: T, b: T) => boolean): number {
    //find index trova il valore del primo elemento che rispetta la condizione dopo =>
    const index = a.findIndex((item) => f(item, k));

    if(index != -1) {
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
    if(!T) {
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
    if(!T) {
        return 0;
    }

    //Inizializzo il valore di conta a -Infinito
    if(T.conta === undefined) {
        T.conta = Number.NEGATIVE_INFINITY;
    }

    let contaDx = contaAlbero(T.dx);

    T.conta = contaDx;

    if(T.sx) {
        contaAlbero(T.sx);
    }
    //Se T.sx esiste => contaAlbero(T.sx) altrimenti => return 0
    return contaDx + (T.sx ? contaAlbero(T.sx) : 0) + 1;
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
    if(!T) { return }

    if(T.val < 0) {
        if (T.val! < 0) {
            delete T.val;
            delete T.sx;
            delete T.dx;
            return;
        }
    }

    if(T.sx) {
        if(T.sx.val < 0)
            delete T.sx
        else 
            PotaAlberi(T.sx);
    }

    if(T.dx) {
        if(T.dx.val < 0)
            delete T.dx
        else 
            PotaAlberi(T.dx);
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

    constructor(value: T){
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
        if(this.tail == undefined) {
            this.head= new Nodo(value);
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
        if(this.tail === undefined) {
            throw new ReferenceError();
        }

        let val = this.tail.value;

        if(this.tail.prec === undefined) {
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
        if(this.head === undefined) {
            throw new ReferenceError();
        }

        let val = this.head.value;

        if(this.head.next === undefined) {
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

        if((this.lenght-1) % 2 == 0) {
            return this.remove_tail();
        } else {
            return this.remove_head()
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
