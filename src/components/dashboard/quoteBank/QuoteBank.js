import React from 'react';
import './quoteBank.scss';
import edit from '../../../assets/images/pencil.png';
import bin from '../../../assets/images/delete.png';

function QuoteBank() {
  return (
    <div>
      <div className="action-container">
        <div className="actions">
          <div className="filters">
            <div className="filter">
              <div className="filter-label">Status</div>
              <div className="filter-action">
                <select>
                  <option value="All">All</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
            </div>
            <div className="filter">
              <div className="filter-label">Sorting</div>
              <div className="filter-action">
                <select>
                  <option value="Recent">Recent</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="action-buttons">
          <div className="button success-button" onClick="">
            ADD QUOTE
          </div>
        </div>
      </div>
      <div className="no-of-results-in-display">Showing 1-20 of 357 results</div>
      <div className="quote-table">
        <div className="tr heading">
          <div className="td quote">Quote</div>
          <div className="td author">Author</div>
          <div className="td tags">Tags</div>
          <div className="td status">Status</div>
          <div className="td action" />
        </div>

        <div className="tr-container">
          <div className="tr">
            <div className="td quote">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </div>
            <div className="td author">Neil DeGrasse Tyson Junior</div>
            <div className="td tags">
              <div className="tag-container">
                <span className="tag">Business</span>
                <span className="tag">Motivational</span>
                <span className="tag">Entertainment</span>
              </div>
            </div>
            <div className="td status">
              <select>
                <option value="All">All</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            <div className="td action">
              <img className="mr-5" src={edit} />
              <img src={bin} />
            </div>
          </div>
          <div className="tr">
            <div className="td quote">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </div>
            <div className="td author">Neil DeGrasse Tyson Junior</div>
            <div className="td tags">
              <div className="tag-container">
                <span className="tag">Business</span>
                <span className="tag">Motivational</span>
                <span className="tag">Entertainment</span>
              </div>
            </div>
            <div className="td status">
              <select>
                <option value="All">All</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            <div className="td action">
              <img className="mr-5" src={edit} />
              <img src={bin} />
            </div>
          </div>
          <div className="tr">
            <div className="td quote">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </div>
            <div className="td author">Neil DeGrasse Tyson Junior</div>
            <div className="td tags">
              <div className="tag-container">
                <span className="tag">Business</span>
                <span className="tag">Motivational</span>
                <span className="tag">Entertainment</span>
              </div>
            </div>
            <div className="td status">
              <select>
                <option value="All">All</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            <div className="td action">
              <img className="mr-5" src={edit} />
              <img src={bin} />
            </div>
          </div>
          <div className="tr">
            <div className="td quote">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </div>
            <div className="td author">Neil DeGrasse Tyson Junior</div>
            <div className="td tags">
              <div className="tag-container">
                <span className="tag">Business</span>
                <span className="tag">Motivational</span>
                <span className="tag">Entertainment</span>
              </div>
            </div>
            <div className="td status">
              <select>
                <option value="All">All</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            <div className="td action">
              <img className="mr-5" src={edit} />
              <img src={bin} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuoteBank;
