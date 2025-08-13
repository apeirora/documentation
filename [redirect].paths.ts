const redirects = [
  // Blogs that were shared on social media before switching to VitePress (i.e. 2025-08-12)
  {
    from: 'blog/2025/03/05/lcm-configuration-installation-reconsidered',
    to: 'blog/2025-03-05-lcm-configuration-installation-reconsidered.md'
  },
  {
    from: 'blog/2025/03/05/lcm-configuration-installation-reconsidered',
    to: 'blog/2025-03-05-lcm-configuration-installation-reconsidered.md'
  },
  {
    from: 'blog/2025/03/25/kcp-multi-tenant-control-planes',
    to: 'blog/2025-03-25-kcp-multi-tenant-control-planes.md'
  },
  {
    from: 'blog/2025/06/02/openbao-namespace-support',
    to: 'blog/2025-06-02-openbao-namespace-support.md'
  },
  {
    from: 'blog/2025/06/20/open-resource-discover-ord-new-standard',
    to: 'blog/2025-06-20-open-resource-discover-ord-new-standard.md'
  },
  {
    from: 'blog/2025/08/07/kubernetes-api-server-and-controller-archetypes',
    to: 'blog/2025-08-07-kubernetes-api-server-and-controller-archetypes.md'
  },
  // Links that were shared on social media before changing directory structure
  {
    from: 'best-practices/digital-twins/controller',
    to: 'docs/best-practices/digital-twins/controller.md'
  }
]

export default {
  paths() {
    const paths = redirects
      .map(({ from, to }) => {
        return {
          params: {
            redirect: from,
            redirectUrlAbsolute: '/' + to.replace('.md', ''),
          }
        }
      })
    return paths
  }
}