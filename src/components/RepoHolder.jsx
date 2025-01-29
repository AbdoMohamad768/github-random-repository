import {
  faCircle,
  faCircleExclamation,
  faCodeFork,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function RepoHolder({ randomRepo, isLoading, error }) {
  return (
    <div
      className={`w-full mb-3 min-h-30 rounded-[8px] flex ${
        Object.keys(randomRepo).length > 0
          ? "flex-col"
          : error
          ? "bg-red-200"
          : "bg-gray-200"
      } ${
        Object.keys(randomRepo).length === 0
          ? "justify-center items-center text-[16px] h-fit"
          : ""
      }`}
    >
      {!isLoading &&
        !error &&
        Object.keys(randomRepo).length === 0 &&
        "Please select a language"}
      {isLoading && "Loading, please wait..."}
      {!error && Object.keys(randomRepo).length > 0 && (
        <>
          <h2 className="mb-0.5 font-semibold">{randomRepo.name}</h2>
          <p className="text-gray-500 mb-1.5 text-[13px] grow">
            {randomRepo.description}
          </p>
          <ul className="flex justify-between text-[12px]">
            <li>
              <FontAwesomeIcon icon={faCircle} className="text-yellow-400" />
              <span className="ml-1.5 text-gray-700">
                {randomRepo.language}
              </span>
            </li>
            <li className=" text-gray-400">
              <FontAwesomeIcon icon={faStar} />
              <span className="ml-1.5">{randomRepo.stargazers_count}</span>
            </li>
            <li className=" text-gray-400">
              <FontAwesomeIcon icon={faCodeFork} />
              <span className="ml-1.5">{randomRepo.forks_count}</span>
            </li>
            <li className=" text-gray-400">
              <FontAwesomeIcon icon={faCircleExclamation} />
              <span className="ml-1.5">{randomRepo.open_issues_count}</span>
            </li>
          </ul>
        </>
      )}
      {error && "Error fetching repositories"}
    </div>
  );
}

export default RepoHolder;
