import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './upperHeader.scss';
import search from '../../../assets/images/search.png';
import user from '../../../assets/images/user.jpg';
import downArrow from '../../../assets/images/arrow_down.png';
import logout from '../../../assets/images/logout.svg';
import { logOutUser } from '../../../redux/actions/authActions/AuthActions';
import SubscriberService from '../../../services/subscribers-services/SubScribersServices';
import { useOnClickOutside } from '../../../helpers/UserClickOutsideHook';

/* const array = ['apple', 'banana', 'bapple', 'orange']; */

function UpperHeader() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userDetails = useSelector(({ loggedUser }) => loggedUser);
  const [searchText, setSearchText] = useState('');

  const [dropDown, setDropDown] = useState(false);
  const ref = useRef();
  const [filtered, setFiltered] = useState([]);

  const onSearch = e => {
    const text = e.target.value;
    setSearchText(text);
    if (text && text.trim().length > 0) {
      const data = {
        name: text,
      };
      SubscriberService.searchSubscriber(data).then(r => {
        const searchResult = r.data.data;
        setFiltered(searchResult);
      });
      /* setFiltered(array.filter(f => f.match(e.target.value))); */
    } else {
      setFiltered([]);
    }
  };
  const onDropDownClick = () => {
    setDropDown(!dropDown);
  };
  useOnClickOutside(ref, () => setDropDown(false));

  const onClickSearchedVal = val => {
    history.push(`/subscribers/subscribed/${val}`);
    setFiltered([]);
    setSearchText('');
  };
  const onLogOut = () => {
    dispatch(
      logOutUser(() => {
        history.push('/login');
      })
    );
  };
  return (
    <div className="upper-header-block">
      <div className="upper-header--rounded-block search-block">
        <input placeholder="Search Subscriber" value={searchText} onChange={onSearch} />
        <button type="button">
          <div className="down-arrow">
            <img src={search} />{' '}
            <div className="search-area">
              {filtered.map(e => (
                <div className="open-search-area" onClick={() => onClickSearchedVal(e._id)}>
                  {e.firstName} {e.lastName}
                </div>
              ))}
            </div>
          </div>
        </button>
      </div>
      <div className="logout-area" onClick={onDropDownClick}>
        <div className="upper-header--rounded-block" style={{ cursor: 'pointer' }}>
          <img className="user-dp" src={(userDetails && userDetails.profilePic) || user} />
          <label style={{ cursor: 'pointer' }}>{userDetails.firstName}</label>
          <div className="down-arrow">
            <img src={downArrow} onClick={onDropDownClick} />
            {dropDown && (
              <div className="user-dropdown" ref={ref}>
                <div className="dropdown-option" onClick={onLogOut}>
                  <img src={logout} />
                  <span>Logout</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpperHeader;
