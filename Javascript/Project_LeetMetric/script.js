const search = document.querySelector("#search-button");
const empty = document.querySelector(".empty");
const c1 = document.querySelector(".carditem.one");
const c2 = document.querySelector(".carditem.two");
const c3 = document.querySelector(".carditem.three");

function setProgress(card, solved, total) {
    const pct = Math.min((solved / total) * 100, 100).toFixed(1);
    card.style.setProperty('--progress', pct + '%');
}

function resetCards() {
    document.getElementById('easy-count').textContent = "—";
    document.getElementById('medium-count').textContent = "—";
    document.getElementById('hard-count').textContent = "—";
    c1.style.setProperty('--progress', '0%');
    c2.style.setProperty('--progress', '0%');
    c3.style.setProperty('--progress', '0%');
}

async function getLeetcode(username) {
    empty.innerHTML = "Fetching...";
    resetCards();

    try {
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
        const response = await fetch(url);
        const data = await response.json();

        console.log("API Response:", data);

        if (data.status === "error") {
            empty.innerHTML = "User not found.";
            return;
        }

        empty.innerHTML = "";

        const easy   = data.easySolved   ?? 0;
        const medium = data.mediumSolved  ?? 0;
        const hard   = data.hardSolved    ?? 0;

        const totalEasy   = data.totalEasy   ?? 873;
        const totalMedium = data.totalMedium ?? 1826;
        const totalHard   = data.totalHard   ?? 810;

        document.getElementById('easy-count').textContent   = easy;
        document.getElementById('medium-count').textContent = medium;
        document.getElementById('hard-count').textContent   = hard;

        setProgress(c1, easy,   totalEasy);
        setProgress(c2, medium, totalMedium);
        setProgress(c3, hard,   totalHard);

    } catch (err) {
        empty.innerHTML = "Network error. Try again.";
        console.error("Fetch error:", err);
    }
}

search.addEventListener('click', () => {
    const input = document.querySelector("#username").value.trim();
    if (!input) {
        empty.innerHTML = "Please enter a username.";
        return;
    }
    getLeetcode(input);
});

document.querySelector("#username").addEventListener('keydown', (e) => {
    if (e.key === 'Enter') search.click();
});