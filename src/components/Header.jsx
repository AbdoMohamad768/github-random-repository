import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

function Header() {
  return (
    <div className="flex justify-between items-center gap-2 mb-5">
      <FontAwesomeIcon icon={faGithub} className="text-3xl" />
      <h1 className="text-2xl font-bold">GitHub Repository Finder</h1>
    </div>
  );
}

export default Header;
