document.addEventListener('DOMContentLoaded', () => {
    const refreshBtn = document.getElementById('refresh-btn');
    const spinner = refreshBtn.querySelector('.spinner');
    const btnText = refreshBtn.querySelector('.btn-text');
    const notesContainer = document.getElementById('notes-container');
    const initialLoader = document.getElementById('initial-loader');
    const errorContainer = document.getElementById('error-container');

    const fetchNotes = async (isRefresh = false) => {
        if (isRefresh) {
            spinner.classList.remove('hidden');
            btnText.textContent = 'Refreshing...';
            refreshBtn.disabled = true;
        } else {
            initialLoader.classList.remove('hidden');
            notesContainer.innerHTML = '';
        }
        
        errorContainer.classList.add('hidden');

        try {
            const response = await fetch('/api/notes');
            const data = await response.json();

            if (data.status === 'success') {
                renderNotes(data.notes);
            } else {
                showError('Failed to fetch release notes: ' + data.message);
            }
        } catch (error) {
            showError('Network error while fetching release notes.');
            console.error(error);
        } finally {
            if (isRefresh) {
                spinner.classList.add('hidden');
                btnText.textContent = 'Refresh';
                refreshBtn.disabled = false;
            } else {
                initialLoader.classList.add('hidden');
            }
        }
    };

    const stripHtml = (html) => {
        const tmp = document.createElement('DIV');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        try {
            return new Date(dateString).toLocaleDateString(undefined, options);
        } catch (e) {
            return dateString;
        }
    };

    const renderNotes = (notes) => {
        notesContainer.innerHTML = '';
        if (!notes || notes.length === 0) {
            notesContainer.innerHTML = '<p class="text-secondary" style="grid-column: 1 / -1; text-align: center;">No release notes found.</p>';
            return;
        }

        notes.forEach((note, index) => {
            const card = document.createElement('div');
            card.className = 'note-card';
            card.style.animationDelay = `${index * 0.05}s`;

            const cleanSummary = stripHtml(note.summary);
            const formattedDate = formatDate(note.published);
            const title = stripHtml(note.title);

            // Construct Tweet text
            const tweetText = encodeURIComponent(`Google BigQuery Update:\n${title}\n\nRead more: ${note.link}`);
            const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;

            card.innerHTML = `
                <div class="note-card-inner">
                    <div class="note-card-front">
                        <div class="note-date">${formattedDate}</div>
                        <h2 class="note-title">${title}</h2>
                        <div class="flip-instruction">Hover to flip &rarr;</div>
                    </div>
                    <div class="note-card-back">
                        <div class="note-summary" title="${cleanSummary}">${cleanSummary}</div>
                        <div class="note-actions">
                            <a href="${note.link}" target="_blank" rel="noopener noreferrer" class="read-more">Read full note &rarr;</a>
                            <a href="${tweetUrl}" target="_blank" rel="noopener noreferrer" class="tweet-btn">
                                <svg viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                </svg>
                                Tweet
                            </a>
                        </div>
                    </div>
                </div>
            `;
            notesContainer.appendChild(card);
        });
    };

    const showError = (msg) => {
        errorContainer.textContent = msg;
        errorContainer.classList.remove('hidden');
    };

    refreshBtn.addEventListener('click', () => fetchNotes(true));

    // Initial load
    fetchNotes();
});
