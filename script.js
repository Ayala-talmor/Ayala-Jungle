// Try to play welcome sound on page load
window.addEventListener('DOMContentLoaded', () => {
    const welcome = new Audio('sounds/Welcome.mp3');

    welcome.play().catch(() => {
        // If autoplay is blocked, show message with manual play link
        const message = document.createElement('div');
        message.innerHTML = `
            <p style="color: white; background-color: #d32f2f; padding: 10px; border-radius: 8px;">
                Your browser blocked automatic sound playback.<br>
                <a href="#" id="play-welcome" style="color: #fff; text-decoration: underline;">
                    Click here to play background music
                </a>
            </p>
        `;
        message.style.position = 'fixed';
        message.style.top = '10px';
        message.style.left = '10px';
        message.style.zIndex = '1000';

        document.body.appendChild(message);

        const playLink = document.getElementById('play-welcome');
        playLink.addEventListener('click', (e) => {
            e.preventDefault();
            welcome.play();
            message.remove();
        });
    });
});

// Select all animal buttons
const buttons = document.querySelectorAll('.animal');

// Add click event to each button
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const animalClass = button.classList[1]; // second class is the animal name
        playSound(animalClass);
        animateButton(button);
    });
});

// Handle keyboard press
document.addEventListener('keydown', event => {
    const key = normalizeKey(event.key); // convert Hebrew to English if needed
    const button = document.querySelector(`.${key}.animal`);
    if (button) {
        const animalClass = button.classList[1];
        playSound(animalClass);
        animateButton(button);
    } else {
        // Play error sound if key is not assigned to an animal
        const wrong = new Audio('sounds/Wrong.mp3');
        wrong.play();
    }
});

// Play the sound file based on animal name
function playSound(animalName) {
    const soundPath = `sounds/${capitalize(animalName)}.mp3`;
    const audio = new Audio(soundPath);
    audio.play();

    // Limit playback to 2 seconds
    setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;
    }, 2000);
}

// Visual press effect (adds/removes 'pressed' class)
function animateButton(button) {
    button.classList.add('pressed');
    setTimeout(() => {
        button.classList.remove('pressed');
    }, 100);
}

// Capitalize first letter of string (e.g. "lion" → "Lion")
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// [NEW] Custom function to convert only relevant Hebrew keys to English
// This was not taught in class. It prevents errors when typing with Hebrew keyboard layout.
function normalizeKey(key) {
    const hebrewToEnglishMap = {
        'ב': 'c',  // Cat
        'ג': 'd',  // Dog
        'ק': 'e',  // Elephant
        'ל': 'k',  // Donkey
        'ך': 'l',  // Lion
        'צ': 'm',  // Monkey
        'ד': 's',  // Sea Lion
        "'": 'w'   // Cow
    };

    if (hebrewToEnglishMap[key]) {
        return hebrewToEnglishMap[key];
    }

    return key.toLowerCase();
}
