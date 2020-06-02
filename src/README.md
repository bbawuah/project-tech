## Backend

De endpoints zijn op dit moment voor iedereen toegankelijk. Ik wil graag private routes maken voor gebruikers die zijn ingelogd!


### Mongoose

#### Mongoose Models

#### Mongoose Middleware
Middleware (also called pre and post hooks) are functions which are passed control during execution of asynchronous functions. Middleware is specified on the schema level and is useful for writing. https://mongoosejs.com/docs/middleware.html

Middlewares kunnen dus een functie uitvoeren vlak voor of na een opdracht.

### Authentication tokens

#### JSON WEBTOKENS





### Securely storing user passwords

Het op een veilige manier bewaren van de wachtwoorden is enorm belangrijk in een applicatie.
De meeste mensen gebruiken hetzelfde wachtwoord voor meerdere accounts op platformen
Wanneer onze applicatie bijvoorbeeld wordt gehackt dan liggen alle wachtwoorden op straat.
Hiermee kunnen hackers de data zelfs de wachtwoorden gebruiken om op andere accounts in te loggen

#### Encryption vs Hashing

Tijdens mijn onderzoek naar het hashen van wachtwoorden ben ik tegen gekomen wat het verschil is van Encryption en Hashing


https://www.solarwindsmsp.com/blog/hashing-vs-encryption%C2%A0

| Encryption                                                                                      | Hashing                                                                                                                           |
| :---------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| :eight_spoked_asterisk: Encryption is het altijd mogelijk om de original value terug te krijgen | :eight_spoked_asterisk: Hashing algorithms zijn one-way algorithms en maken het niet mogelijk om original values terug te krijgen |
|                                                                                                 |                                                                                                                                   |
|                                                                                                 |                                                                                                                                   |
