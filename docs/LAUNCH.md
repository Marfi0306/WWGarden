# Dane przed uruchomieniem strony

1. Zatwierdzić jeden numer telefonu i docelowy e-mail. Uzupełnić `phone` (format +48…), `email`, ustawić `contactApproved`.
2. Potwierdzić nazwę administratora danych, uzupełnić `legalName`, przygotować kompletny `src/privacy.html` i dopiero wtedy ustawić `privacyApproved`.
3. Uzupełnić `origin` pełną docelową domeną HTTPS.
4. Podłączyć `formEndpoint` HTTPS. Przetestować rzeczywiste doręczenie zapytania i zdjęć oraz potwierdzenia i błędy. Endpoint powinien egzekwować limit 5 zdjęć po 10 MB, sprawdzać treść plików po stronie serwera, chronić przed spamem, ustalić retencję i usuwać metadane zdjęć stosownie do potrzeb. Walidacja przeglądarki nie zastępuje zabezpieczeń backendu.
5. Potwierdzić autentyczne fotografie i prawa publikacji. `projects` akceptuje obiekty: `approved`, `image` (HTTPS), `alt`, `town`, `title`, `scope`. Nie dodawać prywatnych adresów i cen klientów. Wgrywać zoptymalizowane zdjęcia, bez danych lokalizacji EXIF.
6. Ustalić właściwy wariant logo i linki social. Obecnie nagłówek używa nazwy tekstowej; nie zmienia historycznego znaku.
7. Uruchomić testy, build produkcyjny, sprawdzić strony na telefonie oraz formularz na docelowym hostingu. Wdrożyć katalog `dist/` w korzeniu domeny. Zweryfikować stronę 404, HTTPS, cache, nagłówki bezpieczeństwa i sitemap.

Brak portfolio nie uprawnia do zastąpienia go zdjęciami stockowymi udającymi realizacje. Nie dodawać opinii, cen ani nowych usług bez źródeł i decyzji właściciela.
