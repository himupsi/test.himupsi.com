import { FC } from "react";
import DynamicIsland from "./DynamicIsland";
import { Link } from 'react-router-dom';
import { visibleRoutes } from "../../Router";
import { useRecoilState } from 'recoil';
import {isInitializedAtom, userInfoAtom } from '../../states/atom';

const style: React.CSSProperties  = {
  flex: "0 0 50px",
  boxShadow: '0 2px 4px rgba(0,0,0, 0.2)',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 20px',
  display: 'flex',
  backgroundColor: 'white',
}

const titleStyle: React.CSSProperties  = {
  fontSize: '30px',
  color: '#999',
  fontWeight: 500,
  flex: '0 0 220px',
  cursor: 'pointer',
}

const menuBarStyle: React.CSSProperties  =  {
  flex: '1 1'
}

const menuStyle: React.CSSProperties = {
  fontSize: '13px',
  flex: '1 1 50px',
  margin: '5px',
  color: '#ccc',
  textDecoration: 'none'
}

const loginStyle: React.CSSProperties = {
  fontSize: '13px',
  flex: '0 0 50px',
  textAlign: 'center',
  margin: '5px',
  color: '#ccc',
  textDecoration: 'none'
}

const activeMenuStyle: React.CSSProperties  = {
  color: '#aaa',
}

const Header: FC = () => {
  const [ userInfo] = useRecoilState(userInfoAtom);
  const [ isInitialized] = useRecoilState(isInitializedAtom);

  return (
    <header style={style}>
      <div onClick={() => { location.href = '/'; }} style={titleStyle}>TEST HIMUPSI</div>
      <div style={menuBarStyle}>
        {
          visibleRoutes.map(route => {
            return <Link to={route.path}
            style={{
              ...menuStyle,
              ...(location.pathname === route.path ? activeMenuStyle : {})
            }} key={route.path}>{route.name}..</Link>
          })
        }
        <Link style={menuStyle} to={`https://not.himupsi.com`}>NOT</Link>
      </div>
      <DynamicIsland />
      {
        isInitialized ? <Link style={loginStyle} to={`https://id.himupsi.com?url=${location.href}`}>Login</Link> : userInfo?.name
      }
      
    </header>
  );
}

export default Header;