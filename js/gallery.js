
const chapters = [
    {
        number: "CAPÍTULO 01",
        text: "Todo comenzó aquí...",
        media: [
            { type: "image", src: "assets/fotos/01-inicios/ft_001.jpg" }
        ]
    },

    {
        number: "CAPÍTULO 02",
        text: "Entre proyectos, retos y aprendizajes.",
        media: [
            { type: "image", src: "assets/fotos/03-proyectos/ft_002.jpg" },

            { type: "video", src: "assets/videos/02-proyectos/video-001.mp4" },
            { type: "video", src: "assets/videos/02-proyectos/video-002.mp4" },
            { type: "video", src: "assets/videos/02-proyectos/video-003.mp4" }
        ]
    },

    {
        number: "CAPÍTULO 03",
        text: "Porque no todo podía ser trabajo.",
        media: [
            { type: "image", src: "assets/fotos/04-momentos-divertidos/ft_003.jpg" },
            { type: "image", src: "assets/fotos/04-momentos-divertidos/ft_004.jpg" },
            { type: "image", src: "assets/fotos/04-momentos-divertidos/ft_005.jpg" },
            { type: "image", src: "assets/fotos/04-momentos-divertidos/ft_006.jpg" },
            { type: "image", src: "assets/fotos/04-momentos-divertidos/ft_007.jpg" },
            { type: "image", src: "assets/fotos/04-momentos-divertidos/ft_008.jpg" },
            { type: "image", src: "assets/fotos/04-momentos-divertidos/ft_009.jpg" },
            { type: "image", src: "assets/fotos/04-momentos-divertidos/ft_010.jpg" },
            { type: "image", src: "assets/fotos/04-momentos-divertidos/ft_011.jpg" }
        ]
    },

    {
        number: "CAPÍTULO 04",
        text: "Personas que hicieron especial cada día.",
        media: [
            { type: "image", src: "assets/fotos/05-companeros/ft_012.jpg" },
            { type: "image", src: "assets/fotos/05-companeros/ft_013.jpg" },
            { type: "image", src: "assets/fotos/05-companeros/ft_014.jpg" },
            { type: "image", src: "assets/fotos/05-companeros/ft_015.jpg" },
            { type: "image", src: "assets/fotos/05-companeros/ft_016.jpg" },
            { type: "image", src: "assets/fotos/05-companeros/ft_017.jpg" },
            { type: "image", src: "assets/fotos/05-companeros/ft_018.jpg" },
            { type: "image", src: "assets/fotos/05-companeros/ft_019.jpg" },
            { type: "image", src: "assets/fotos/05-companeros/ft_020.jpg" }
        ]
    },

    {
        number: "CAPÍTULO 05",
        text: "Y algunos momentos merecen volver a vivirse.",
        media: [
            { type: "image", src: "assets/fotos/06-despedida/ft_021.jpg" },
            { type: "image", src: "assets/fotos/06-despedida/ft_022.jpg" },
            { type: "video", src: "assets/videos/04-especiales/video-004.mp4" }
        ]
    }
];

// Construye una sola secuencia respetando el orden de los capítulos.
function buildPresentation() {
    return chapters.flatMap(chapter =>
        chapter.media.map(item => ({
            ...item,
            chapterNumber: chapter.number,
            chapterText: chapter.text
        }))
    );
}
