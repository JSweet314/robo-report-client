import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import questionBlocks from 
  '../../containers/NewComplaintContainer/complaintQuestions';
import SummaryReport from '../../components/SummaryReport';
import './styles.css';

export const UserComplaintsContainer = ({ complaints }) => {
  const reports = complaints.map(complaint => (
    <SummaryReport
      values={complaint}
      questionBlocks={questionBlocks}
      key={`complaint-${complaint.id}`}
    />
  ));

  return <div className="complaintsContainer">{reports}</div>;
};

UserComplaintsContainer.propTypes = {
  complaints: PropTypes.array.isRequired
};

export const mapStateToProps = state => ({
  complaints: state.complaints
});

export default connect(mapStateToProps)(UserComplaintsContainer);
 