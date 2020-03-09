# Tehnici de Simluare - Tema 1

## Estimarea ariei unei forme geometrice neregulate (Monte Carlo)

### Pasi

- Se alege o forma geometrice a carei arie este usor de calculat (ex: un patrat, un dreptunghi etc).
- Se calculeaza aria formei alese.
- In interiorul formei alese se desenaza forma geometrice neregulata (ex: o floare, un copac etc).
- Se genereaza puncte la intamplare.
- Se numara cate puncte sunt in interiorul formei geometrice neregulate.
- Se estimeaza aria formei neregulate ca fiind **numarul de puncte din interior** / **numarul de puncte generate la intamplare** \* **aria figurii geometrice usor de calculat**.

### Detalii Implementare

- Pentru aceasta tema am folosit JavaScript Html si Css.
- Partea de desenare este realizata cu ajutorul elementului `<canvas></canvas>`.
- In momentul in care utilizatorul incepe sa deseneze, se genereaza puncte aleator intr-un Web Worker.
- Dupa ce a terminat desenul:
  - Intr-un Web Worker calculez aria propriu-zisa a desenului ca fiind numarul de pixeli al caror valoare alpha este mai strict mare ca 0.
  - In alt Web Worker estimez aria dupa metoda Monte Carlo. Un punct este in interirorul formei geometrice daca valoarea alpha a pixelului de la coordonata respectiva este mai mare strict ca 0. In acelasi Web Worker desenez punctele din interior cu verde si cele din exteriror cu rosu.
  - Dupa ce ambii Web Workeri au emis un mesaj afisez cele doua arii.

**NB:** Prin valoare alpha inteleg nivelul de transparenta al unui pixel (0 = transparent, 255 = opac).
