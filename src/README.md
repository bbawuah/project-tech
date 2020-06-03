## Backend
De endpoints zijn op dit moment voor iedereen toegankelijk. Ik wou graag nog private routes maken voor gebruikers die zijn ingelogd. Maar dit is me 'nog' niet gelukt vanwege het probleem dat mijn fetch response body een readablestream is


**UPDATE - Laatmaar! fixed it!! ik sla nu de webtokens op in localStorage. Dit is volgens mij bad practise maar het zetten van cookies vond ik een beetje teveel gezeik ivm met CORS policies enzo.


### Mongoose

#### Mongoose Models
Een mongoose model is eigenlijk een blue print voor de data die je schrijft naar je database. Met models kan je aangeven welk datatype je verwacht, je kan data valideren en nog meer

#### Mongoose Middleware
"Middleware (also called pre and post hooks) are functions which are passed control during execution of asynchronous functions. Middleware is specified on the schema level and is useful for writing. https://mongoosejs.com/docs/middleware.html"

- Met andere woorden.. Middlewares kunnen dus een functie uitvoeren vlak voor of na een opdracht. https://mongoosejs.com/docs/middleware.html

### Authentication tokens

#### JSON WEBTOKENS
Het is me nog niet gelukt om de json webtokens in de cookies of localstorage te plaatsen omdat mijn fetch response.body een readablestream was en ik niet goed wist hoe ik dat kon fiksen. Ik heb er daarna niet zoveel tijd meer aan besteed omdat ik meer wilde focussen op mijn chat feature.


### Securely storing user passwords

Het op een veilige manier bewaren van de wachtwoorden is enorm belangrijk in een applicatie.
De meeste mensen gebruiken hetzelfde wachtwoord voor meerdere accounts op platformen
Wanneer onze applicatie bijvoorbeeld wordt gehackt dan liggen alle wachtwoorden op straat.
Hiermee kunnen hackers de data zelfs de wachtwoorden gebruiken om op andere accounts in te loggen

#### Encryption vs Hashing

Tijdens mijn onderzoek naar het hashen van wachtwoorden ben ik tegen gekomen wat het verschil is van Encryption en Hashing

| Encryption                                                                                      | Hashing                                                                                                                           |
| :---------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| :eight_spoked_asterisk: Encryption is het altijd mogelijk om de original value terug te krijgen | :eight_spoked_asterisk: Hashing algorithms zijn one-way algorithms en maken het niet mogelijk om original values terug te krijgen |
|                                                                                                 |                                                                                                                                   |
|                                                                                                 |                                                                                                                                   |
