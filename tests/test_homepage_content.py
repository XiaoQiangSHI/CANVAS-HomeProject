import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
INDEX_HTML = (ROOT / 'index.html').read_text(encoding='utf-8')
INDEX_CSS = (ROOT / 'static' / 'css' / 'index.css').read_text(encoding='utf-8')
INDEX_JS = (ROOT / 'static' / 'js' / 'index.js').read_text(encoding='utf-8')
MEDIA_MANIFEST = (ROOT / 'static' / 'js' / 'media-manifest.js')
MEDIA_MANIFEST_TEXT = MEDIA_MANIFEST.read_text(encoding='utf-8') if MEDIA_MANIFEST.exists() else ''
FAVICON_SVG = ROOT / 'static' / 'images' / 'favicon.svg'
FAVICON_ICO = ROOT / 'static' / 'images' / 'favicon.ico'


class HomePageContentTest(unittest.TestCase):
    def test_homepage_keeps_canvas_title_and_anonymous_identity(self):
        self.assertIn(
            'CANVAS: Any-Shot Animatable 3D Gaussian Head Avatars from 1--K Images',
            INDEX_HTML,
        )
        self.assertIn('Anonymous Authors', INDEX_HTML)
        self.assertIn('Anonymous Submission', INDEX_HTML)

    def test_homepage_contains_new_editorial_sections(self):
        for text in [
            'Method Overview',
            'Qualitative Figures',
            'Video Library',
            'BibTeX',
            'Cross-reenacted Results',
            'Self-reenacted Results',
        ]:
            self.assertIn(text, INDEX_HTML)

        self.assertNotIn('Project Overview', INDEX_HTML)
        self.assertNotIn('Featured Video Comparisons', INDEX_HTML)

    def test_homepage_references_local_figures_and_video_library(self):
        for asset in [
            'images/CANVAS_METHOD.pdf',
            'images/cross.pdf',
            'images/self.pdf',
            'images/CANVAS_METHOD-preview.png',
            'images/cross-preview.png',
            'images/self-preview.png',
            'static/js/media-manifest.js',
        ]:
            self.assertIn(asset, INDEX_HTML)

    def test_homepage_references_new_favicon_assets(self):
        self.assertTrue(FAVICON_SVG.exists(), 'favicon.svg should exist')
        self.assertTrue(FAVICON_ICO.exists(), 'favicon.ico should exist')
        self.assertIn('static/images/favicon.svg', INDEX_HTML)
        self.assertIn('static/images/favicon.ico', INDEX_HTML)

    def test_homepage_top_navigation_matches_current_sections(self):
        for anchor in [
            '<a href="#method">Method</a>',
            '<a href="#figures">Figures</a>',
            '<a href="#video-cross">Cross</a>',
            '<a href="#video-self">Self</a>',
            '<a href="#bibtex">BibTeX</a>',
        ]:
            self.assertIn(anchor, INDEX_HTML)

        self.assertNotIn('<a href="#video-library">Videos</a>', INDEX_HTML)

    def test_homepage_uses_custom_layout_classes(self):
        for token in [
            '.masthead-grid',
            '.figure-card',
            '.video-library-grid',
            '.centered-hero',
            '.centered-method',
        ]:
            self.assertIn(token, INDEX_CSS)

        self.assertNotIn('library-tabs', INDEX_HTML)
        self.assertNotIn('.library-tabs', INDEX_CSS)

    def test_homepage_compacts_results_into_cross_and_self_showcases(self):
        for text in [
            'Cross-reenacted Results',
            'Self-reenacted Results',
            'Watch selected comparisons in a compact carousel layout.',
        ]:
            self.assertIn(text, INDEX_HTML)

        for token in [
            '.results-showcase',
            '.results-viewport',
            '.results-arrow',
            '.results-dots',
            '.carousel-video',
        ]:
            self.assertIn(token, INDEX_CSS)

    def test_homepage_uses_generic_result_labels_and_empty_bibtex(self):
        self.assertIn('<pre id="bibtex-code"></pre>', INDEX_HTML)
        self.assertIn('Cross Result ', INDEX_JS)
        self.assertIn('Self Result ', INDEX_JS)
        self.assertNotIn('Source ', INDEX_JS)
        self.assertNotIn('Target ', INDEX_JS)
        self.assertNotIn('Identity ', INDEX_JS)

    def test_homepage_uses_wider_shell_and_three_up_video_layout_on_large_screens(self):
        self.assertIn('--shell: min(1440px, calc(100vw - 40px));', INDEX_CSS)
        self.assertIn('window.innerWidth >= 1480', INDEX_JS)
        self.assertIn('return 3;', INDEX_JS)

    def test_homepage_title_uses_wider_measure(self):
        self.assertIn('max-width: 24ch;', INDEX_CSS)
        self.assertNotIn('max-width: 18ch;', INDEX_CSS)

    def test_homepage_hero_removes_shortcut_links(self):
        self.assertNotIn('<div class="action-row">', INDEX_HTML)
        self.assertNotIn('<a class="text-link" href="#figures">Qualitative Figures</a>', INDEX_HTML)
        self.assertNotIn('<a class="text-link" href="#video-library">Video Results</a>', INDEX_HTML)
        self.assertNotIn('Open Method Figure', INDEX_HTML)
        self.assertNotIn('.action-row', INDEX_CSS)

    def test_media_manifest_exposes_cross_and_self_libraries(self):
        self.assertTrue(MEDIA_MANIFEST.exists(), 'media-manifest.js should exist')
        self.assertIn('window.CANVAS_MEDIA_LIBRARY', MEDIA_MANIFEST_TEXT)
        self.assertIn('"cross"', MEDIA_MANIFEST_TEXT)
        self.assertIn('"self"', MEDIA_MANIFEST_TEXT)

    def test_video_library_no_longer_depends_on_deleted_frame_posters(self):
        self.assertNotIn('/frames/', MEDIA_MANIFEST_TEXT)
        self.assertNotIn('poster:', MEDIA_MANIFEST_TEXT)
        self.assertNotIn('video.poster = item.poster;', INDEX_JS)


if __name__ == '__main__':
    unittest.main()
