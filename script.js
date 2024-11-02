function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('show'); // Toggle sidebar visibility
}

function goBack() {
    window.location.href = 'index.html'; // Redirect to home page
}

async function fetchTrack() {
    const trackQuery = document.getElementById('trackQuery').value.trim();
    const notification = document.getElementById('notification');
    notification.innerText = ''; // Clear previous notifications

    if (!trackQuery) {
        notification.innerText = 'Please enter a Spotify track URL.';
        return;
    }

    const apiUrl = `https://joshweb.click/api/spotify2?q=${encodeURIComponent(trackQuery)}`;
    document.getElementById('loading').style.display = 'block'; // Show loading
    document.getElementById('result').style.display = 'none';

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.error) {
            notification.innerText = data.error;
            document.getElementById('loading').style.display = 'none'; // Hide loading
            return;
        }

        const result = data.result;

        // Update the result fields
        document.getElementById('title').innerText = result.title;
        document.getElementById('type').innerText = result.type;
        document.getElementById('artist').innerText = result.artist;
        document.getElementById('duration').innerText = Math.floor(result.duration / 1000);
        document.getElementById('trackImage').src = result.image;
        document.getElementById('downloadLink').href = result.download_url;

        document.getElementById('loading').style.display = 'none'; // Hide loading
        document.getElementById('result').style.display = 'block';
    } catch (error) {
        document.getElementById('loading').style.display = 'none'; // Hide loading
        notification.innerText = 'Error fetching track data. Please try again.';
    }
}
