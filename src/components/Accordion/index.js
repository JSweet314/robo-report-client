import React, { Component } from 'react';
import PropTypes from 'prop-types';
import plusSymbol from '../../assets/images/plus-symbol.svg';
import minusSymbol from '../../assets/images/minus-symbol.svg';
import './styles.css';

class Accordion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      className: 'acc-content acc-close',
      headingClassName: 'acc-heading'
    };
  }

  handleClick = () => {
    const { open } = this.state;
    if (open) {
      this.setState({
        open: false,
        className: 'acc-content acc-close',
        headingClassName: 'acc-heading'
      });
    } else {
      this.setState({
        open: true,
        className: 'acc-content acc-open',
        headingClassName: 'acc-heading clicked'
      });
    }
  };

  handleDupeComplaint = () => {
    const { values, history } = this.props;
    history.push('/newComplaint', values);
  }

  render() {
    const { content, headingText } = this.props;
    const { className, headingClassName, open } = this.state;
    const symbol = open ? minusSymbol : plusSymbol;
    const dupeButtonClass = open ? 'dupe-report' : 'hidden';
    return (
      <div className="parent-acc">
        <div className={headingClassName} onClick={this.handleClick}>
          <div className='report-heading-group'>
            <p className='report-heading'>
              {headingText}
            </p>
            <img className='accordion-symbol' src={symbol} alt="plus/minus"/>
          </div>
        </div>
        <button 
          className={dupeButtonClass}
          onClick={() => this.handleDupeComplaint()}
        >
          Report Again?
        </button>
        <div className={className}>{content}</div>
      </div>
    );
  }
}

Accordion.propTypes = {
  content: PropTypes.array.isRequired,
  headingText: PropTypes.string.isRequired,
  values: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default Accordion;
