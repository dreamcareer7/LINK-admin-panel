import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Invited from './Invited';
import Subscribed from './Subscribed';

import './subscribers.scss';
import { downloadFile } from '../../../helpers/DownloadHelper';
import SubscriberService from '../../../services/subscribers-services/SubScribersServices';

const Subscriber = () => {
  const { type } = useParams();

  const history = useHistory();
  const [activeComponent, setActiveComponent] = useState(type ?? 'subscribed');
  const onChangeComponent = component => {
    setActiveComponent(component);
    history.push(`/subscribers/${component}`);
  };
  const onAddInvite = () => {
    history.push('/subscribers/invited/addInvited');
  };
  const onDownloadClick = () => {
    if (type === 'subscribed') {
      SubscriberService.downloadSubscriber()
        .then(r => {
          const subscribersData = r.data;
          downloadFile(subscribersData, 'subscribers.csv');
        })
        .catch(e => console.log(e));
    } else if (type === 'invited') {
      SubscriberService.downloadInvitees()
        .then(r => {
          const inviteeData = r.data;
          downloadFile(inviteeData, 'invitees.csv');
        })
        .catch(e => console.log(e));
    }
  };
  return (
    <>
      <div className="subscribed-buttons-row">
        <div className="d-flex">
          <div
            className={activeComponent === 'subscribed' ? 'sub-button active-menu' : 'sub-button'}
            onClick={() => onChangeComponent('subscribed')}
          >
            Subscribed
          </div>
          <div
            className={activeComponent === 'invited' ? 'sub-button active-menu' : 'sub-button'}
            onClick={() => onChangeComponent('invited')}
          >
            Invited
          </div>
        </div>
        <div className="d-flex">
          {activeComponent !== 'subscribed' && (
            <button
              type="button"
              className="button success-button mr-10"
              onClick={() => onAddInvite()}
            >
              ADD
            </button>
          )}
          <button type="button" className="button primary-button" onClick={onDownloadClick}>
            DOWNLOAD
          </button>
        </div>
      </div>
      <div className="">{activeComponent === 'subscribed' ? <Subscribed /> : <Invited />}</div>
    </>
  );
};

export default Subscriber;
