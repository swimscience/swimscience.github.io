// GA4 Event Tracking for SwimScience Calculators

(function() {
    'use strict';

    // Track CTA clicks
    function trackCTAClicks() {
        const ctaLinks = document.querySelectorAll('a[href*="swimanalytics.app"]');
        ctaLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                if (typeof gtag !== 'undefined') {
                    const location = this.closest('nav') ? 'header' :
                                   this.closest('footer') ? 'footer' :
                                   'content';

                    gtag('event', 'cta_click', {
                        'event_category': 'engagement',
                        'event_label': 'swimanalytics_cta',
                        'cta_location': location,
                        'cta_text': this.textContent.trim(),
                        'page_url': window.location.href
                    });
                }
            });
        });
    }

    // Track scroll depth
    function trackScrollDepth() {
        const thresholds = [25, 50, 75, 90];
        const tracked = new Set();

        function checkScroll() {
            const scrollPercent = Math.round(
                (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
            );

            thresholds.forEach(threshold => {
                if (scrollPercent >= threshold && !tracked.has(threshold)) {
                    tracked.add(threshold);
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'scroll', {
                            'event_category': 'engagement',
                            'event_label': `scroll_${threshold}`,
                            'percent_scrolled': threshold,
                            'page_url': window.location.href
                        });
                    }
                }
            });
        }

        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    checkScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // Track affiliate clicks
    function trackAffiliateClicks() {
        const affiliateLinks = document.querySelectorAll('a[href*="amazon"], a[rel*="nofollow"]');
        affiliateLinks.forEach(link => {
            if (!link.hasAttribute('onclick')) { // Don't double-track if already tracked
                link.addEventListener('click', function(e) {
                    if (typeof gtag !== 'undefined') {
                        const destination = this.hostname || 'unknown';
                        gtag('event', 'click', {
                            'event_category': 'outbound',
                            'event_label': destination,
                            'link_url': this.href
                        });
                    }
                });
            }
        });
    }

    // Initialize tracking when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            trackCTAClicks();
            trackScrollDepth();
            trackAffiliateClicks();
        });
    } else {
        trackCTAClicks();
        trackScrollDepth();
        trackAffiliateClicks();
    }
})();
