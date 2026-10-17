# Zelda Ailine Luconi (`@EilinLux`) — Personal Portfolio & Architecture Hub

A bold, Neo-Brutalist personal website and interactive architecture hub built with zero-dependency **HTML5, Vanilla CSS, and JavaScript**—ready to deploy directly to **GitHub Pages** (`https://eilinlux.github.io`).

## ✨ Features Included
- **Featured Multi-Platform Spotlight Trio**: Direct links to the **Medium ADK 101 Series** (`https://lnkd.in/eFVfS-Cj`), **GitHub Repository** (`https://lnkd.in/emNBt5mS`), and **YouTube / Original Conference Talk** (`https://lnkd.in/eAHWXP2D`).
- **Interactive "Digital Assembly Line" Simulator (`SostaApp`)**: Visitors can test 3 traveler scenarios (*Returning Driver*, *Unregistered Traveler*, and *Prompt Injection Attempt*) across the 5-station Google ADK 2.0 `GraphWorkflow` pipeline with live Python & state inspection.
- **Git Branch-per-Article Explorer**: Interactive map of `EilinLux/adk2.0-medium` branches with one-click `git checkout` clipboard copy.
- **Curated Medium Articles Hub**: Filterable cards linking to stories published in *Google Cloud - Community* and `@ailluzdatascience` across Agentic AI, Gemini Enterprise, Quantum Computing, and Cloud FinOps.
- **Light & Dark Neo-Brutalist Theme Toggle**: Warm paper mode (`#FFFDF7`) and Dark Neo-Brutalist mode (`#111116`).

---

## 🚀 How to Host on GitHub Pages (`EilinLux.github.io`)

1. **Create the Repository on GitHub**:
   - Go to [github.com/new](https://github.com/new) while logged in as **EilinLux**.
   - Name the repository **`EilinLux.github.io`** (must match your GitHub username) and set it to **Public**.

2. **Push This Folder to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Neo-Brutalist personal portfolio site"
   git branch -M main
   git remote add origin https://github.com/EilinLux/EilinLux.github.io.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Open your repository on GitHub → **Settings** → **Pages**.
   - Under **Build and deployment** → **Source**, select **Deploy from a branch**.
   - Choose **`main`** and **`/ (root)`**, then click **Save**.
   - In ~60 seconds, your site will be live at **`https://eilinlux.github.io`**!


### New Release
Whenever you want to update your site in the future, just edit the files here in ./github-site and run:

   ```bash
git add .
git commit -m "Update portfolio"
git push
   ```
