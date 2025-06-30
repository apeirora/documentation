import React from 'react';
import clsx from 'clsx';
import type {Props} from '@theme/Footer/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function FooterLayout({
  style,
  links,
  logo,
  copyright,
}: Props): JSX.Element {
  return (
    <footer
      className={clsx('footer', {
        'footer--dark': style === 'dark',
      })}>
      <div className="container container-fluid">

      <div className="apeiro-footer-row">
          <div className="apeiro-footer-col">
            <a href="https://www.sap.com" target="_blank" rel="noreferrer noopener">
              <img src={useBaseUrl("/img/logo_partner_sap.svg")} className="apeiro-footer-img" alt="SAP Logo"></img>
            </a>
          </div>
          <div className="apeiro-footer-col">
            <a href="https://apeirora.eu" target="_blank" rel="noreferrer noopener">
              <img src={useBaseUrl("/img/logo.svg")} className="apeiro-footer-img" alt="ApeiroRA Logo"></img>
            </a>
          </div>
          <div className="apeiro-footer-col">
            <a href="https://neonephos.org" target="_blank" rel="noreferrer noopener">
              <img src={useBaseUrl("/img/neonephos_color.svg")} className="apeiro-footer-img" alt="NeoNephos Logo"></img>
            </a>
          </div>
          <div className="apeiro-footer-col">
            <a href="https://github.com/apeirora" target="_blank" rel="noreferrer noopener">
              <img src={useBaseUrl("/img/icon_github.svg")} className="apeiro-footer-img" alt="GitHub Logo"></img>
            </a>
          </div>
        </div>

        {links}
        {(logo || copyright) && (
          <div className="footer__bottom text--center">
            {logo && <div className="margin-bottom--sm">{logo}</div>}
            {copyright}
          </div>
        )}
      </div>
    </footer>
  );
}
