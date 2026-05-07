Catalog Produse

Tehnologii folosite:
- backend: node.js (v18+) cu express
- baza de date: mysql (v8+)
- frontend: react 18 cu vite, css (fara bootstrap sau tailwind)

Cum se instaleaza dependentele:
1. Deschideti un terminal in folderul backend si executati comanda: npm install
2. Navigati in folderul frontend si executati aceeasi comanda: npm install

Cum se configureaza baza de date:
1. Pentru a crea baza de date, executati in terminal comanda:
mysql -u root -p -e "CREATE DATABASE softprim_test CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
2. Pentru a importa structura si datele initiale, executati comanda:
mysql -u root -p softprim_test < setup.sql
3. In folderul backend, creati o copie a fisierului .env.example si redenumiti-o in .env. Deschideti acest fisier si completati cu parola pentru serverul MySQL.
4. Pentru frontend, URL-ul catre API nu necesita configurare suplimentara, este deja setat intern in fisierul api.js sa pointeze catre localhost:3000.

Cum se porneste aplicatia:
Este necesar sa aveti doua terminale deschise simultan.
1. In primul terminal, navigati in folderul backend si executati: npm run dev (API-ul va porni pe localhost:3000)
2. In al doilea terminal, navigati in folderul frontend si executati: npm run dev (interfata va porni pe localhost:5173)

Exemple de apeluri de test pentru API:
- pentru a lua categoriile: curl http://localhost:3000/api/categories
- pentru a lua produsele dintr-o categorie (ex: id 1): curl "http://localhost:3000/api/products?category_id=1"

Pe langa ce se cerea in cerinta, am mai adaugat un search bar ca sa poti cauta produsele dupa nume si un filtru de sortare dupa pret. Am pus si o mica animatie de fade-in la cardurile produselor. Layout-ul este complet responsive folosind css grid.

Pozele din aplicatie (desktop si mobil) sunt incluse in directorul principal.