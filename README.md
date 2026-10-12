# WW Garden Service

Responsywna strona lokalnej firmy ogrodniczej. Polski język, głęboka zieleń i limonkowy akcent, pięć podstron usług, proces współpracy, obszar działania, portfolio i formularz kwalifikujący zapytanie.

## Uruchomienie

Wymagany Node.js 22 lub nowszy. Bez instalowania zależności.

```sh
npm run dev
# http://127.0.0.1:4173
npm test
npm run build
```

`dist/` zawiera 12 stron oraz stronę 404. Hostowanie wymaga obsługi katalogowych adresów URL (np. `/uslugi/systemy-nawadniania/`). Zasoby używają ścieżek od korzenia domeny; GitHub Pages pod prefiksem `/WWGarden/` wymaga konfiguracji domeny lub dostosowania ścieżek.

## Stan projektu

Domyślny build jest podglądem z `noindex` i blokadą robotów. Formularz waliduje dane oraz zdjęcia i pobiera opis do pliku tekstowego. **Nie wysyła danych.** Zdjęcia pozostają na urządzeniu. Brak fałszywych opinii, statystyk, cen i realizacji. Ilustracja jest autorskim schematem SVG, wyraźnie opisana jako poglądowa. Nazwa w nagłówku jest zapisem tekstowym, nie nowym logo.

Pełnego dokumentu źródłowego nie umieszczono w repozytorium, ponieważ zawiera dane poufne. Implementacja korzysta tylko z treści właściwych dla publicznej strony.

## Edycja

- `src/services.json` — zatwierdzony katalog usług i treści podstron.
- `src/site.json` — kontakt, domena, endpoint, potwierdzenia, projekty.
- `src/privacy.html` — informacja o przetwarzaniu danych do uzupełnienia i zatwierdzenia.
- `scripts/build.mjs` — generowanie HTML i układ strony.
- `src/assets/` — wygląd, schemat i interakcje.

## Przygotowanie publikacji

Zobacz [listę danych do uruchomienia](docs/LAUNCH.md). `npm run build:production` odmawia budowania, dopóki brakuje zatwierdzonych danych kontaktowych, informacji prawnych, domeny i endpointu HTTPS.

Po zatwierdzeniu produkcyjny formularz wysyła standardowy multipart POST do skonfigurowanego endpointu. Backend jest osobną integracją: musi obsłużyć pliki, walidację, ochronę przed spamem, retencję, błędy i stronę potwierdzenia. Sam projekt nie tworzy skrzynki odbiorczej ani magazynu danych.

GitHub Actions uruchamia testy i tworzy artefakt podglądu. Nie wdraża automatycznie strony do internetu.
