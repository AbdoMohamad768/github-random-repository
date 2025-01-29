import { useEffect, useState } from "react";
import Header from "./components/Header";
import RepoHolder from "./components/RepoHolder";

function App() {
  const [language, setLanguage] = useState("Select a Language");
  const [searchQueries, setSearchQueries] = useState([]);
  const [randomRepo, setRandomRepo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [refresher, setRefresher] = useState(false);

  useEffect(
    function () {
      async function getQueries() {
        try {
          const res = await fetch(
            `https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json`
          );
          const data = await res.json();

          setSearchQueries((pre) => [...pre, ...data]);
        } catch (err) {
          alert(err.message);
        }
      }
      getQueries();
    },
    [setSearchQueries]
  );

  useEffect(
    function () {
      refresher;
      async function getRandomRepo() {
        try {
          if (language === "Select a Language" || language === "All Languages")
            return;

          setIsLoading(true);
          setError(false);
          setRandomRepo({});

          const res = await fetch(
            `https://api.github.com/search/repositories?q=${language}`
          );
          const { items } = await res.json();

          setRandomRepo(items[Math.floor(Math.random() * items.length)]);
        } catch (err) {
          setError(true);
        } finally {
          setIsLoading(false);
        }
      }
      getRandomRepo();
    },
    [refresher, language, setRandomRepo, setIsLoading, setError]
  );

  return (
    <div className="border-3 rounded-[10px] p-6 w-[300px]">
      <Header />

      <select
        name="js"
        id="js"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="w-full border-2 rounded-[8px] p-2 mb-3"
      >
        <option value="">Select a Language</option>
        {searchQueries.map((query, i) => (
          <option value={query.value} key={i}>
            {query.title}
          </option>
        ))}
      </select>

      <RepoHolder randomRepo={randomRepo} isLoading={isLoading} error={error} />

      {(Object.keys(randomRepo).length > 0 || error) && (
        <button
          onClick={() => setRefresher((pre) => !pre)}
          className={`flex cursor-pointer justify-center items-center w-full ${
            error ? "bg-red-500" : "bg-black"
          } text-white rounded-[8px] h-10 text-[18px]`}
        >
          {Object.keys(randomRepo).length > 0 ? "Refresh" : "Click to retry"}
        </button>
      )}
    </div>
  );
}

export default App;
