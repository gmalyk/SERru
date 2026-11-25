# Graph Report - SERru  (2026-09-27)

## Corpus Check
- 65 files · ~134,668 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 25 file(s) not represented in the graph (top: .css 15, (none) 6, .example 1)

## Summary
- 334 nodes · 800 edges · 14 communities (12 shown, 2 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `24702bc3`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- react
- index.js
- get
- package.json
- content.js
- App.jsx
- devDependencies
- About/index.jsx
- api/webinars.js
- Events/index.jsx
- Admin/index.jsx
- DocumentViewer/index.jsx

## God Nodes (most connected - your core abstractions)
1. `react` - 35 edges
2. `react-router-dom` - 32 edges
3. `get()` - 20 edges
4. `post()` - 20 edges
5. `put()` - 15 edges
6. `del()` - 15 edges
7. `uploadFile()` - 14 edges
8. `express` - 10 edges
9. `requireAdmin()` - 10 edges
10. `getDB()` - 10 edges

## Surprising Connections (you probably didn't know these)
- `getAboutDocuments()` --calls--> `get()`  [EXTRACTED]
  src/api/about.js → src/api/client.js
- `AboutDocumentForm()` --calls--> `getAboutDocuments()`  [EXTRACTED]
  src/pages/Admin/AboutDocumentForm.jsx → src/api/about.js
- `deleteAboutDocument()` --calls--> `del()`  [EXTRACTED]
  src/api/about.js → src/api/client.js
- `login()` --calls--> `post()`  [EXTRACTED]
  src/api/auth.js → src/api/client.js
- `logout()` --calls--> `post()`  [EXTRACTED]
  src/api/auth.js → src/api/client.js

## Import Cycles
- None detected.

## Communities (14 total, 2 thin omitted)

### Community 0 - "react"
Cohesion: 0.07
Nodes (43): react, react-router-dom, src_assets_07_04photo, src_assets_23_04photo, src_assets_doc1sem, src_assets_doc2sem, src_assets_partner1_removebg_preview, src_assets_partner2_removebg_preview (+35 more)

### Community 1 - "index.js"
Cohesion: 0.09
Nodes (35): cookie-parser, ref_crypto, express, ref_fs, multer, ref_path, ref_url, clearAuthCookie() (+27 more)

### Community 2 - "get"
Cohesion: 0.11
Nodes (36): createAboutDocument(), updateAboutDocument(), createCarouselSeminar(), updateCarouselSeminar(), del(), get(), post(), put() (+28 more)

### Community 3 - "package.json"
Cohesion: 0.05
Nodes (39): dependencies, better-sqlite3, cookie-parser, cors, express, jsonwebtoken, multer, react (+31 more)

### Community 4 - "content.js"
Cohesion: 0.09
Nodes (31): src_assets_logo, src_assets_news3, src_assets_news5, src_assets_news6, src_assets_news7, src_assets_news8, aboutText, contactInfo (+23 more)

### Community 5 - "App.jsx"
Cohesion: 0.13
Nodes (21): react-dom, deleteCarouselSeminar(), getCarouselSeminars(), deleteNews(), getNews(), createBoardMember(), deleteBoardMember(), getBoardMembers() (+13 more)

### Community 6 - "devDependencies"
Cohesion: 0.14
Nodes (14): devDependencies, autoprefixer, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, postcss (+6 more)

### Community 7 - "About/index.jsx"
Cohesion: 0.19
Nodes (11): deleteAboutDocument(), getAboutDocuments(), AboutDocumentsList, About(), activityDirections, authorityObligations, authorityRights, Icons (+3 more)

### Community 8 - "api/webinars.js"
Cohesion: 0.28
Nodes (10): createWebinar(), deleteWebinar(), getWebinar(), getWebinars(), updateWebinar(), WebinarForm, WebinarsList, WebinarForm() (+2 more)

### Community 9 - "Events/index.jsx"
Cohesion: 0.21
Nodes (10): deleteEvent(), getEvents(), normalizeEvent(), EventsList, events, EventsList(), Events(), Icons (+2 more)

### Community 10 - "Admin/index.jsx"
Cohesion: 0.31
Nodes (8): checkAuth(), login(), logout(), AdminLayout, AdminLogin, src_pages_admin_admin, AdminLayout(), AdminLogin()

### Community 11 - "DocumentViewer/index.jsx"
Cohesion: 0.22
Nodes (7): react-pdf, src_assets_приказ_о_вступлении_в_должность_тюрин_в_а, src_assets_реквизиты_омор_сэр, documentsMap, DocumentViewer(), Icons, src_pages_documentviewer_styles

## Knowledge Gaps
- **88 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+83 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 126 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `get`, `package.json`, `content.js`, `App.jsx`, `About/index.jsx`, `api/webinars.js`, `Events/index.jsx`, `Admin/index.jsx`, `DocumentViewer/index.jsx`?**
  _High betweenness centrality (0.319) - this node is a cross-community bridge._
- **Why does `react-router-dom` connect `react` to `get`, `package.json`, `content.js`, `App.jsx`, `About/index.jsx`, `api/webinars.js`, `Events/index.jsx`, `Admin/index.jsx`, `DocumentViewer/index.jsx`?**
  _High betweenness centrality (0.247) - this node is a cross-community bridge._
- **Why does `express` connect `index.js` to `package.json`?**
  _High betweenness centrality (0.131) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _88 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `react` be split into smaller, more focused modules?**
  _Cohesion score 0.0693815987933635 - nodes in this community are weakly interconnected._
- **Should `index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.09142857142857143 - nodes in this community are weakly interconnected._
- **Should `get` be split into smaller, more focused modules?**
  _Cohesion score 0.11428571428571428 - nodes in this community are weakly interconnected._