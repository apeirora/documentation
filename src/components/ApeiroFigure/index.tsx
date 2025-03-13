import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function ApeiroFigure({src, caption, alt, width, source, sourceLink}) {
  let sourceObj = undefined
  if (sourceLink) {
    sourceObj = <span>{" (Source: "}<Link to={sourceLink}>{source ? source : sourceLink}</Link>{")"}</span>
  } else if (source) {
    sourceObj = <span> (Source: {source})</span>
  }

  return (
  <figure style={{textAlign: 'center', margin: '2rem auto', width: width }}>
    <img src={useBaseUrl(src)} alt={alt}></img>
    <figcaption>{caption}{sourceObj}</figcaption>
  </figure>
  )
};