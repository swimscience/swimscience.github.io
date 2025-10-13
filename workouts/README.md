# SwimAnalytics Workout Library

GitHub Pages microsite with curated swim workout templates. Filters help readers find the right set by distance, focus, and stroke.

## Preview Locally

```
cd ~/swimanalytics-sites/workouts
git checkout gh-pages
python3 -m http.server 8003
```

## Deployment

```
git add .
git commit -m "Update workouts"
git push origin gh-pages
```

Use the CSV downloader in `js/app.js` when exporting sets to email subscribers.
