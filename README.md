# University Knowledge Base / FAQ SPA

Eine einfache und saubere Single Page Application (SPA) fuer ein Hochschulprojekt.
Die Anwendung erlaubt es, Artikel zu **anzeigen**, **durchsuchen** und **verwalten**.

## Technologien

### Frontend
- React
- React Router
- Funktionale Komponenten mit Hooks (`useState`, `useEffect`)
- Einfaches CSS (ohne UI-Framework)

### Backend
- Node.js
- Express
- REST API
- JSON-Kommunikation
- In-Memory-Datenspeicherung (Array)

## Projektstruktur

```text
frontend/
  src/
    components/
    pages/
    services/
    App.jsx
    main.jsx

backend/
  routes/
  controllers/
  server.js
```

## Funktionen

Die SPA enthaelt folgende Seiten:

1. **Home**
- Zeigt Basisinfos und Statistik (Anzahl Artikel und Kategorien)

2. **Articles**
- Listet alle Artikel aus dem Backend

3. **Article Detail**
- Zeigt den vollstaendigen Inhalt eines Artikels

4. **Categories**
- Zeigt alle Kategorien

5. **Category Detail**
- Zeigt alle Artikel einer bestimmten Kategorie

6. **Search**
- Sucht Artikel nach Titel

7. **Tags**
- Zeigt alle vorhandenen Tags

8. **Article Management**
- Artikel erstellen (POST)
- Artikel bearbeiten (PUT)
- Artikel loeschen (DELETE)

9. **About**
- Kurze Projektbeschreibung und React-Hinweis

## REST API

Basis-URL: `http://localhost:5000/api`

### Pflicht-Endpunkte
- `GET /api/articles`
- `GET /api/articles/:id`
- `POST /api/articles`
- `PUT /api/articles/:id`
- `DELETE /api/articles/:id`
- `GET /api/categories`
- `GET /api/tags`

### Zusaetzliche Endpunkte fuer die SPA
- `GET /api/categories/:categoryName/articles` (Artikel pro Kategorie)
- `GET /api/stats` (Anzahl Artikel/Kategorien fuer Home)

## Artikelmodell

```json
{
  "id": 1,
  "title": "How to Access the Digital Library",
  "content": "...",
  "category": "Library",
  "tags": ["library", "ebooks", "research"]
}
```

## Installation und Start

### 1. Backend starten

```bash
cd backend
npm install
npm run dev
```

Server laeuft auf: `http://localhost:5000`

### 2. Frontend starten

In einem zweiten Terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend laeuft standardmaessig auf Vite-URL (z. B. `http://localhost:5173`).

## Hinweise

- Das Frontend spricht per `fetch` mit dem Express-Backend (`src/services/api.js`).
- Es gibt keine Authentifizierung (bewusst laut Aufgabenstellung).
- Daten werden aktuell nur im Speicher gehalten und bei Server-Neustart zurueckgesetzt.
