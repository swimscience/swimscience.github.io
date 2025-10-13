(function() {
    const rows = [
        {
            app: 'SwimAnalytics',
            focus: 'analytics',
            bestFor: 'Stroke analysis + AI coaching',
            features: ['Video breakdown', 'Personalized plans', 'Garmin sync'],
            price: '€9.99',
            trial: '7 days',
            url: 'https://swimanalytics.app'
        },
        {
            app: 'MySwimPro',
            focus: 'workouts',
            bestFor: 'Training plans & swim library',
            features: ['Daily workouts', 'Watch integration', 'Technique tips'],
            price: '€19.99',
            trial: '30 days',
            url: 'https://www.myswimpro.com/'
        },
        {
            app: 'FORM Swim',
            focus: 'technique',
            bestFor: 'In-goggle metrics',
            features: ['Smart goggles', 'Live pacing', 'Training plans'],
            price: '€24.99',
            trial: 'Free demo',
            url: 'https://www.formswim.com/'
        },
        {
            app: 'Garmin Connect',
            focus: 'analytics',
            bestFor: 'Wearable data aggregation',
            features: ['Workout sync', 'Charts & dashboards', 'Community challenges'],
            price: 'Free',
            trial: '—',
            url: 'https://connect.garmin.com/'
        },
        {
            app: 'Swimplan',
            focus: 'workouts',
            bestFor: 'Lap swimmers needing structure',
            features: ['Custom workouts', 'Printable plans', 'Technique drills'],
            price: '€7.49',
            trial: '14 days',
            url: 'https://www.swimplan.com/'
        }
    ];

    const body = document.querySelector('#comparisonTable tbody');
    const focusSelect = document.getElementById('focusSelect');

    function render(filter) {
        body.innerHTML = '';
        const filteredRows = filter === 'all' ? rows : rows.filter(row => row.focus === filter);

        filteredRows.forEach(row => {
            const tr = document.createElement('tr');

            const appCell = document.createElement('td');
            const badge = document.createElement('span');
            badge.className = 'badge';
            badge.textContent = row.focus;
            const appName = document.createElement('div');
            appName.className = 'text-lg font-semibold text-slate-900';
            appName.textContent = row.app;
            appCell.appendChild(appName);
            appCell.appendChild(badge);

            const bestForCell = document.createElement('td');
            bestForCell.textContent = row.bestFor;

            const featuresCell = document.createElement('td');
            const list = document.createElement('ul');
            list.className = 'list-disc space-y-1 pl-5 text-slate-600';
            row.features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature;
                list.appendChild(li);
            });
            featuresCell.appendChild(list);

            const priceCell = document.createElement('td');
            priceCell.textContent = row.price;

            const trialCell = document.createElement('td');
            trialCell.textContent = row.trial;

            const linkCell = document.createElement('td');
            const link = document.createElement('a');
            link.href = row.url;
            link.target = '_blank';
            link.rel = 'nofollow noopener';
            link.className = 'inline-flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-500';
            link.innerHTML = 'Visit <span aria-hidden="true">→</span>';
            linkCell.appendChild(link);

            tr.appendChild(appCell);
            tr.appendChild(bestForCell);
            tr.appendChild(featuresCell);
            tr.appendChild(priceCell);
            tr.appendChild(trialCell);
            tr.appendChild(linkCell);

            body.appendChild(tr);
        });
    }

    focusSelect.addEventListener('change', () => {
        render(focusSelect.value);
    });

    render('all');
})();
