import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
INDEX_HTML = (ROOT / 'index.html').read_text(encoding='utf-8')
INDEX_CSS = (ROOT / 'static' / 'css' / 'index.css').read_text(encoding='utf-8')


class HomePageContentTest(unittest.TestCase):
    def test_homepage_title_is_canvas_paper(self):
        self.assertIn(
            'CANVAS: Any-Shot Animatable 3D Gaussian Head Avatars from 1--K Images',
            INDEX_HTML,
        )

    def test_homepage_contains_paper_specific_sections(self):
        self.assertIn('Method Highlights', INDEX_HTML)
        self.assertIn('Any-shot inputs', INDEX_HTML)
        self.assertIn('3D Gaussian avatar', INDEX_HTML)

    def test_homepage_uses_canvas_visual_theme(self):
        self.assertIn('--primary-color: #0f766e;', INDEX_CSS)
        self.assertIn('hero-panel', INDEX_CSS)


if __name__ == '__main__':
    unittest.main()
