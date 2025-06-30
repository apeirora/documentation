import Link from "@docusaurus/Link";
import { useVersionedUrl } from "@site/src/utils/use-versioned-url";

export default function Journey({ steps }): JSX.Element {
  return (
    <div className="apeiro-journey-wrapper shadow--lw">
      <div className="apeiro-journey-map-container">
        <div className="apeiro-journey-line"></div>
        {steps.map((data, index) => (
          <div className="apeiro-journey-stop-container">
            <div
              className={`apeiro-journey-stop ${
                data.main ? "apeiro-journey-stop-main" : ""
              }`}
            >
              {data.step}
            </div>
            <div className="apeiro-journey-stop-name">
              <Link to={useVersionedUrl(data.url)}>{data.name}</Link>
              <br></br>
              <div className="apeiro-journey-stop-sub">
                {data.text ? (
                  <span>
                    {data.text}
                    <br></br>
                  </span>
                ) : (
                  ""
                )}
                {data.technologies.map((link, index) => (
                  <span>
                    {index == 0 ? "" : ", "}
                    {link.url ? (
                      <Link
                        to={link.url}
                        className={
                          link.url.toLowerCase().startsWith("https://")
                            ? "apeiro-icon-link"
                            : ""
                        }
                      >
                        {link.name}
                      </Link>
                    ) : (
                      link.name
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
