import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

  render() {
    const { content, headingText } = this.props;
    const { className, headingClassName } = this.state;

    return (
      <div className="parent-acc">
        <div className={headingClassName} onClick={this.handleClick}>
          {headingText}
        </div>
        <div className={className}>{content}</div>
      </div>
    );
  }
}

Accordion.propTypes = {
  content: PropTypes.array.isRequired,
  headingText: PropTypes.string.isRequired
};

export default Accordion;
