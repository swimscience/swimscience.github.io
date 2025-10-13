# SwimAnalytics App Comparisons

This repository powers the SwimAnalytics app comparison microsite hosted on GitHub Pages. It positions SwimAnalytics against other popular swim training apps.

## Local Preview

```
cd ~/swimanalytics-sites/apps
git checkout gh-pages
python3 -m http.server 8002
```

## Deployment

Push to `gh-pages` and GitHub Pages updates automatically:

```
git add .
git commit -m "Update comparison table"
git push origin gh-pages
```
