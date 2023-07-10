import os

from transcriber import Transcriber

transcriber = Transcriber()
video_url = "https://www.youtube.com/watch?v=0rAarrB5J8A"
summary = transcriber.summarize(video_url)
print(summary)
