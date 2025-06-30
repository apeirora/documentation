import Link from '@docusaurus/Link';
import { useVersion } from '@site/src/utils/use-version';
import { useVersionedUrl } from '@site/src/utils/use-versioned-url';
import termsCurrent from '@site/docs/apeiro-terms.json'
import terms202506 from '@site/versioned_docs/version-2025-06/apeiro-terms.json'
import terms202503 from '@site/versioned_docs/version-2025-03/apeiro-terms.json'

const allTerms = {
  // I've tried to load these dynamically based on existing version config
  // but webpack fails to load them even with inline annotations such
  // as `webpackMode: 'eager'`
  // even with inline `import()` calls eventually fail; while they seem to work
  // for hot reload, they fail when statically building the website
  current: termsCurrent,
  '2025-06': terms202506,
  '2025-03': terms202503
}

export default function Term({ children, name }): JSX.Element {
  const { version } = useVersion();
  const terms = allTerms[version]
  if (!terms) {
    throw new Error(`No terms found for version '${version}'`);
  }

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
    <Link to={useVersionedUrl(term.url)} className={
      term.url.toLowerCase().startsWith("https://") ? "apeiro-icon-link" : ""
    }>{children}</Link>
    <div className="term-content">{term.description}</div>
  </abbr>
  );
}