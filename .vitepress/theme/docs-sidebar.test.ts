import { describe, expect, it, vi } from 'vitest';

vi.mock('vitepress-sidebar', () => ({
  generateSidebar: () => ({
    '/docs/': {
      items: [{ text: 'Scenarios', link: 'showroom/scenarios/index' }]
    }
  })
}));
vi.mock('fs', () => ({
  readFileSync: vi.fn(() => '---\nsidebar_label: Scenarios\n---\n')
}));

import docsSidebar from './docs-sidebar';

describe('scenario overview navigation', () => {
  it('links to the preserved overview route rather than its source index path', () => {
    expect(docsSidebar()[0].link).toBe('/docs/showroom/scenarios');
  });
});
