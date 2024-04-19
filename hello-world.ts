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
definendo opportunamente i tipi, e non usando any o unknown.*/

interface TreeNode {
    sx?: TreeNode;
    dx?: TreeNode;
    val: number;
}

function PotaAlberi(T: TreeNode): void {
    if(!T) { return }

    if(T.val < 0) {
        T = undefined;
        return;
    }

    if(T.sx) {
        if(T.sx.val < 0)
            T.sx = undefined;
        else 
            PotaAlberi(T.sx);
    }

    if(T.dx) {
        if(T.dx.val < 0)
            T.dx = undefined;
        else 
            PotaAlberi(T.dx);
    }
}