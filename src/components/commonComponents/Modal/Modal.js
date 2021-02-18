import React  from 'react';
import { useDispatch } from 'react-redux';
import './PopUp.scss';
//import { popUpData } from '../../../redux/actions/popUpAction/PopUpAction';
import { useOnClickOutside } from '../../../helpers/UseClickOutsideHook';

const errorTitles = ['cookie_expired', 'extension_not_installed'];

// eslint-disable-next-line react/prop-types
const Modal = ({ title, description, onClosePopup = () => {} }) => {
  const dispatch = useDispatch();
  const popupRef = React.useRef();

 // const errorData = useSelector(state => state.clientErrorReducer);
 // const findError = useMemo(() => errorData.find(e => e.title === data), [errorData, data]);

  useOnClickOutside(popupRef, onClosePopup);

  const onDeleteClick = () => {

  }

  if (!data) {
    return null;
  }

  return (
    <div className="modal-main-container">
      <div id="pop-up" ref={popupRef} className="modal-container">
        <div className="modal-main-title">
          {title}
        </div>
        <div className="modal-description">{description}</div>
        <div className="buttons-row">
          <button className="button white-button">Close</button>
          <button className="button danger-button" onClick={onDeleteClick}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
