(function() {
    const products = [
        {
            name: 'Garmin Swim 2 Watch',
            category: 'tracking',
            goal: 'Best overall tracker',
            rating: '4.9/5',
            price: '€299',
            affiliateUrl: 'https://amzn.to/swim-watch',
            highlight: 'Tracks open water and pool metrics with auto stroke detection.'
        },
        {
            name: 'FINIS Tempo Trainer Pro',
            category: 'technique',
            goal: 'Master pacing',
            rating: '4.7/5',
            price: '€69',
            affiliateUrl: 'https://amzn.to/tempo-trainer',
            highlight: 'Audible beeps keep your stroke rate stable across sets.'
        },
        {
            name: 'Arena Cobra Ultra Swipe Goggles',
            category: 'technique',
            goal: 'Race day clarity',
            rating: '4.8/5',
            price: '€54',
            affiliateUrl: 'https://amzn.to/swim-goggles',
            highlight: 'Anti-fog swipe tech lasts longer than standard coatings.'
        },
        {
            name: 'TYR Catalyst Stroke Paddles',
            category: 'power',
            goal: 'Develop power',
            rating: '4.6/5',
            price: '€39',
            affiliateUrl: 'https://amzn.to/tyr-paddles',
            highlight: 'Open palm design builds catch strength without stressing shoulders.'
        },
        {
            name: 'FINIS Freestyle Snorkel',
            category: 'technique',
            goal: 'Improve alignment',
            rating: '4.5/5',
            price: '€39',
            affiliateUrl: 'https://amzn.to/freestyle-snorkel',
            highlight: 'Lets you focus on body position and pull without breathing interruptions.'
        },
        {
            name: 'Power Bags Drag Trainer',
            category: 'power',
            goal: 'Build strength',
            rating: '4.4/5',
            price: '€59',
            affiliateUrl: 'https://amzn.to/swim-power-bag',
            highlight: 'Adjustable bags add resistance for elite power sets.'
        }
    ];

    const buttons = document.querySelectorAll('.filter-btn');
    const grid = document.getElementById('gearGrid');

    function createCard(product) {
        const card = document.createElement('article');
        card.className = 'gear-card';

        const badge = document.createElement('span');
        badge.className = 'badge';
        badge.textContent = product.goal;

        const name = document.createElement('h2');
        name.className = 'text-xl font-semibold text-white';
        name.textContent = product.name;

        const highlight = document.createElement('p');
        highlight.className = 'text-slate-300';
        highlight.textContent = product.highlight;

        const footer = document.createElement('div');
        footer.className = 'flex flex-wrap items-center justify-between gap-4';

        const rating = document.createElement('span');
        rating.className = 'text-blue-200';
        rating.textContent = `Rating: ${product.rating}`;

        const price = document.createElement('span');
        price.className = 'text-slate-400';
        price.textContent = product.price;

        const link = document.createElement('a');
        link.href = product.affiliateUrl;
        link.target = '_blank';
        link.rel = 'nofollow noopener';
        link.className = 'rounded bg-blue-500 px-4 py-2 font-semibold text-white transition hover:bg-blue-400';
        link.textContent = 'View on Amazon';

        footer.appendChild(rating);
        footer.appendChild(price);
        footer.appendChild(link);

        card.appendChild(badge);
        card.appendChild(name);
        card.appendChild(highlight);
        card.appendChild(footer);

        return card;
    }

    function render(filter) {
        grid.innerHTML = '';
        const filtered = filter === 'all' ? products : products.filter(item => item.category === filter);
        filtered.forEach(product => grid.appendChild(createCard(product)));
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            render(button.dataset.filter);
        });
    });

    render('all');
})();
