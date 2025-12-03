let isOpen = false;

async function crackCookie() {
    if (isOpen) return;
    
    const scene = document.getElementById('cookie-scene');
    const messageEl = document.getElementById('message-content');
    const resetBtn = document.getElementById('reset-btn');

    // 1. Fetch fortune (Call the backend)
    messageEl.innerText = "Consulting the spirits...";
    
    try {
        const response = await fetch('/api/generate');
        const data = await response.json();
        messageEl.innerText = data.message;
    } catch (error) {
        // Fallback if API fails or quota runs out
        const fallbacks = [
            "A bird in the hand is worth two in the bush.",
            "You will have a pleasant surprise.",
            "Code is poetry, write it well."
        ];
        messageEl.innerText = fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }

    // 2. Animate
    scene.classList.add('cracked');
    isOpen = true;

    // 3. Show reset button
    setTimeout(() => {
        resetBtn.style.display = 'inline-block';
    }, 1000);
}

function resetCookie() {
    const scene = document.getElementById('cookie-scene');
    const resetBtn = document.getElementById('reset-btn');
    
    scene.classList.remove('cracked');
    resetBtn.style.display = 'none';
    isOpen = false;
}
