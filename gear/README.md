# SwimAnalytics Gear Lab

Static site that curates the swim gear we actually test in the pool. Every page lives on the `gh-pages` branch and deploys to GitHub Pages automatically.

## Development

```bash
cd ~/swimanalytics-sites/gear
git checkout gh-pages
python3 -m http.server 8001
```

Preview at http://localhost:8001 and update the product list in `js/app.js` when we validate new gear.

## Deployment

```
git add .
git commit -m "Update gear picks"
git push origin gh-pages
```

Remember to include affiliate disclosures on every review page.
