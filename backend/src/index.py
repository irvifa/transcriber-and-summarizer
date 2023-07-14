import json

from flask import Flask, abort, request
from flask_cors import CORS

from transcriber import Transcriber

app = Flask(__name__)
CORS(app)

transcriber = Transcriber()


@app.route("/api/transcribe", methods=["POST"])
def get_transcript_from_video_url():
    content_type = request.headers.get("Content-Type")
    if content_type == "application/json":
        request_body = request.json
        video_url = request_body.get("url", None)
        if video_url is None:
            abort(400)
        try:
            transcript = transcriber.transcribe(video_url)
            # transcript = "test"
            return json.dumps({"transcript": transcript})
        except Exception as e:
            print(e)
            abort(500)


if __name__ == "__main__":
    app.run()
