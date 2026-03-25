function getVisibleCount() {
  if (window.innerWidth <= 760) {
    return 1;
  }
  if (window.innerWidth >= 1480) {
    return 3;
  }
  return 2;
}

function chunkItems(items, chunkSize) {
  const chunks = [];
  for (let index = 0; index < items.length; index += chunkSize) {
    chunks.push(items.slice(index, index + chunkSize));
  }
  return chunks;
}

function pauseVideos(container) {
  container.querySelectorAll('video').forEach(function(video) {
    video.pause();
  });
}

function formatResultNumber(value) {
  return String(value).padStart(2, '0');
}

function createVideoCard(item, itemIndex) {
  const card = document.createElement('article');
  card.className = 'results-card';

  const video = document.createElement('video');
  video.className = 'carousel-video';
  video.controls = true;
  video.playsInline = true;
  video.preload = 'metadata';

  const source = document.createElement('source');
  source.src = item.video;
  source.type = 'video/mp4';
  video.appendChild(source);

  const copy = document.createElement('div');
  copy.className = 'results-card-copy';

  const title = document.createElement('p');
  title.className = 'results-card-title';
  title.textContent = (item.mode === 'cross' ? 'Cross Result ' : 'Self Result ') + formatResultNumber(itemIndex + 1);

  copy.appendChild(title);

  card.appendChild(video);
  card.appendChild(copy);
  return card;
}

function setupShowcase(showcaseElement, items) {
  const track = showcaseElement.querySelector('.results-track');
  const prev = showcaseElement.querySelector('.results-arrow-prev');
  const next = showcaseElement.querySelector('.results-arrow-next');
  const dots = showcaseElement.querySelector('.results-dots');

  if (track === null || prev === null || next === null || dots === null) {
    return;
  }

  const state = {
    index: 0,
    visibleCount: getVisibleCount(),
    pages: [],
  };

  function buildPages() {
    state.visibleCount = getVisibleCount();
    state.pages = chunkItems(items, state.visibleCount);
    state.index = Math.min(state.index, Math.max(state.pages.length - 1, 0));

    track.innerHTML = '';
    dots.innerHTML = '';

    state.pages.forEach(function(pageItems, pageIndex) {
      const page = document.createElement('div');
      page.className = 'results-page';

      pageItems.forEach(function(item, itemIndex) {
        const absoluteIndex = pageIndex * state.visibleCount + itemIndex;
        page.appendChild(createVideoCard(item, absoluteIndex));
      });

      track.appendChild(page);

      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'results-dot';
      dot.setAttribute('aria-label', 'Go to result page ' + (pageIndex + 1));
      dot.addEventListener('click', function() {
        state.index = pageIndex;
        updateCarousel();
      });
      dots.appendChild(dot);
    });
  }

  function updateCarousel() {
    pauseVideos(track);
    track.style.transform = 'translateX(-' + (state.index * 100) + '%)';

    Array.from(dots.children).forEach(function(dot, pageIndex) {
      dot.classList.toggle('is-active', pageIndex === state.index);
    });

    prev.disabled = state.index === 0;
    next.disabled = state.index >= state.pages.length - 1;
  }

  prev.addEventListener('click', function() {
    if (state.index > 0) {
      state.index -= 1;
      updateCarousel();
    }
  });

  next.addEventListener('click', function() {
    if (state.index < state.pages.length - 1) {
      state.index += 1;
      updateCarousel();
    }
  });

  let resizeTimer = null;
  window.addEventListener('resize', function() {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(function() {
      const nextVisibleCount = getVisibleCount();
      if (nextVisibleCount !== state.visibleCount) {
        buildPages();
        updateCarousel();
      }
    }, 80);
  });

  buildPages();
  updateCarousel();
}

function renderVideoLibrary(mediaLibrary) {
  const showcases = document.querySelectorAll('[data-carousel-mode]');
  showcases.forEach(function(showcase) {
    const mode = showcase.getAttribute('data-carousel-mode');
    setupShowcase(showcase, mediaLibrary.collections[mode] || []);
  });
}

function setupBibtexCopy() {
  const button = document.getElementById('copy-bibtex-btn');
  const bibtex = document.getElementById('bibtex-code');
  if (button === null || bibtex === null) {
    return;
  }

  if (bibtex.textContent.trim() === '') {
    button.hidden = true;
    return;
  }

  function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }

  function setCopiedState() {
    const originalText = button.textContent;
    button.textContent = 'Copied';
    button.classList.add('is-copied');
    window.setTimeout(function() {
      button.textContent = originalText;
      button.classList.remove('is-copied');
    }, 1600);
  }

  button.addEventListener('click', function() {
    const text = bibtex.textContent;
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      navigator.clipboard.writeText(text).then(setCopiedState).catch(function() {
        fallbackCopy(text);
        setCopiedState();
      });
      return;
    }

    fallbackCopy(text);
    setCopiedState();
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const mediaLibrary = window.CANVAS_MEDIA_LIBRARY;
  if (!mediaLibrary || !mediaLibrary.collections) {
    return;
  }

  renderVideoLibrary(mediaLibrary);
  setupBibtexCopy();
});
