import Blob from "./Blob.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointer } from "@fortawesome/free-solid-svg-icons";

export default function Standard() {
  return (
    <div className="section-container" id="web-development-design">
      <div className="section-content">
        <h2 className="section-title">Web Development & Design</h2>
        <p>
          As a self-taught developer I have developed a few sites primarily focusing on React, including a one-pager with a form that utilizes BaaS, personal portfolios and
          am also designing and setting up an e-commerce site to be integrated with a headless CMS.
        </p>
      </div>
      <Blob />
      <FontAwesomeIcon icon={faHandPointer} className="interact r fa-bounce" />
    </div>
  );
}
