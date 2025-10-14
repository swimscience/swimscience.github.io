(function() {
    const distanceInput = document.getElementById('distance');
    const minutesInput = document.getElementById('minutes');
    const secondsInput = document.getElementById('seconds');
    const poolLengthSelect = document.getElementById('poolLength');
    const resultsEl = document.getElementById('results');
    const calculateBtn = document.getElementById('calculateBtn');

    function formatTime(totalSeconds) {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.round(totalSeconds % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    function addResult(label, value) {
        const dt = document.createElement('dt');
        dt.textContent = label;
        const dd = document.createElement('dd');
        dd.textContent = value;
        resultsEl.appendChild(dt);
        resultsEl.appendChild(dd);
    }

    function clearResults() {
        while (resultsEl.firstChild) {
            resultsEl.removeChild(resultsEl.firstChild);
        }
    }

    function calculate() {
        const distance = Number(distanceInput.value);
        const minutes = Number(minutesInput.value) || 0;
        const seconds = Number(secondsInput.value) || 0;
        const poolLength = Number(poolLengthSelect.value);
        const totalSeconds = minutes * 60 + seconds;

        clearResults();

        if (!distance || distance <= 0) {
            addResult('Error', 'Enter a positive distance in meters.');
            return;
        }

        if (!Number.isFinite(totalSeconds) || totalSeconds <= 0) {
            addResult('Error', 'Enter a valid finishing time.');
            return;
        }

        const pacePer100 = totalSeconds / (distance / 100);
        const pacePer50 = totalSeconds / (distance / 50);
        const pacePerLap = totalSeconds / (distance / poolLength);
        const predicted1k = (totalSeconds / distance) * 1000;

        addResult('Pace per 100m', `${pacePer100.toFixed(1)} sec (${formatTime(pacePer100)})`);
        addResult('Pace per 50m', `${pacePer50.toFixed(1)} sec (${formatTime(pacePer50)})`);
        addResult(`${poolLength}m Split`, `${pacePerLap.toFixed(1)} sec (${formatTime(pacePerLap)})`);
        addResult('Projected 1K Time', formatTime(predicted1k));

        // GA4 Event Tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'calculator_use', {
                'event_category': 'calculator',
                'event_label': 'pace',
                'calculator_type': 'pace',
                'input_distance': distance,
                'input_time': totalSeconds,
                'result_pace': Math.round(pacePer100)
            });
        }
    }

    calculateBtn.addEventListener('click', calculate);
})();
