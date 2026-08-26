const playlistData = [
    {
        id: 'fQbBPa0ADvs',
        title: 'Computer Networking Fundamentals Course',
        module: 'PHASE 1: IT FUNDAMENTALS'
    },
    {
        id: '1hvVcEhcbLM',
        title: 'Linux Essentials for Ethical Hackers',
        module: 'PHASE 1: IT FUNDAMENTALS'
    },
    {
        id: 'ug8W0sFiVJo',
        title: 'Hands-On Cybersecurity and Ethical Hacking - Full Course',
        module: 'PHASE 2: SEC FUNDAMENTALS'
    },
    {
        id: 'CEKfFnHgQHw',
        title: 'SOC Analyst L1 Full Course (Day 1)',
        module: 'PHASE 3: BLUE TEAM (DEFENSE)'
    },
    {
        id: '3Kq1MIfTWCE',
        title: 'Ethical Hacking in 12 Hours - The Cyber Mentor',
        module: 'PHASE 4: RED TEAM (OFFENSE)'
    },
    {
        id: 'Gv9IDQ47giY',
        title: 'TryHackMe - Intro to Offensive Security',
        module: 'PHASE 5: PRACTICAL LABS'
    }
];

let player;
let currentIndex = 0;

// This function is globally called by YT IFrame API when ready
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '100%',
        width: '100%',
        videoId: playlistData[currentIndex].id,
        playerVars: {
            'playsinline': 1,
            'rel': 0
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    renderPlaylist();
    updateUI();
    
    // Bind buttons
    document.getElementById('btn-play').addEventListener('click', togglePlay);
    document.getElementById('btn-next').addEventListener('click', playNext);
    document.getElementById('btn-prev').addEventListener('click', playPrev);
}

function onPlayerStateChange(event) {
    const playBtn = document.getElementById('btn-play');
    const statusText = document.getElementById('playing-status');
    
    if (event.data == YT.PlayerState.PLAYING) {
        playBtn.innerText = '[ PAUSE ]';
        statusText.innerText = '> STATUS: EXECUTING_';
    } else if (event.data == YT.PlayerState.PAUSED) {
        playBtn.innerText = '[ PLAY ]';
        statusText.innerText = '> STATUS: HALTED_';
    } else if (event.data == YT.PlayerState.ENDED) {
        playNext();
    }
}

function renderPlaylist() {
    const ul = document.getElementById('playlist');
    ul.innerHTML = '';
    
    playlistData.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'playlist-item';
        if (index === currentIndex) {
            li.classList.add('active');
        }
        
        li.innerHTML = `
            <span class="module-label">${item.module}</span>
            <span class="video-title">${item.title}</span>
        `;
        
        li.addEventListener('click', () => {
            loadVideo(index);
        });
        
        ul.appendChild(li);
    });
}

function updateUI() {
    // Update active class in list
    const items = document.querySelectorAll('.playlist-item');
    items.forEach((item, index) => {
        if (index === currentIndex) {
            item.classList.add('active');
            item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            item.classList.remove('active');
        }
    });

    // Update bottom bar
    const currentVideo = playlistData[currentIndex];
    document.getElementById('track-title').innerText = currentVideo.title;
    
    // Update button states
    document.getElementById('btn-prev').disabled = currentIndex === 0;
    document.getElementById('btn-next').disabled = currentIndex === playlistData.length - 1;
}

function loadVideo(index) {
    currentIndex = index;
    player.loadVideoById(playlistData[currentIndex].id);
    updateUI();
}

function togglePlay() {
    const state = player.getPlayerState();
    if (state === YT.PlayerState.PLAYING) {
        player.pauseVideo();
    } else {
        player.playVideo();
    }
}

function playNext() {
    if (currentIndex < playlistData.length - 1) {
        loadVideo(currentIndex + 1);
    }
}

function playPrev() {
    if (currentIndex > 0) {
        loadVideo(currentIndex - 1);
    }
}