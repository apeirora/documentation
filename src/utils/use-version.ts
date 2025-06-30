import { useLocation } from '@docusaurus/router';
import versions from '@site/versions.json'

type VersionMetadata = {
  // version name as per docusaurus.config.ts
  version: string
  // direction path on the filesystem (POSIX)
  dir: string
  // server path when file from that version is served
  path: string
}

export function useVersion(): VersionMetadata {
  const { pathname } = useLocation();
  if (pathname.startsWith('/next')) {
    return {
      version: 'current',
      dir: '/docs',
      path: '/next'
    };
  }

  const [ currentVersion, ...previousVersions ] = versions;
  const previousVersionMatch = previousVersions
    .find(version => pathname.startsWith(`/${version}`));
  if (!!previousVersionMatch) {
    return {
      version: previousVersionMatch,
      dir: `/versioned_docs/version-${previousVersionMatch}`,
      path: `/${previousVersionMatch}`
    };
  }

  return {
    version: currentVersion,
    dir: `/versioned_docs/version-${currentVersion}`,
    path: '/'
  }
};