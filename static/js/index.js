window.HELP_IMPROVE_VIDEOJS = false;

function toggleMoreWorks() {
    const dropdown = document.getElementById('moreWorksDropdown');
    const button = document.querySelector('.more-works-btn');

    if (dropdown === null || button === null) {
        return;
    }

    dropdown.classList.toggle('show');
    button.classList.toggle('active');
}

document.addEventListener('click', function(event) {
    const container = document.querySelector('.more-works-container');
    const dropdown = document.getElementById('moreWorksDropdown');
    const button = document.querySelector('.more-works-btn');

    if (container === null || dropdown === null || button === null) {
        return;
    }

    if (container.contains(event.target) === false) {
        dropdown.classList.remove('show');
        button.classList.remove('active');
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const dropdown = document.getElementById('moreWorksDropdown');
        const button = document.querySelector('.more-works-btn');

        if (dropdown === null || button === null) {
            return;
        }

        dropdown.classList.remove('show');
        button.classList.remove('active');
    }
});

function copyBibTeX() {
    const bibtexElement = document.getElementById('bibtex-code');
    const button = document.querySelector('.copy-bibtex-btn');
    const copyText = button ? button.querySelector('.copy-text') : null;

    if (bibtexElement === null || button === null || copyText === null) {
        return;
    }

    const setCopiedState = function() {
        button.classList.add('copied');
        copyText.textContent = 'Copied';

        setTimeout(function() {
            button.classList.remove('copied');
            copyText.textContent = 'Copy';
        }, 2000);
    };

    navigator.clipboard.writeText(bibtexElement.textContent).then(setCopiedState).catch(function() {
        const textArea = document.createElement('textarea');
        textArea.value = bibtexElement.textContent;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopiedState();
    });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

window.addEventListener('scroll', function() {
    const scrollButton = document.querySelector('.scroll-to-top');

    if (scrollButton === null) {
        return;
    }

    if (window.pageYOffset > 300) {
        scrollButton.classList.add('visible');
    } else {
        scrollButton.classList.remove('visible');
    }
});

function setupVideoCarouselAutoplay() {
    const carouselVideos = document.querySelectorAll('.results-carousel video');

    if (carouselVideos.length === 0 || typeof IntersectionObserver === 'undefined') {
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                video.play().catch(function() {
                    return null;
                });
            } else {
                video.pause();
            }
        });
    }, {
        threshold: 0.5
    });

    carouselVideos.forEach(video => {
        observer.observe(video);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const options = {
        slidesToScroll: 1,
        slidesToShow: 1,
        loop: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
    };

    bulmaCarousel.attach('.carousel', options);
    setupVideoCarouselAutoplay();
});
