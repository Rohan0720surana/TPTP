# OST Template: Express + Mongoose + Bootstrap 4

Set up for the **Sports Utility** question (login, navbar, dropdown with badges, carousel, form, table, shop, contact).
For any other question, change only the lines marked `CHANGE`.

## Files (create these 6 in one folder)

| File | What it is |
|---|---|
| `index.js` | The server: routes and database connection |
| `User.js` | Model for login users (username, password) |
| `Sport.js` | Model for the question's data (4 fields) |
| `index.html` | Home page |
| `login.html` | Login page |
| `registration.html` | Registration page |

## Setup in the exam (VS Code terminal, internet ON)

```
node -v
npm -v
npm init -y
npm install express mongoose bcryptjs bootstrap@4.4.1 jquery@3.4.1
```
Open MongoDB Compass and click **Connect**. (Turn the internet off now if the exam requires it.)

## Run

```
node index.js
```
Open http://localhost:3000, register, log in, add records. Check the data in Compass.
After changing code: **Ctrl+C**, `node index.js` again, refresh the browser.

---

## What to change in each file

Example: **Pizza store** with fields Pizza Name, Category, Size, Cost.

### 1. `Sport.js`
- Rename the file to `Pizza.js`.
- `"Sport"` → `"Pizza"`
- The 4 fields → `name`, `category`, `size`, `cost`

### 2. `index.js` (4 lines marked CHANGE)
- `const Sport = require("./Sport");` → `const Pizza = require("./Pizza");`
- `sportsdb` → `pizzadb`
- `Sport.find()` → `Pizza.find()`
- `Sport.create(req.body)` → `Pizza.create(req.body)`

### 3. `index.html`
| Section | Change |
|---|---|
| `<title>` and `navbar-brand` | App name |
| Navbar links | What the question asks (e.g. Home, Menu, Contact Us) |
| Dropdown `<li>` | Change the items and badges, or delete it if not asked |
| Carousel | Put image links in the 3 `src=""`, or delete the block if not asked |
| Form | The 4 inputs: each `name="..."` = a model field |
| Table | The 4 `<th>` headings, same order as the form |
| Script | The 4 `${x.____}` = the model fields |
| Shop | Change the cards, or delete the block if not asked |
| Contact | Your text |

### 4. `User.js`, `login.html`, `registration.html`
No changes needed.

### Golden rule
The same 4 field names in **4 places**: model, form `name`, table heading order, `${x.____}`.

---

## Images for the carousel
- **Internet link:** `src="https://picsum.photos/1200/400?1"` (use `?2`, `?3` for different pictures).
- **Your own file (works offline):** put `p1.jpg` in the folder, write `src="/p1.jpg"`, and add in `index.js` after the jquery line:
  `app.get("/p1.jpg", (req, res) => res.sendFile(path.join(__dirname, "p1.jpg")));`

## No login in the question?
- `index.js`: delete the `User` line and the `/login`, `/registration`, `/home` routes (and both `app.post` login/registration routes). Change the first route to:
  `app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));`
- Delete `User.js`, `login.html`, `registration.html` and the Logout button in `index.html`.

## Common errors

| Error | Fix |
|---|---|
| `Cannot find module 'express'` | Run the npm install line in this folder |
| `Cannot find module './Pizza'` | File name / capital letter doesn't match the `require` |
| `ECONNREFUSED 127.0.0.1:27017` | MongoDB isn't running: open Compass and connect |
| `EADDRINUSE :::3000` | Server already running: Ctrl+C in the other terminal |
| Page looks plain | Bootstrap not installed, or the `/bootstrap` lines in `index.js` are missing |
| Data saves but doesn't show | A `${x.____}` name doesn't match the model |
| Nothing saves | An input `name` doesn't match the model |
