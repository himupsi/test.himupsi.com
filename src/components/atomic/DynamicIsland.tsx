import { FC, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from 'recoil';
import { isInitializedAtom, userInfoAtom, isFirstTimeAtom } from '../../states/atom';

const style: React.CSSProperties  = {
  backgroundColor: '#bbb',
  height: '20px',
  width: '0', 
  borderRadius: '11px',
  color: 'white',
  boxShadow: '0 2px 4px rgba(0,0,0, 0.2)',
  justifySelf: 'center',
  transition: 'width .1s linear',
  display: 'flex',
  padding: '0 10px',
  fontSize: '15px',
  lineHeight: '20px',
  cursor: 'pointer'
}

const hoverStyle: React.CSSProperties  = {
  backgroundColor: '#555',
  width: '40px'
}

const DynamicIsland: FC = () => {
  const [ isInitialized, setIsInitialized] = useRecoilState(isInitializedAtom);
  const [ isFirstTime, setIsFistTime] = useRecoilState(isFirstTimeAtom);

  const [ userInfo, setUserInfo] = useRecoilState(userInfoAtom);

  const [isHover, setIsHover] = useState(false);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);

  const goToLink = () => {
    window.open('https://github.com/himupsi?tab=repositories', '_blank')
  }

  const clearSetTimeout = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setTimeoutId(null);
  }


  const hello = () => {


    if (document.visibilityState !== 'visible') {
      clearSetTimeout();
      return;
    };
    setIsHover(false);
    setTimeoutId(setTimeout(() => {
      setIsHover(true);
      setTimeoutId(setTimeout(() => {
        setIsHover(false);
        clearSetTimeout();
      }, 350));
    }, 500));
  }
  useEffect(() => {
    if (!isFirstTime) {
      hello();
      fetch('https://api.himupsi.com/.netlify/functions/userInfo', {
        method: 'GET',
        credentials: 'include'
      }).then(res => {
        setIsInitialized(true);
        if (res.ok) {
          res.json().then(data => {
            setUserInfo(data);
            setTimeout(() => {
              alert(data.name + '님 안녕하세요!');
            }, 1000);
          });
        }
      })
    }
    setIsFistTime(true);
    document.addEventListener('visibilitychange',  hello);
  }, [])

  return <>
      <div className="hus-sticky"
      onClick={goToLink}
        style={{
          ...style,
          ...isHover ? hoverStyle : undefined,
        }}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}>
        {isHover ? 'Hello': '' }
      </div>
  </>;
}

export default DynamicIsland;