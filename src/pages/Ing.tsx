import {FC, useEffect, useState} from "react";
import DefaultLayout from "../components/layout/DefaultLayout";
import { what } from "../api/whatThe";
const ingStyle = {
  flex: '1 1',
  display: 'flex',
  padding: '20px',
  color: '#CCC',
};

const searchResultStyle = {
  marginTop: '10px',
  height: '150px',
  width: '250px',
  backgroundColor: '#ccc',
  overflow: 'auto',
  color: 'black'
};

const textareaStyle = {
  marginTop: '5px',
  width: '90%',
  height: '500px',
};

const Ing: FC = () => {
  const [ searchText, setSearchText ] = useState<string>('');
  const [ searchResult, setSearchResult ] = useState<any>([]);
  const [ searchSource, setSearchSource ] = useState<string>(`[{
  "name": "Lunr",
  "text": "Like Solr, but much smaller, and not as bright."
}, {
  "name": "React",
  "text": "A JavaScript library for building user interfaces."
}, {
  "name": "Lodash",
  "text": "A modern JavaScript utility library delivering modularity, performance & extras."
}, {
  "name": "Vanila",
  "text": "Pure Javascript."
}]`);

  useEffect(() => {
    try {
      const docs: any[] = JSON.parse(searchSource);
      what.isUp();
      docs.forEach(doc => {
        const { name, text } = doc;
        what.toRemember(name, text);
      });
    } catch (e) {
      alert(e);
    }
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value || '');
    setSearchResult(what.the(searchText.trim()));
  };

  const onChangeSource = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSearchSource(e.target.value || '');
  };

  const onApply = () => {
    try {
      what.isUp();
      const docs: any[] = JSON.parse(searchSource);
      docs.forEach(doc => {
        const { name, text } = doc;
        what.toRemember(name, text);
      });
    } catch (e) {
      alert(e);
    }  
  };


  return (
    <DefaultLayout>
      <div style={ingStyle} className="hus-flex-column">
        <div>검색 엔진 활용하기</div>
        
        <div>
          <input type="text" onChange={onChange} value={searchText}  />
        </div>
        <div style={searchResultStyle}>
          {searchResult.map((result: any) => {
            return <div key={result.keyword}>{result.keyword} {result.score}</div>
          })}
        </div>
        <br></br>
        <div>
        <button onClick={onApply}>적용</button>
        </div>
        <div>
        <div>
          <textarea style={textareaStyle} onChange={onChangeSource} value={searchSource}></textarea>
        </div>
      </div>
      </div>

    </DefaultLayout>
  );
}

export default Ing;
