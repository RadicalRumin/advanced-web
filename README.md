# 💸 Advanced Web - Budgetbeheer App

Deze applicatie is ontwikkeld in het kader van de eindopdracht voor het vak Advanced JavaScript (ADWEB) aan Avans Hogeschool. Het project is gebouwd met **Next.js 15**, **Firebase Firestore** en ondersteunt gebruikersauthenticatie, het beheren van transacties (inkomsten/uitgaven), boekjes, en categorieën.

## ⚙️ Features

- ✅ Inloggen / Uitloggen met Firebase Auth
- 📖 CRUD voor **boekjes**
  - Toevoegen, wijzigen, archiveren en herstellen
  - Beveiligd per eigenaar
- 🏷️ CRUD voor **categorieën**
  - Naam, omschrijving, optioneel maximaal budget & einddatum
  - Visuele feedback bij overschrijding van het budget
- 💰 Beheer van **transacties** per boekje
  - Type: `income` of `expense`
  - Alleen `expense` telt mee voor uitgavenanalyse
- 📊 Overzicht van alle uitgaven per categorie
  - Inclusief kleurcodering (wit, oranje, rood) op basis van overschrijding
- 🔄 Real-time updates met `onSnapshot`
- 🔐 Separation of Concerns d.m.v. services & herbruikbare componenten
- 🧪 Unit tests met Jest en code coverage rapportage
