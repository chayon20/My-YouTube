# main.py
from pytube import Playlist
from urllib.parse import urlparse, parse_qs
import json

def get_video_id(url):
    parsed_url = urlparse(url)
    query = parse_qs(parsed_url.query)
    return query.get('v', [None])[0]

def main():
    playlist_url = input("Enter YouTube playlist URL: ").strip()
    try:
        playlist = Playlist(playlist_url)
        playlist._video_regex = r"\"url\":\"(/watch\?v=[\w-]*)"
    except Exception as e:
        print("Error loading playlist:", e)
        return

    video_data = []
    for url in playlist.video_urls:
        vid = get_video_id(url)
        if vid:
            video_data.append({
                "title": "",  # Optionally use YouTube API to get titles
                "video_id": vid
            })

    with open("video_data.json", "w") as f:
        json.dump(video_data, f)

    print("Saved to video_data.json")

if __name__ == "__main__":
    main()
