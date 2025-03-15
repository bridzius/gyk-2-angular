# GYK #4 - Angular #2

Dependency Injection, Routing, HTTP

## 1. Dependency Injection

- **Dependency Injection** - tai projektavimo šablonas, kuris leidžia klasėms gauti jų priklausomybes iš išorinio šaltinio, o ne jas kurti pačioms.
- **Kodėl naudoti DI?** - Tai padeda sukurti lengviau testuojamą ir prižiūrimą kodą, sumažina klasių tarpusavio priklausomybę ir pagerina kodo pakartotinį panaudojimą.
- **Kaip DI veikia Angular?** - Angular naudoja du būdus įterpti priklausomybes: per `constructor` arba naudojant `inject()` funkciją. Abu metodai leidžia gauti serviso instanciją.

**Per `constructor`:**

```typescript
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class DataService {
  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get("https://api.example.com/data");
  }
}
```

**Su `inject()` (rekomenduojamas):**

```typescript
import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class DataService {
  private http = inject(HttpClient);

  getData() {
    return this.http.get("https://api.example.com/data");
  }
}
```

- **Dependency Trees**: Priklausomybių medžiai (Dependency Trees) nurodo, kaip priklausomybės yra susijusios tarpusavyje. Kiekvienas dependency'is gali turėti savo dependency, taip sudarant medžio struktūrą. Angular naudoja šią struktūrą, kad efektyviai valdyti dependency kūrimą ir dalijimąsi jomis.
- **Providers**: nurodo Angular, kaip sukurti arba gauti dependency. Jie gali būti apibrėžti aplikacijos lygmeniu, komponentuose ar servisuose. Providers gali būti naudojami norint sukurti singletonus arba naujas instancijas kiekvienam komponentui.
- **`ng generate service <name>`** - Angular CLI komanda, kuri sukuria naują servisą su baziniu kodu.

### Užduotis #1 - Perkelti užduotis į service.

1. **Pridėti `tasks` parametrą**, kuris būtų prieinamas iš išorės (eksponuotų užduočių sąrašą).
2. **Sukurti `addTask` metodą**, kuris leistų pridėti naują užduotį. Užduotys turėtų automatiškai gauti unikalų identifikatorių (`id`) jas pridedant.
3. **Sukurti `getTaskById` metodą**, kuris pagal pateiktą `id` grąžintų konkrečią užduotį.

## 2. Routing

### Routing konfigūracijos pavyzdys

```typescript
//app.routes.ts
import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { TaskListComponent } from "./task-list/task-list.component";
import { TaskDetailComponent } from "./task-detail/task-detail.component";
import { AuthGuard } from "./auth.guard";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "tasks", component: TaskListComponent, canActivate: [AuthGuard] },
  {
    path: "tasks/:id",
    component: TaskDetailComponent,
    canActivate: [AuthGuard],
  },
];

//app.config.ts
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};
```

- **Lazy Loading**: Tai strategija, kuri leidžia įkelti modulius tik tada, kai jie yra reikalingi. Tai sumažina pradinį įkrovimo laiką ir pagerina aplikacijos našumą, nes mažiau resursų įkeliama iš karto.
- **Parametrizuoti maršrutai**: Maršrutai, tokie kaip `route/:id`, leidžia perduoti parametrus URL. Komponentai gali naudoti `ActivatedRoute` servisą, kad gautų šiuos parametrus ir atitinkamai atnaujintų savo būseną ar duomenis.

### ActivatedRoute pavyzdys

```typescript
import { Component, OnInit, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-task-detail",
  template: "<p>Task ID: {{ taskId }}</p>",
  standalone: true,
  imports: [ActivatedRoute],
})
export class TaskDetailComponent implements OnInit {
  taskId: string;
  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.taskId = this.route.snapshot.params["id"];
  }
}
```

- **Guards**:
  - **Kas yra guard?** - Tai mechanizmas, kuris leidžia kontroliuoti prieigą prie maršrutų.
  - **`ng generate guard <name>`** - komanda naujo sargo sukūrimui.
  - **Sargo metodai** - `canActivate` (ar galima aktyvuoti maršrutą), `canActivateChild` (ar galima aktyvuoti vaiko maršrutus), `canMatch` (ar maršrutas atitinka).
  - **Guard API**: turi grąžinti `boolean` arba `UrlTree`. `UrlTree` yra struktūra, kuri apibrėžia URL kelią ir parametrus. Jei guard grąžina `UrlTree`, naršyklė bus nukreipta į tą URL.

### Guard pavyzdys

```typescript
import { Injectable, inject } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  private router = inject(Router);

  canActivate(): boolean {
    const isAuthenticated = true; // logic to check if user is authenticated
    if (!isAuthenticated) {
      this.router.navigate(["/login"]);
      return false;
    }
    return true;
  }
}
```

### Užduotis #2 – Sukurti šias puslapių struktūras:

1. **Pradinis puslapis („“ maršrutas)** - Sukurkite pagrindinį puslapį, kuriame bus pasveikinimas. Šiame puslapyje gali būti pasveikinimo pranešimas, informacija apie užduočių valdymo sistemą arba nuoroda į užduočių sąrašą.
2. **Užduočių sąrašo puslapis („tasks“ maršrutas)** - Sukurkite puslapį, kuriame bus rodomas visų užduočių sąrašas. Kiekviena užduotis turi turėti nuorodą, vedančią į jos atskirą puslapį. Puslapyje gaukite info apie užduotį iš `TasksService`.
3. **Kiekvienos užduoties atskiras puslapis („tasks/:id“ maršrutas)** - Sukurkite dinaminį puslapį, kuris atvaizduos vienos konkrečios užduoties informaciją. Naudokite `ActivatedRoute` Injectable. Gaukite task `id` per `activatedRoute.snapshot.params['id']`.
4. **Navigacijos juosta** - Pridėkite viršuje esantį navigacijos meniu, kuris leis vartotojui lengvai pereiti tarp skirtingų puslapių. Navigacijoje turėtų būti bent šios nuorodos:
   - Pradžia („Pagrindinis“)
   - Užduočių sąrašas („Užduotys“)

## 3. HTTP

- **HTTP pagrindai**: HTTP (Hypertext Transfer Protocol) yra protokolas, naudojamas duomenims perduoti internete. Pagrindiniai HTTP veiksmažodžiai (verbs) yra `GET`, `POST`, `PUT`, `DELETE`, kurie nurodo, kokį veiksmą atlikti su resursu. Šiais laikais HTTP dažniausiai naudoja JSON formatą duomenims perduoti, nes jis yra lengvas ir lengvai skaitomas.
- **HTTP klientas Angular'e** - `provideHttpClient` konfigūracija.

### HttpClient Providers

**Providing HttpClient:**

```typescript
//app.config.ts
import { provideHttpClient } from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
  ]
};
```

**HttpClient Naudojimas:**

```typescript
import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
  standalone: true,
})
export class ApiService {
  private http = inject(HttpClient);

  fetchData(): Observable<any> {
    return this.http.get("https://api.example.com/data");
  }
}
```

- **`HttpClient` naudojamas** kaip įrankis HTTP request'am siųsti.
- **`HttpClient`** paprastai grąžina **`Observable`**. Jį galima paversti paprasta reikšme, naudojant `lastValueFrom` arba `AsyncPipe`.

### Užduotis #3 – Naudokite `json-server` užduočių laikymui faile.

1. **`npm install json-server`** - įsirašykite `json-server` paketą.
2. Sukurkite `db.json` failą, kurio turinys:

```json
{
  "tasks": []
}
```

3. Paleidus `npx json-server` ir pakvietus `http://localhost:3000/tasks` dabar turėtumėte gauti užduotis iš serverio.
4. Naudokit `HttpClient` ir pakeiskite lokalų užduočių masyvą į HTTP užklausas.
5. Pakeiskite `TasksService` `tasks` parametrą į funkciją, kuri grąžina visas užduotis, kviečiant GET `http://localhost:3000/tasks`.
6. Pakeiskite `addTask`, taip, kad būtų kviečiamas POST `http://localhost:3000/tasks`.
7. Pakeiskite `getTaskById`, kad gautų užduotį iš GET `http://localhost:3000/tasks/{id}`.

