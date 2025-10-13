# SwimAnalytics Calculators

Public home for SwimAnalytics calculators deployed on GitHub Pages. The site focuses on pace tools that funnel swimmers toward SwimAnalytics Pro and affiliate recommendations.

## Local Development

```bash
# prerequisites: git
cd ~/swimanalytics-sites/calculators
git checkout gh-pages
python3 -m http.server 8000
```

Open http://localhost:8000 to preview the static site.

## Deployment

All changes on the `gh-pages` branch deploy automatically to https://swimanalytics.github.io/calculators. Use the provided `deploy.py` helper in the root workspace or run:

```bash
git add .
git commit -m "Update calculator"
git push origin gh-pages
```
