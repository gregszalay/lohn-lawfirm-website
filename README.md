# Szükséges szerverbeállítások

Mivel egyetlen, dinamikusan feltöltött html fájlból áll a weboldal, ezért minden, a domainnév kezdetű, beérkező http kérést át kell írányítáni az index.html fájlra.

Például nginx esetén a config fájlban alábbi sornak kell szerepelnie <br>

> location / { <br>
>		<strong>try_files $uri $uri/ /index.html =404;</strong> <br>
>	} <br>
  
# Tartalom feltöltése/módosítása/törlése

## Szakterületek feltöltése/módosítása/törlése

### I. Új szakterület feltöltése:

(1) Az expertiseDataHU.json fileban található tömb kiegészítése egy új elemmel, például így:

>(...) },<br>
>    {<br>
>        "id": "ujszakterulet",<br>
>        "name": "Új Szakterület Neve",<br>
>        "descriptionP1": "első paragrafus szövege",<br>
>        "descriptionP2": "második paragrafus szövege",<br>
>        "descriptionP3": "harmadik paragrafus szövege",<br>
>        "descriptionP4": "negyedik paragrafus szövege",<br>
>        "expertId1": "keresztnev-vezeteknev",<br>
>        "expertId2": "keresztnev-vezeteknev"<br>
>    }<br>
>]<br>

(Az expertId mezőkben a teamData kezdetű json fileokban szereplő egyes munkatársak id azonosítója kell, hogy szerepeljen. Munkatársak feltöltését/módosítását/törlését lásd lent.)

(2) A fenti megismétlése a expertiseDataEN.json, a expertiseDataDE.json és a expertiseDataRU.json fileokban, a megfelelő nyelveken.

(3) Az új szakterületnek megfelelő jpg fájl feltöltése az expertise-photos/ mappába a json fájlban megadott id azonosító után elnevezve, és egy további fekete-fehét verziót -bw végződéssel, például így:

>expertise-photos/ujszakterulet.jpg<br>
>expertise-photos/ujszakterulet-bw.jpg 

### II. Meglévő szakterület módosítása és törlése 

Az I. pontban leírt módon az ott írt fájlok és képek módosításával/törléséve.


## Munkatársak feltöltése/módosítása/törlése

### xI. Új munkatárs feltöltése:

(1) Az teamDataHU.json fileban található tömb kiegészítése egy új elemmel, például így:

>(...) },<br>
>    {<br>
>        "id": "keresztnev-vezeteknev",<br>
>        "name": "Vezetéknév Keresztnév",<br>
>        "title": "",<br>
>        "email": "email@domain.hu",<br>
>        "mobile": "+36 1 999 1233",<br>
>        "languages": "Magyar - English",<br>
>        "introduction": "",<br>
>        "profileButtonText": "Bemutatkozás"<br>
>    }<br>
>]<br>

(2) A fenti megismétlése a teamDataEN.json, a teamDataDE.json és a teamDataRU.json fileokban, a megfelelő nyelveken.

(3) Az új munkavállaló profilképének feltöltése jpg fájlként a profile-photos/ mappába a json fájlban megadott id azonosító után elnevezve, például így:

>profile-photos/keresztnev-vezeteknev.jpg

### II. Meglévő munkatárs módosítása és törlése 

Az I. pontban leírt módon az ott írt fájlok és képek módosításával/törlésével.


## Általános adatok, főoldal szövegeinek feltöltése/módosítása

(1) A generalDataHU.json, a generalDataEN.json, a generalDataDE.json és a generalDataRU.jsonfileban található kulcsokhoz párosított értékek feltöltése/módosítása.







