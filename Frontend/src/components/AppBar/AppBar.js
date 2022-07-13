import React from 'react';
import './AppBar.scss';
import logo from '../../image/logo.png';
import { useSearchParams } from 'react-router-dom';
import { FormatDateToAdd } from '../../utilities/formatDate';


const AppBar = () => {
    const [search, setSearch] = useSearchParams();
    const onClick = () => {
        let currentDate = new Date();
        setSearch({date:FormatDateToAdd(currentDate)});
    };
    return (
        <>
            <div className="navbar-app">
                <button className='logo-btn' onClick={() => onClick()}>
                    <img className='app-logo' src={logo} alt='App-logo'/>
                </button>    
                <div className="app-title">
                    <strong>Sunsama</strong>
                </div> 
            </div>
        </>
    )
}
export default AppBar;