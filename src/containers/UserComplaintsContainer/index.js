import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import questionBlocks from 
  '../../containers/NewComplaintContainer/complaintQuestions';
import SummaryReport from '../../components/SummaryReport';
import './styles.css';

export const UserComplaintsContainer = ({ complaints }) => {
  let reports = complaints.map(complaint => (
    <SummaryReport
      values={complaint}
      questionBlocks={questionBlocks}
      key={`complaint-${complaint.id}`}
    />
  ));

  const promptSubmision =
    complaints.length > 0 ? null : (
      <div className="complaintsContainer__prompt">
        <p className="complaintsContainer__prompt--p">
          You have not submitted any reports.
        </p>
        <p className="complaintsContainer__prompt--p">
          Click the button below to submit a new report.
        </p>
        <Link
          to="/newComplaint"
          className="complaintsContainer__submit-new-complaint-btn"
        >
          Submit New Report
        </Link>
      </div>
    );

  return (
    <div className="complaintsContainer">
      <h3 className="complaintsContainer__heading">My Reports</h3>
      <div className="complaintsContainer__group">{reports}</div>
      {promptSubmision}
    </div>
  );
};

UserComplaintsContainer.propTypes = {
  complaints: PropTypes.array.isRequired
};

export const mapStateToProps = state => ({
  complaints: state.complaints
});

export default connect(mapStateToProps)(UserComplaintsContainer);
