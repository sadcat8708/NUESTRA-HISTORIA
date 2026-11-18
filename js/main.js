
const IMAGE_DURATION = 7000;
const CHAPTER_DURATION = 3000;
const VIDEO_VOLUME = 0.25;

// Pantallas
const coverScreen = document.getElementById("cover");
const chapterScreen = document.getElementById("chapterScreen");
const galleryScreen = document.getElementById("galleryScreen");
const endingScreen = document.getElementById("endingScreen");

// Elementos
const startButton = document.getElementById("startButton");
const mediaContainer = document.getElementById("mediaContainer");
const chapterNumber = document.getElementById("chapterNumber");
const chapterText = document.getElementById("chapterText");

const previousButton = document.getElementById("previousButton");
const nextButton = document.getElementById("nextButton");
const pauseButton = document.getElementById("pauseButton");
const progressBar = document.getElementById("progressBar");

// Presentación
const presentation = buildPresentation();

let currentIndex = 0;
let timer = null;
let currentVideo = null;
let isPaused = false;

/* Cambiar de pantalla */

function showScreen(screen) {

    [
        coverScreen,
        chapterScreen,
        galleryScreen,
        endingScreen
    ].forEach(item => item.classList.remove("active"));

    screen.classList.add("active");
}

/* Icono de pausa */

function updatePauseIcon() {

    pauseButton.textContent = isPaused ? "▶" : "⏸";

    pauseButton.setAttribute(
        "aria-label",
        isPaused ? "Continuar" : "Pausar"
    );
}

/* Precargar siguiente fotografía */

function preloadNextImage() {

    const nextIndex = currentIndex + 1;

    if (nextIndex >= presentation.length) return;

    const nextItem = presentation[nextIndex];

    if (nextItem.type === "image") {

        const preload = new Image();
        preload.src = nextItem.src;

    }
}

/* Mostrar elemento actual */

function showCurrentItem() {

    clearTimeout(timer);

    if (currentVideo) {

        currentVideo.pause();
        currentVideo.removeAttribute("src");
        currentVideo.load();

        currentVideo = null;
    }

    if (currentIndex >= presentation.length) {

        showEnding();
        return;

    }

    isPaused = false;

    updatePauseIcon();
    updateProgress();

    const item = presentation[currentIndex];
    const previousItem = presentation[currentIndex - 1];

    if (
        currentIndex === 0 ||
        item.chapterNumber !== previousItem.chapterNumber
    ) {

        showChapter(item);

    } else {

        renderMedia(item);

    }
}

/* Mostrar capítulo */

function showChapter(item) {

    chapterNumber.textContent = item.chapterNumber;
    chapterText.textContent = item.chapterText;

    showScreen(chapterScreen);

    timer = setTimeout(() => {

        if (!isPaused) {
            renderMedia(presentation[currentIndex]);
        }

    }, CHAPTER_DURATION);
}

/* Mostrar fotografía o vídeo */

function renderMedia(item) {

    clearTimeout(timer);

    mediaContainer.innerHTML = "";

    showScreen(galleryScreen);

    if (item.type === "image") {

        const image = document.createElement("img");

        image.src = item.src;
        image.alt = "Recuerdo de nuestra historia";
        image.decoding = "async";

        image.onload = () => {

            if (!isPaused) {
                timer = setTimeout(nextItem, IMAGE_DURATION);
            }

        };

        image.onerror = () => {

            console.error("No se pudo cargar:", item.src);

            nextItem();

        };

        mediaContainer.appendChild(image);

        preloadNextImage();

    } else if (item.type === "video") {

        const video = document.createElement("video");

        video.src = item.src;
        video.autoplay = true;
        video.controls = true;
        video.playsInline = true;
        video.volume = VIDEO_VOLUME;
        video.preload = "auto";

        video.addEventListener("ended", nextItem);

        video.addEventListener("error", () => {

            console.error("No se pudo reproducir:", item.src);

            nextItem();

        });

        mediaContainer.appendChild(video);

        currentVideo = video;

        video.play().catch(error => {

            console.warn(
                "Reproducción automática bloqueada:",
                error
            );

        });

    }
}

/* Siguiente elemento */

function nextItem() {

    if (currentIndex < presentation.length) {

        currentIndex++;

        showCurrentItem();

    }
}

/* Elemento anterior */

function previousItem() {

    if (currentIndex > 0) {

        currentIndex--;

        showCurrentItem();

    }
}

/* Pausar y continuar */

function togglePause() {

    isPaused = !isPaused;

    if (currentVideo) {

        if (isPaused) {

            currentVideo.pause();

        } else {

            currentVideo.play().catch(() => {});

        }

    } else if (isPaused) {

        clearTimeout(timer);

    } else {

        const currentItem = presentation[currentIndex];

        if (chapterScreen.classList.contains("active")) {

            timer = setTimeout(() => {

                renderMedia(currentItem);

            }, CHAPTER_DURATION);

        } else if (currentItem?.type === "image") {

            timer = setTimeout(nextItem, IMAGE_DURATION);

        }

    }

    updatePauseIcon();
}

/* Barra de progreso */

function updateProgress() {

    const progress =
        (currentIndex / presentation.length) * 100;

    progressBar.style.width = `${progress}%`;
}

/* Pantalla final */

function showEnding() {

    clearTimeout(timer);

    mediaContainer.innerHTML = "";

    progressBar.style.width = "100%";

    if (currentVideo) {

        currentVideo.pause();

        currentVideo = null;

    }

    showScreen(endingScreen);
}

/* Reiniciar presentación */

function restartJourney() {

    currentIndex = 0;

    showCurrentItem();
}

/* Botón comenzar */

startButton.addEventListener("click", () => {

    currentIndex = 0;

    showCurrentItem();

});

/* Controles */

nextButton.addEventListener("click", nextItem);

previousButton.addEventListener("click", previousItem);

pauseButton.addEventListener("click", togglePause);

/* Teclado */

document.addEventListener("keydown", event => {

    if (event.key === "ArrowRight") {
        nextItem();
    }

    if (event.key === "ArrowLeft") {
        previousItem();
    }

    if (event.code === "Space") {

        event.preventDefault();

        togglePause();

    }

});

/* Icono inicial */

updatePauseIcon();
