type Relation = {
  keyword: string;
  reference?: string;
  size: number,
  map: Map<symbol, number>;
}

type SearchResult = {
  keyword: string;
  reference?: string;
  score: number
}

const SPECIAL_CHAR_REGEX = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi

class What {
  private tokens = new Map<string, symbol>();
  private relations: Relation[] = [];

  public the = (text: string = '') => {
    const tokens = this.getTokens(text.toLowerCase());
    return this.search(tokens);
  };

  public toRemember = (keywords: string, content: string) => {
    const revisedContent = content.toLowerCase().replace(SPECIAL_CHAR_REGEX, ' ');
    const contentTokens = this.getTokens(revisedContent);
    this.relate(keywords.toLocaleUpperCase(), contentTokens);
  };

  public isUp = () => {
    this.tokens = new Map<string, symbol>();
    this.relations = [];
  };

  private getTokens = (text: string): symbol[] => {
    const words = text.split(' ');
    return words.map(word => this.getToken(word));
  };

  private getToken = (word: string): symbol => {
    const { tokens } = this;
    if (tokens.has(word)) {
      return tokens.get(word) as symbol;
    }
    const token = Symbol();
    tokens.set(word, token);
    return token;
  };

  private relate = (keyword: string, contentTokens: symbol[]) => {
    this.relations.push({
      keyword,
      size: contentTokens.length,
      map: this.getRelationMap(contentTokens)
    });
  }

  private getRelationMap(tokens: symbol[]): Map<symbol, number> {
    const relation = new Map<symbol, number>();
    tokens.forEach(token => {
      const count = relation.get(token) || 0;
      relation.set(token, count + 1);
    });

    return relation;
  }

  private search(tokens: symbol[]) :SearchResult[] {
    const results: SearchResult[] = [];
    this.relations.forEach(relation => {
      const { keyword, map, size } = relation;
      let score = 0;
      for (const token of tokens) {
        const count = map.get(token);
        if (count) {
          score += count;
        }
      }
      if (score > 0) {
        results.push({
          keyword,
          score: score / size
        })
      }
    });
    return results.sort((a, b) => {
      return b.score - a.score;
    });
  }
}

export const what = new What();