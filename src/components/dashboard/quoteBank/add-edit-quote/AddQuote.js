import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import './add-quote.scss';
import {useDispatch, useSelector} from 'react-redux';
import {addQuote, deleteQuote, updateQuote} from '../../../../redux/actions/authActions/QuoteActions';

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
    if (id) {
      setQuote(selectedQuoteData.quote);
      setQuoteBy(selectedQuoteData.quoteBy);
      setTags(selectedQuoteData.tags.map(e => e.tag).join(','));
      setIsPublished(
        selectedQuoteData && selectedQuoteData.isPublished
          ? selectedQuoteData.isPublished.toString()
          : 'false'
      );
    }
  }, []);
  const discardQuoteChanges = () => {
    setQuote('');
    setQuoteBy('');
    setTags([]);
  };
  const onClickDeleteQuote = () => {
    dispatch(deleteQuote(id));
    history.push('/quoteBank');
  };

  const onClickSaveQuote = async () => {
    const data = { quote, quoteBy, tags: tags.split(',') };
    if (id) {
      data.isPublished = isPublished;
      dispatch(updateQuote(id, data));
    } else {
      dispatch(addQuote(data));
    }
    discardQuoteChanges();
    history.push('/quoteBank');
  };
  const onChangeStatus = e => {
    setIsPublished(e.target.value);
  };
  return (
    <div>
      <div className="breadcrumb common-title">
        <span>quotes </span>
        <span> {!id ? '/add quote' : 'edit quote'}</span>
      </div>
      <div className="add-quote-block">
        <div className="common-title mb-5">Quote</div>
        <textarea
          rows="3"
          className="common-input"
          value={quote}
          onChange={e => setQuote(e.target.value)}
        />
      </div>
      <div className="add-edit-quote-block">
        <div className="common-title mb-5">
          Tags
          <span className="placeholder-font font-600"> (Separated by commas) </span>
        </div>
        <textarea
          rows="1"
          className="common-input"
          value={tags}
          onChange={e => setTags(e.target.value)}
        />
      </div>
      <div className="add-edit-quote-block author-detail">
        <div>
          <div className="common-title mb-5">Author</div>
          <input
            className="common-input"
            placeholder="Enter name"
            value={quoteBy}
            onChange={e => setQuoteBy(e.target.value)}
          />
        </div>
        <div>
          <div className="common-title mb-5">Status</div>
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
      <div className="quote-buttons-row">
        <button
          type="button"
          className="button success-button add-quote-button"
          onClick={onClickSaveQuote}
        >
          SAVE CHANGES
        </button>
        <button
          type="button"
          className="button primary-button add-quote-button"
          onClick={discardQuoteChanges}
        >
          CANCEL
        </button>
        {id && (
          <button
            type="button"
            className="button danger-button add-quote-button"
            onClick={onClickDeleteQuote}
          >
            DELETE QUOTE
          </button>
        )}
      </div>
    </div>
  );
}

export default AddQuote;