(function() {
    const workouts = [
        {
            title: 'Speed Ladder 2000',
            distance: 2000,
            focus: 'speed',
            stroke: 'free',
            mainSet: '8x50 @ :55 descend + 4x100 @ 1:25 best average',
            notes: 'Use fins on the first round to prime speed, then remove for final 100s.'
        },
        {
            title: 'IM Power 3200',
            distance: 3200,
            focus: 'endurance',
            stroke: 'im',
            mainSet: '4x(100 IM drill + 200 IM strong) @ :20 rest',
            notes: 'Alternate drill focus each round (kick, pull, single arm).'
        },
        {
            title: 'Aerobic Build 3600',
            distance: 3600,
            focus: 'endurance',
            stroke: 'free',
            mainSet: '3x400 @ 5:20 hold threshold + 8x50 @ :50 kick',
            notes: 'Aim for even 400 pacing within ±2 seconds.'
        },
        {
            title: 'Drill & Skill 2400',
            distance: 2400,
            focus: 'technique',
            stroke: 'free',
            mainSet: '12x75 (25 drill / 25 swim / 25 swim build) @ 1:25',
            notes: 'Focus on high-elbow catch and body rotation accents.'
        },
        {
            title: 'Kick Enduro 2800',
            distance: 2800,
            focus: 'endurance',
            stroke: 'kick',
            mainSet: '6x100 kick @ 2:05 + 4x50 underwater dolphin @ 1:15',
            notes: 'Use snorkel to keep head neutral.'
        },
        {
            title: 'Sprint-Stroke Combo 1800',
            distance: 1800,
            focus: 'speed',
            stroke: 'im',
            mainSet: '4x(25 stroke sprint + 25 easy) + 6x50 free @ 1:10 all out',
            notes: 'Keep underwater kicks to 10m off each wall.'
        }
    ];

    const distanceFilter = document.getElementById('distanceFilter');
    const focusFilter = document.getElementById('focusFilter');
    const strokeFilter = document.getElementById('strokeFilter');
    const grid = document.getElementById('workoutGrid');
    const downloadBtn = document.getElementById('downloadCsv');

    function passesDistance(workout, filterValue) {
        if (filterValue === 'all') return true;
        const dist = workout.distance;
        switch (filterValue) {
            case '2000':
                return dist <= 2000;
            case '3000':
                return dist > 2000 && dist <= 3000;
            case '4000':
                return dist > 3000 && dist <= 4000;
            case '5000':
                return dist > 4000;
            default:
                return true;
        }
    }

    function createCard(workout) {
        const card = document.createElement('article');
        card.className = 'workout-card';

        const header = document.createElement('div');
        header.className = 'flex items-start justify-between gap-4';

        const title = document.createElement('h2');
        title.className = 'text-2xl font-semibold text-white';
        title.textContent = workout.title;

        const tags = document.createElement('div');
        tags.className = 'flex flex-wrap gap-2';

        const focusTag = document.createElement('span');
        focusTag.className = 'tag focus';
        focusTag.textContent = workout.focus;

        const distanceTag = document.createElement('span');
        distanceTag.className = 'tag distance';
        distanceTag.textContent = `${workout.distance}m`;

        tags.appendChild(focusTag);
        tags.appendChild(distanceTag);

        header.appendChild(title);
        header.appendChild(tags);

        const mainSet = document.createElement('p');
        mainSet.className = 'text-slate-200';
        mainSet.textContent = workout.mainSet;

        const notes = document.createElement('p');
        notes.className = 'text-slate-400';
        notes.textContent = workout.notes;

        const meta = document.createElement('div');
        meta.className = 'workout-meta';
        meta.innerHTML = `<span>Focus: ${workout.focus}</span><span>Stroke: ${workout.stroke}</span>`;

        card.appendChild(header);
        card.appendChild(mainSet);
        card.appendChild(notes);
        card.appendChild(meta);

        return card;
    }

    function render() {
        grid.innerHTML = '';
        const focusValue = focusFilter.value;
        const strokeValue = strokeFilter.value;
        const distanceValue = distanceFilter.value;

        const filtered = workouts.filter(workout => {
            const focusMatch = focusValue === 'all' || workout.focus === focusValue;
            const strokeMatch = strokeValue === 'all' || workout.stroke === strokeValue;
            const distanceMatch = passesDistance(workout, distanceValue);
            return focusMatch && strokeMatch && distanceMatch;
        });

        if (!filtered.length) {
            const empty = document.createElement('p');
            empty.className = 'rounded-xl border border-dashed border-slate-700 bg-slate-900/60 p-6 text-center text-slate-400';
            empty.textContent = 'No workouts match that combination yet. Adjust your filters or request a set inside SwimAnalytics.';
            grid.appendChild(empty);
            return;
        }

        filtered.forEach(workout => grid.appendChild(createCard(workout)));
    }

    function downloadCsvFile() {
        const header = ['Title', 'Distance', 'Focus', 'Stroke', 'Main Set', 'Notes'];
        const rows = workouts.map(w => [
            w.title,
            w.distance,
            w.focus,
            w.stroke,
            w.mainSet.replace(/,/g, ';'),
            w.notes.replace(/,/g, ';')
        ]);
        const csvContent = [header, ...rows]
            .map(columns => columns
                .map(value => `"${value}"`)
                .join(','))
            .join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'swimanalytics-workouts.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    distanceFilter.addEventListener('change', render);
    focusFilter.addEventListener('change', render);
    strokeFilter.addEventListener('change', render);
    downloadBtn.addEventListener('click', downloadCsvFile);

    render();
})();
