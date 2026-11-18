
const cover = document.getElementById("cover");
const chapterScreen = document.getElementById("chapterScreen");
const galleryScreen = document.getElementById("galleryScreen");
const endingScreen = document.getElementById("endingScreen");

const startButton = document.getElementById("startButton");
const chapterNumber = document.getElementById("chapterNumber");
const chapterText = document.getElementById("chapterText");

const mediaContainer = document.getElementById("mediaContainer");
const nextButton = document.getElementById("nextButton");
const previousButton = document.getElementById("previousButton");
const pauseButton = document.getElementById("pauseButton");
const progressBar = document.getElementById("progressBar");

let currentItem = 0;
let currentChapter = 0;
let isPaused = false;
let slideTimer = null;

const IMAGE_DURATION = 7000;

function showScreen(screen) {
    [cover, chapterScreen, galleryScreen, endingScreen]
        .forEach(item => item.classList.remove("active"));

    screen.classList.add("active");
}

function startJourney() {
    currentChapter = 0;
    showChapter();
}

function showChapter() {
    if (currentChapter >= chapters.length) {
        showEnding();
        return;
    }

    const chapter = chapters[currentChapter];

    chapterNumber.textContent = chapter.number;
    chapterText.textContent = chapter.text;

    showScreen(chapterScreen);

    setTimeout(() => {
        if (chapterScreen.classList.contains("active")) {
            currentItem = getChapterStart(currentChapter);
            showGalleryItem();
        }
    }, 3500);
}

function getChapterStart(chapterIndex) {
    if (galleryItems.length === 0) return 0;

    const itemsPerChapter = Math.ceil(
        galleryItems.length / chapters.length
    );

    return Math.min(
        chapterIndex * itemsPerChapter,
        galleryItems.length - 1
    );
}

function showGalleryItem() {
    clearTimeout(slideTimer);

    if (galleryItems.length === 0) {
        showScreen(galleryScreen);
        mediaContainer.innerHTML = `
            <div class="media-placeholder">
                <p>Agrega tus fotografías y videos en gallery.js</p>
            </div>
        `;
        return;
    }

    if (currentItem >= galleryItems.length) {
        currentChapter++;
        showChapter();
        return;
    }

    const item = galleryItems[currentItem];

    showScreen(galleryScreen);

    if (item.type === "video") {
        mediaContainer.innerHTML = `
            <video autoplay playsinline controls>
                <source src="${item.src}" type="video/mp4">
                Tu navegador no puede reproducir este video.
            </video>
        `;

        const video = mediaContainer.querySelector("video");

        video.addEventListener("ended", nextItem);
    } else {
        mediaContainer.innerHTML = `
            <img src="${item.src}" alt="Recuerdo de Mecatrónica">
        `;

        if (!isPaused) {
            slideTimer = setTimeout(nextItem, IMAGE_DURATION);
        }
    }

    updateProgress();
}

function nextItem() {
    clearTimeout(slideTimer);

    currentItem++;
    showGalleryItem();
}

function previousItem() {
    clearTimeout(slideTimer);

    if (currentItem > 0) {
        currentItem--;
        showGalleryItem();
    }
}

function togglePause() {
    isPaused = !isPaused;

    pauseButton.textContent = isPaused ? "▶" : "II";

    const video = mediaContainer.querySelector("video");

    if (video) {
        if (isPaused) {
            video.pause();
        } else {
            video.play();
        }
    } else if (galleryScreen.classList.contains("active")) {
        clearTimeout(slideTimer);

        if (!isPaused && galleryItems.length > 0) {
            slideTimer = setTimeout(nextItem, IMAGE_DURATION);
        }
    }
}

function updateProgress() {
    if (galleryItems.length === 0) {
        progressBar.style.width = "0%";
        return;
    }

    const percentage = ((currentItem + 1) / galleryItems.length) * 100;
    progressBar.style.width = `${percentage}%`;
}

function showEnding() {
    clearTimeout(slideTimer);
    showScreen(endingScreen);
}

startButton.addEventListener("click", startJourney);
nextButton.addEventListener("click", nextItem);
previousButton.addEventListener("click", previousItem);
pauseButton.addEventListener("click", togglePause);
