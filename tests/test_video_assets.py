import json
import subprocess
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def probe_codec(path: Path) -> str:
    result = subprocess.run(
        [
            'ffprobe',
            '-v',
            'error',
            '-select_streams',
            'v:0',
            '-show_entries',
            'stream=codec_name',
            '-of',
            'json',
            str(path),
        ],
        check=True,
        capture_output=True,
        text=True,
    )
    data = json.loads(result.stdout)
    return data['streams'][0]['codec_name']


class VideoAssetEncodingTest(unittest.TestCase):
    def test_sample_cross_and_self_videos_use_browser_friendly_h264(self):
        samples = [
            ROOT / 'videos' / 'cross' / 'hdtf12_to_hdtf1_k4_cross_act' / 'comparison.mp4',
            ROOT / 'videos' / 'self' / 'self_hdtf1_k4_cross_act' / 'comparison.mp4',
        ]

        for sample in samples:
            self.assertEqual('h264', probe_codec(sample), f'{sample} should be encoded as H.264')


if __name__ == '__main__':
    unittest.main()
