import { FC, useState } from 'react';
import DefaultLayout from '../components/layout/DefaultLayout';
import VisibleObserver from "../components/atomic/VisibleObserver";
import Loading from "../components/atomic/Loading";
import { DEFAULT_HOME_TEXT, HOME_TEXT_VALUE_KEY } from '../Constants';
import Memo from '../components/atomic/Memo';
import { getCieY, getRandomRgb } from '../api/api';

const PAGE_SIZE = 5;


const homeStyle = {
  flex: '1 1',
  maxWidth: '1000px',
  display: 'flex',
}

const Home: FC = () => {

  const homeText = localStorage.getItem(HOME_TEXT_VALUE_KEY) || DEFAULT_HOME_TEXT;

  const [ posts, setPosts ] = useState<any[]>([]);
  const [ isLoading, setIsLoading ] = useState(false);

  const onVisible = () => {
    setIsLoading(true);
    const newPosts: { backgroundColor: string, color: string }[] = [];



    for (let i = 0; i < PAGE_SIZE; i++) {
      const colorRgb = getRandomRgb();
      const cieY = getCieY(colorRgb);

      newPosts.push({
        backgroundColor: `rgb(${colorRgb.r},${colorRgb.g},${colorRgb.b})`,
        color: cieY < 128 ? 'white' : 'black',

      })
    }
    setTimeout(() => {
      setPosts([...posts, ...newPosts]);
      setIsLoading(false);
    }, 100);
  }

  return (
    <DefaultLayout>
      <div style={ homeStyle } className="hus-flex-column">
        힘이 없을까요?
      </div>
    </DefaultLayout>
  );
};

export default Home;
