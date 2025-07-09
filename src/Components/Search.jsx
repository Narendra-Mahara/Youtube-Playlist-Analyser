const Search = () => {
  return (
    <div className="flex justify-center mt-10">
      <form
        className="flex w-full justify-center px-5 sm:px-0"
        onSubmit={(e) => e.preventDefault()}
      >
        <label htmlFor="userInput"></label>
        <input
          className="px-2 border border-r-0 rounded-sm rounded-r-none outline-none sm:w-1/2 w-full "
          type="url"
          name="userInput"
          id="userInput"
          placeholder="Enter YouTube Playlist URL"
        />

        <div>
          <button
            type="submit"
            className="p-2 border border-l-0 border-white cursor-pointer rounded-sm rounded-l-none bg-amber-50 text-black font-bold "
          >
            Analyse
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
