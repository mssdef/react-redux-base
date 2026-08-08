import songs from '../songs.json';

describe('songs.json', () => {
  it('exports an array', () => {
    expect(Array.isArray(songs)).toBe(true);
  });

  it('contains at least one song', () => {
    expect(songs.length).toBeGreaterThan(0);
  });

  it('each song has a title and duration', () => {
    songs.forEach(song => {
      expect(typeof song.title).toBe('string');
      expect(song.title.length).toBeGreaterThan(0);
      expect(typeof song.duration).toBe('string');
      expect(song.duration).toMatch(/^\d+:\d{2}$/);
    });
  });

  it('contains the expected songs', () => {
    const titles = songs.map(s => s.title);
    expect(titles).toContain('No Scrubs');
    expect(titles).toContain('Macarena');
    expect(titles).toContain('All Star');
    expect(titles).toContain('I Want it That Way');
  });
});
