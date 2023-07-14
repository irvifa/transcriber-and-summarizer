import unittest

from transcriber import Transcriber


class TestTranscriber(unittest.TestCase):
    def test_get_video_id(self):
        transcriber = Transcriber()
        self.assertEqual(
            transcriber.get_video_id("https://www.youtube.com/watch?v=something"),
            "something",
        )
