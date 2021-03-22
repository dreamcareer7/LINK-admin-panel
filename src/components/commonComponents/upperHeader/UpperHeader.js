import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './upperHeader.scss';
import search from '../../../assets/images/search.png';
import user from '../../../assets/images/user.jpg';
import updateProfile from '../../../assets/images/gray-user.svg';
import downArrow from '../../../assets/images/arrow_down.png';
import logout from '../../../assets/images/logout.svg';
import { logOutUser } from '../../../redux/actions/authActions/AuthActions';
import SubscriberService from '../../../services/subscribers-services/SubScribersServices';
import { useOnClickOutside } from '../../../helpers/UserClickOutsideHook';

function UpperHeader() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userDetails = useSelector(({ loggedUser }) => loggedUser);
  const [searchText, setSearchText] = useState('');

  const [dropDown, setDropDown] = useState(false);
  const ref = useRef();
  const searchRef = useRef();
  const [searchDropDown,setSearchDropDown] = useState(false);
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
    setSearchDropDown(!searchDropDown)
  };
  const onDropDownClick = () => {
    setDropDown(!dropDown);
  };


  useOnClickOutside(ref, () => setDropDown(false));
  useOnClickOutside(searchRef, ()=>setSearchDropDown(false));

  const onClickSearchedVal = val => {
    history.push(`/subscribers/subscribed/${val}`);
    setFiltered([]);
    setSearchText('');
  };
  const onLogOut = () => {
    dispatch(
      logOutUser(() => {
        history.replace('/login');
      })
    );
  };
  const goToManageProfile = () => {
    history.replace(`/settings/manageAdmin/${userDetails._id}`);
  };
  const [searchStart, setSearchStart] = useState(false);
  const searchBlurEvent = e => {
    setSearchText('');
    e.target.placeholder = 'Search Subscriber';
    setSearchStart(!e);
  };

  return (
    <div className="upper-header-block">
      <div className="upper-header--rounded-block search-block">
        <input
          placeholder="Search Subscriber"
          value={searchText}
          onChange={onSearch}
          onKeyDown={setSearchStart}
          onFocus={e => {
            e.target.placeholder = '';
          }}
          onBlur={searchBlurEvent}
        />
        <div className="search-icon">
          <img src={search} />
          {searchDropDown &&
          <div className="search-area" ref={searchRef}>
            {searchStart && filtered.length===0 && (
                    <div className="open-search-area">No subscriber found</div>
            )}
            {filtered.map(e => (
                    <div className="open-search-area" onClick={() => onClickSearchedVal(e._id)}>
                      {e.firstName} {e.lastName}
                    </div>
            ))}
          </div>
          }
        </div>
      </div>
      <div
        className={`logout-area ${dropDown && 'user-settings-container'}`}
        onClick={onDropDownClick}
      >
        <div className={dropDown && 'user-settings-container'}>
          <div className="upper-header--rounded-block user-settings">
            <img className="user-dp" src={(userDetails && userDetails.profilePic) || user} />
            <label className="user-name">
              {userDetails &&
                `${userDetails?.firstName} ${userDetails.lastName ? userDetails.lastName : ''}`}
            </label>
            <div className="down-arrow">
              <img src={downArrow} onClick={onDropDownClick} />
              {dropDown && (
                <div className="user-dropdown" ref={ref}>
                  <div className="dropdown-option" onClick={goToManageProfile}>
                    <img src={updateProfile} />
                    <span className="menu-text">Update Profile</span>
                  </div>
                  <div className="dropdown-option" onClick={onLogOut}>
                    <img src={logout} />
                    <span className="menu-text">Logout</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpperHeader;
