import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './upperHeader.scss';
import search from '../../../assets/images/search.png';
import user from '../../../assets/images/dummy-user.jpg';
import downArrow from '../../../assets/images/arrow_down.png';
import logout from '../../../assets/images/logout.svg';
import { logOutUser } from '../../../redux/actions/authActions/AuthActions';
import SubscriberService from '../../../services/subscribers-services/SubScribersServices';
import { getAllSubscribers } from '../../../redux/actions/subscribersAction/SubscribersAction';

/* const array = ['apple', 'banana', 'bapple', 'orange']; */

function UpperHeader() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allSubscribers = useSelector(state => state.subscrberReducer.getAllSub);

  const docs = useMemo(() => (allSubscribers && allSubscribers.data ? allSubscribers.data : []), [
    allSubscribers,
  ]);
  const subScribers = useMemo(() => (docs && docs.docs ? docs.docs : []), [docs]);
  console.log('get all subscriber=>', subScribers);
  useEffect(() => {
    dispatch(getAllSubscribers(1));
  }, []);

  const onSearch = e => {
    /* if (e.target.value && e.target.value.trim().length > 0) {
      setFiltered(array.filter(f => f.match(e.target.value)));
    } else {
      setFiltered([]);
    } */
    const data = {
      name: e.target.value,
    };
    SubscriberService.searchSubscriber(data).then(r => console.log('search res=>', r));
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
        <input placeholder="Search Subscriber" onChange={onSearch} />
        <button type="button">
          <div className="down-arrow">
            <img src={search} />{' '}
            <div className="search-area">
              {subScribers.map(e => (
                <div className="open-search-area">{e.firstName}</div>
              ))}
            </div>
          </div>
        </button>
      </div>
      <div className="logout-area">
        <div className="upper-header--rounded-block">
          <img className="user-dp" src={user} />
          <label>Michelle Obama</label>
          <div className="down-arrow">
            <img src={downArrow} />
            <div className="user-dropdown">
              <div className="dropdown-option" onClick={onLogOut}>
                <img src={logout} />
                <span>Logout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpperHeader;
