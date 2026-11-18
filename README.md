# Pravin Patil, portfolio

Plain HTML, CSS and JavaScript. No build step, no frameworks, works on GitHub Pages as is.

## Publish on GitHub Pages (about 5 minutes)

1. On GitHub, create a new **public** repository named exactly `YOUR-USERNAME.github.io`
   (for the username on your resume that is `pravin-embedded.github.io`).
2. Click **Add file > Upload files**, drag in everything from this folder
   (`index.html`, `style.css`, `script.js`, `Pravin_Patil_Resume.pdf`, `.nojekyll`, `README.md`), then **Commit changes**.
3. Open **Settings > Pages**. Under **Build and deployment** choose **Deploy from a branch**,
   branch `main`, folder `/ (root)`, then **Save**.
4. After a minute your site is live at `https://YOUR-USERNAME.github.io`.

Put that link on your resume, LinkedIn and email signature.

## Make it stronger as you go

Open `script.js` and fill in the `LINKS` block at the top. Each project then shows a
**Source on GitHub** and/or **Watch the demo** button. Empty links stay hidden.

Best additions, in order of impact:
1. A repository for each project with a clear README (what it does, wiring or block diagram, how to build, a photo).
2. A 30 to 60 second demo video per project (a phone recording is fine), uploaded to YouTube as unlisted.
3. Real numbers in the project text (bitrate, number of nodes, sampling interval, test count).

## Edit your details

- Text, projects, skills: `index.html`
- Colours and layout: `style.css` (the colour tokens are at the top)
- Email and project links: top of `script.js`, plus the `mailto:` links in `index.html`
- Resume: replace `Pravin_Patil_Resume.pdf` with a newer PDF of the same name
