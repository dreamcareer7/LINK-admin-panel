import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './add-quote.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  addQuote,
  deleteQuote,
  getSingleQuote,
  updateQuote,
} from '../../../../redux/actions/authActions/QuoteActions';
import { errorNotification } from '../../../../constants/Toast';
import Modal from "../../../commonComponents/Modal/Modal";

function AddQuote() {
  const dispatch = useDispatch();
  const history = useHistory();
  const selectedQuoteData = useSelector(({ selectedQuote }) => selectedQuote);
  const [quote, setQuote] = useState('');
  const [tags, setTags] = useState('');
  const [quoteBy, setQuoteBy] = useState('');
  const [isPublished, setIsPublished] = useState('false');
  const { id } = useParams();

  useEffect(() => {
    // for edit
    if (id && selectedQuoteData) {
      setQuote(selectedQuoteData.quote);
      setQuoteBy(selectedQuoteData.quoteBy);
      setTags(selectedQuoteData.tags.map(e => e.tag).join(','));
      setIsPublished(
        selectedQuoteData && selectedQuoteData.isPublished
          ? selectedQuoteData.isPublished.toString()
          : 'false'
      );
    }
  }, [selectedQuoteData]);
  useEffect(() => {
    if (id) {
      dispatch(getSingleQuote(id));
    }
  }, []);

  const discardQuoteChanges = () => {
    setQuote('');
    setQuoteBy('');
    setTags([]);
    history.goBack();
  };

  const onClickSaveQuote = async () => {
    if (quote.toString().trim().length === 0) errorNotification('Please enter a quote');
    else if (tags.length === 0) {
      errorNotification('Please enter a relevant tag');
    } else if (
      tags
        .split(',')
        .filter(
          e =>
            (typeof e === 'string' && e.toString().trim().length === 0) ||
            (e && e.tag && e.tag.toString().trim().length === 0)
        ).length > 0
    ) {
      errorNotification('Could not accept comma before and after tag');
    } else if (quoteBy.toString().trim().length === 0) {
      errorNotification('Please enter an author');
    } else {
      const data = {
        quote: quote.trim(),
        quoteBy: quoteBy.trim(),
        tags: tags.trim().split(','),
        isPublished,
      };
      if (id) {
        // data.isPublished = isPublished;
        dispatch(updateQuote(id, data));
      } else {
        dispatch(addQuote(data));
      }
      discardQuoteChanges();
      history.goBack();
    }
  };
  const onChangeStatus = e => {
    setIsPublished(e.target.value);
  };
  const [isModelOpen, setIsModelOpen] = useState(false);
  const onClickDeleteQuote = () => {
    setIsModelOpen(true);
  };
  const onClosePopup = () => {
    setIsModelOpen(false);
  };
  const onDeleteData = () => {
    setIsModelOpen(false);
    dispatch(deleteQuote(id));
    history.goBack();
  };
  return (
    <div>
      <div className="breadcrumb-custom common-title">
        <span onClick={() => history.goBack()}>quotes&nbsp;</span>
        <span>{!id ? '/ add' : '/ edit'}</span>
      </div>
      <div className="add-quote-block">
        <div className="common-title-black mar-bott-5">Quote</div>
        <textarea
          rows="3"
          placeholder="Enter the text here"
          onFocus={e => {
            e.target.placeholder = '';
          }}
          onBlur={e => {
            e.target.placeholder = 'Enter the text here';
          }}
          className="common-input"
          value={quote}
          onChange={e => setQuote(e.target.value)}
        />
      </div>
      <div className="add-edit-quote-block">
        <div className="common-title-black mar-bott-5">
          Tags
          <span className="common-content"> (Separate by comma) </span>
        </div>
        <input
          rows="1"
          className="common-input"
          placeholder="Enter the tag here"
          onFocus={e => {
            e.target.placeholder = '';
          }}
          onBlur={e => {
            e.target.placeholder = 'Enter the tag here';
          }}
          value={tags}
          onChange={e => setTags(e.target.value)}
        />
      </div>
      <div className="add-edit-quote-block author-detail">
        <div>
          <div className="common-title-black mar-bott-5">Author</div>
          <input
            className="common-input"
            placeholder="Enter their full name"
            value={quoteBy}
            onFocus={e => {
              e.target.placeholder = '';
            }}
            onBlur={e => {
              e.target.placeholder = 'Enter their full name';
            }}
            onChange={e => setQuoteBy(e.target.value)}
          />
        </div>
        <div>
          <div className="common-title-black mar-bott-5">Status</div>
          <select
            className="common-select"
            onChange={onChangeStatus}
            value={isPublished}
            disabled={!id}
          >
            <option value="true">Active</option>
            <option value="false">InActive</option>
          </select>
        </div>
      </div>
      <div className="buttons-row">
        <button
          type="button"
          className="button success-button add-edit-quote-button"
          onClick={onClickSaveQuote}
        >
          {id ? 'SAVE CHANGES' : 'SAVE'}
        </button>
        <button
          type="button"
          className="button primary-button add-edit-quote-button"
          onClick={discardQuoteChanges}
        >
          CANCEL
        </button>
        {id && (
          <button
            type="button"
            className="button danger-button add-edit-quote-button"
            onClick={onClickDeleteQuote}
          >
            DELETE
          </button>
        )}
        {isModelOpen && (
                <Modal
                        description="Are you sure you want to delete this quote?"
                        title="Delete Quote"
                        deleteData={onDeleteData}
                        onClosePopup={onClosePopup}
                />
        )}
      </div>
    </div>
  );
}

export default AddQuote;
