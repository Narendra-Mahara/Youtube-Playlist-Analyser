import axios from "axios";
import { useState } from "react";

// Converts ISO 8601 duration string (e.g. PT1H2M3S) to total seconds
const parseISODuration = (isoDuration) => {
  const matches = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  const hours = parseInt(matches?.[1] || 0, 10);
  const minutes = parseInt(matches?.[2] || 0, 10);
  const seconds = parseInt(matches?.[3] || 0, 10);
  return hours * 3600 + minutes * 60 + seconds;
};

// Formats seconds as "Hh Mm Ss" string
const formatDuration = (seconds) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h}h ${m}m ${s}s`;
};

const Search = () => {
  // State for user input URL
  const [url, setUrl] = useState("");
  // State for input validation
  const [isUrlValid, setIsUrlValid] = useState(true);
  // State for fetched video items
  const [videos, setVideos] = useState([]);
  // State to indicate if data has been fetched
  const [fetched, setFetched] = useState(false);
  // State for loading indicator
  const [fetching, setFetching] = useState(false);
  // State for total number of videos
  const [totalVideos, setTotalVideos] = useState(0);
  // State for total playlist duration (formatted)
  const [length, setLength] = useState("");

  // Handles form submission and triggers data fetch
  const handleSubmit = () => {
    setVideos([]);
    setFetching(true);
    // Extract playlist ID from URL
    let extractedDetails = url.match(/[?&]list=([a-zA-Z0-9_-]+)/);
    if (!extractedDetails) {
      setIsUrlValid(false);
      setFetching(false);
    } else {
      setIsUrlValid(true);
      let playListId = extractedDetails?.[1];
      fetchData(playListId);
    }
  };

  // Fetches playlist and video details from YouTube API
  const fetchData = async (playListId) => {
    try {
      // Fetch playlist items (videos)
      let response = await axios.get(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playListId}&maxResults=50&key=${
          import.meta.env.VITE_API_KEY
        }`
      );
      setVideos(response.data.items);
      setTotalVideos(response.data.pageInfo.totalResults);
      // Extract video IDs from playlist items
      let id = response.data.items.map(
        (video) => video.snippet.resourceId?.videoId || ""
      );
      setFetched(true);
      // Fetch video details (including duration)
      let res = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${id.join(
          ","
        )}&key=${import.meta.env.VITE_API_KEY}`
      );

      // Extract ISO 8601 duration strings from video details
      let durationIds = res.data.items.map(
        (detail) => detail.contentDetails.duration
      );

      // Calculate total duration in seconds
      const totalSeconds = durationIds.reduce(
        (sum, code) => sum + parseISODuration(code),
        0
      );
      // Format and set total duration
      setLength(formatDuration(totalSeconds));
    } catch (error) {
      // Handle errors and reset states
      setIsUrlValid(false);
      setVideos([]);
      setTotalVideos(0);
      setLength("");
      setFetched(false);
    } finally {
      // Always reset loading and input
      setFetching(false);
      setUrl("");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-10">
      {/* Search form for YouTube playlist URL */}
      <form
        className="flex w-full justify-center px-5 sm:px-0"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <label htmlFor="userInput"></label>
        <input
          className={`px-2 border border-r-0 rounded-sm rounded-r-none outline-none sm:w-1/2 w-full ${
            !isUrlValid ? "border border-red-600" : ""
          } `}
          autoComplete="off"
          type="url"
          name="userInput"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
          id="userInput"
          placeholder="Enter YouTube Playlist URL"
          required
        />

        <div>
          <button
            type="submit"
            className={`p-2 border border-l-0 cursor-pointer rounded-sm rounded-l-none bg-amber-50 text-black font-bold ${
              !isUrlValid
                ? "bg-red-600 border-red-600 text-white"
                : "border-white"
            }`}
          >
            {/* Button text changes based on loading state */}
            {!fetching ? "Analyse" : "Analysing..."}
          </button>
        </div>
      </form>
      {/* Show error message if URL is invalid */}
      {!isUrlValid ? (
        <div className="text-red-600">
          <p>Enter a valid YouTube Playlist URL</p>
        </div>
      ) : (
        ""
      )}

      {/* Display playlist analysis results if fetched */}
      {fetched ? (
        <div className=" text-white w-full flex flex-col items-center p-5 gap-5">
          <div>
            {/* Show total videos and total duration */}
            <p>Total Videos: {totalVideos}</p>
            <p>Total duration: {length}</p>
          </div>
          {/* Render each video card */}
          {videos.map((video, index) => {
            const videoId = video.snippet.resourceId?.videoId || index;
            return (
              <div key={videoId} className="w-full">
                {/* Desktop view */}
                <a
                  href={`https://www.youtube.com/watch?v=${videoId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full"
                >
                  <div className="hidden sm:flex border rounded-sm p-2 gap-5">
                    <img
                      className="h-[100px]"
                      src={video.snippet.thumbnails.high.url}
                      alt="thumbnail"
                    />
                    <div>
                      <h1 className="text-lg font-bold pt-2">
                        {video.snippet.title}
                      </h1>
                      <p className="text-gray-400">
                        {video.snippet.description.slice(0, 300)}...
                      </p>
                    </div>
                  </div>
                </a>
                {/* Mobile view */}
                <div className="sm:hidden flex flex-col p-2 border rounded-sm gap-5">
                  <a
                    href={`https://www.youtube.com/watch?v=${videoId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full"
                  >
                    <div className="flex gap-5">
                      <img
                        className="h-[100px]"
                        src={video.snippet.thumbnails.high.url}
                        alt="thumbnail"
                      />
                      <h1 className="text-sm font-bold pt-2">
                        {video.snippet.title}
                      </h1>
                    </div>
                  </a>
                  <div>
                    <p className="text-gray-400 text-sm">
                      {video.snippet.description.slice(0, 300)}...
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Search;
