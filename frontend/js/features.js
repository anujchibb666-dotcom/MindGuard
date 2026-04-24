/* ============================================
   MindGuard – Extra Features
   Affirmations, Mood Assistant, and Animations
   ============================================ */

const Features = {
    async init() {
        this.loadAffirmation();
        this.setupMoodAssistant();
        this.addScrollAnimations();
    },

    async loadAffirmation() {
        const affirmationEl = document.getElementById('daily-affirmation');
        if (!affirmationEl) return;

        try {
            const res = await Api.get('/wellness/affirmation');
            if (res.success) {
                affirmationEl.innerText = `"${res.data.affirmation}"`;
                affirmationEl.classList.add('fade-in');
            }
        } catch (err) {
            console.error('Failed to load affirmation:', err);
        }
    },

    setupMoodAssistant() {
        const assistantBtn = document.getElementById('mood-assistant-btn');
        if (!assistantBtn) return;

        assistantBtn.addEventListener('click', () => {
            const mood = document.querySelector('.mood-option.active')?.dataset.mood || 3;
            this.showMoodAdvice(parseInt(mood));
        });
    },

    showMoodAdvice(mood) {
        const adviceMap = {
            1: "I'm sorry you're feeling down. Would you like to try a 5-minute breathing exercise or listen to some rain sounds?",
            2: "Things seem a bit tough right now. Remember that it's okay to take a break. Maybe write your thoughts in the journal?",
            3: "You're feeling okay, but a little boost might help. How about a short walk or a quick meditation?",
            4: "Glad to see you're doing well! Keep up the positive momentum. Have you checked your achievements today?",
            5: "Awesome energy! Share some of that positivity in the forum or join a peer circle to support others."
        };

        alert(adviceMap[mood] || "How can I help you today?");
    },

    addScrollAnimations() {
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.glass-card, .page-section h2').forEach(el => {
            el.classList.add('scroll-reveal');
            observer.observe(el);
        });
    }
};

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    Features.init();
});
