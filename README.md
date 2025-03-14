# GYK Angular #2

## Task #1:
Užduotis #1 - Perkelti užduotis į service.
Pridėti tasks parametrą, kuris būtų prieinamas iš išorės (eksponuotų užduočių sąrašą).
Sukurti addTask metodą, kuris leistų pridėti naują užduotį.
Užduotys turėtų automatiškai gauti unikalų identifikatorių (id) jas pridedant.
Sukurti getTaskById metodą, kuris pagal pateiktą id grąžintų konkrečią užduotį.

## Task #2:
Užduotis #2 – Sukurti šias puslapių struktūras:
- Pradinis puslapis („“ maršrutas)
    Sukurkite pagrindinį puslapį, kuriame bus pasveikinimas
    Šiame puslapyje gali būti pasveikinimo pranešimas, informacija apie užduočių valdymo sistemą arba nuoroda į užduočių sąrašą.
- Užduočių sąrašo puslapis („tasks“ maršrutas)
    Sukurkite puslapį, kuriame bus rodomas visų užduočių sąrašas.
    Kiekviena užduotis turi turėti nuorodą, vedančią į jos atskirą puslapį. Puslapyje gaukite info apie užduotį iš TasksService.
- Kiekvienos užduoties atskiras puslapis („tasks/:id“ maršrutas)
    Sukurkite dinaminį puslapį, kuris atvaizduos vienos konkrečios užduoties informaciją.
    Informacija gali apimti užduoties aprašymą, sukūrimo datą, būseną, galutinį terminą ir galimybę ją redaguoti ar ištrinti.
- Navigacijos juosta
    Pridėkite viršuje esantį navigacijos meniu, kuris leis vartotojui lengvai pereiti tarp skirtingų puslapių.

### Navigacijoje turėtų būti bent šios nuorodos:
1. Pradžia („Pagrindinis“)
2. Užduočių sąrašas („Užduotys“)
