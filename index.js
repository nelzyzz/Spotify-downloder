particlesJS('particles-js', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: { type: "circle", stroke: { width: 0, color: "#000000" } },
        opacity: { value: 0.5, random: false },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
        move: { enable: true, speed: 6, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
    },
    interactivity: {
        detect_on: "canvas",
        events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true },
        modes: { grab: { distance: 400, line_linked: { opacity: 1 } }, bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 }, repulse: { distance: 200, duration: 0.4 }, push: { particles_nb: 4 }, remove: { particles_nb: 2 } }
    },
    retina_detect: true
});

async function fetchTrack() {
    const trackQuery = document.getElementById('trackQuery').value.trim();
    const notification = document.getElementById('notification');
    notification.innerText = ''; // Clear previous notifications

    if (!trackQuery) {
        notification.innerText = 'Please enter a Spotify track URL.';
        return;
    }

    const apiUrl = `https://joshweb.click/api/spotify2?q=${encodeURIComponent(trackQuery)}`;
    document.getElementById('loading').style.display = 'block';
    document.getElementById('result').style.display = 'none';

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.error) {
            notification.innerText = data.error;
            document.getElementById('loading').style.display = 'none';
            return;
        }

        const result = data.result;

        document.getElementById('title').innerText = result.title;
        document.getElementById('type').innerText = result.type;
        document.getElementById('artist').innerText = result.artist;
        document.getElementById('duration').innerText = Math.floor(result.duration / 1000);
        document.getElementById('trackImage').src = result.image;
        document.getElementById('downloadLink').href = result.download;

        // Fade in the result container
        const resultContainer = document.getElementById('result');
        resultContainer.style.display = 'block';
        setTimeout(() => {
            resultContainer.style.opacity = 1; // Fade in
        }, 50); // Slight delay for smoother effect

        // Fetch a random fun fact
        fetchRandomFact();
    } catch (error) {
        notification.innerText = 'Error fetching data. Please try again.';
    } finally {
        document.getElementById('loading').style.display = 'none';
    }
}

async function fetchRandomFact() {
    const randomFactUrl = 'https://uselessfacts.jsph.pl/api/v2/facts/random';
    try {
        const response = await fetch(randomFactUrl);
        const data = await response.json();

        const randomFactElement = document.getElementById('randomFact');
        randomFactElement.innerText = data.text;
        randomFactElement.style.display = 'block';

        // Fade in the random fact
        setTimeout(() => {
            randomFactElement.style.opacity = 1.0; // Fade in
        }, 90); // Slight delay for smoother effect
    } catch (error) {
        console.error('Error fetching random fact:', error);
    }
}

// Handle button fade out
const downloadButton = document.getElementById('downloadButton');
downloadButton.addEventListener('click', () => {
    downloadButton.style.opacity = 0.5; // Fade out button
    setTimeout(() => {
        downloadButton.style.opacity = 1; // Fade back in
    }, 500); // Duration of fade out
});

function updateDateTime() {
    const dateTimeElement = document.getElementById('date-time');
    const now = new Date();
    dateTimeElement.innerText = now.toLocaleString();
}

setInterval(updateDateTime, 1000);
