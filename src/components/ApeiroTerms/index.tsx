import terms from "@site/terms/apeiro-terms.json";
import Link from '@docusaurus/Link';

export default function Term({ children, name }): JSX.Element {
  const termName = name ? name : typeof children === "string" ? children : "";

  let term = terms[termName.trim()] || terms[termName.toLowerCase().trim()];
  if (!term) {
    throw new Error("Term '" + termName + "' does not exist!");
  }

  if ("alias" in term) {
    term = terms[term.alias.trim()];
    if (!term) {
      throw new Error("Term '" + termName + "' does not exist (via alias)!");
    }
  }

  return (
    <abbr className="term-wrap">
      <Link to={term.url} className={
        term.url.toLowerCase().startsWith("https://") ? "apeiro-icon-link" : ""
      }>{children}</Link>
      <div className="term-content">{term.description}</div>
    </abbr>
  );
}