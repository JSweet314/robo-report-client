import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import questionBlocks from 
  '../../containers/NewComplaintContainer/complaintQuestions';
import SummaryReport from '../../components/SummaryReport';
import * as actions from '../../actions';
import './styles.css';

export const UserComplaintsContainer = (
  { complaints, reportFilter, filterReports }
) => {
  const reports = complaints
    .filter(complaint => {
      switch (reportFilter) {
      case 'UNSUBMITTED':
        return complaint.isSubmitted === false;
      case 'SUBMITTED':
        return complaint.isSubmitted === true;
      default:
        return true;
      }
    })
    .map(complaint => (
      <SummaryReport
        values={complaint}
        questionBlocks={questionBlocks}
        key={`complaint-${complaint.id}`}
      />
    ));

  const handleReportFilter = event => {
    const { value } = event.target;
    filterReports(value);
  };

  const promptSubmision =
    complaints.length > 0 ? (
      <div className='report-filter-select'>
        <label htmlFor="report-filter">Filter by Status: </label>
        <select 
          name="report-filter"
          value={reportFilter}
          onChange={event => handleReportFilter(event)}
        >
          <option value="ALL">ALL</option>
          <option value="UNSUBMITTED">UNSUBMITTED</option>
          <option value="SUBMITTED">SUBMITTED</option>
        </select>
      </div>
    ) : (
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
      {promptSubmision}
      <div className="complaintsContainer__group">{reports}</div>
    </div>
  );
};

export const mapStateToProps = ({ complaints, reportFilter }) => ({
  complaints: complaints,
  reportFilter: reportFilter
});

export const mapDispatchToProps = dispatch => ({
  filterReports: filter => dispatch(actions.filterReports(filter))
});

UserComplaintsContainer.propTypes = {
  complaints: PropTypes.array.isRequired,
  reportFilter: PropTypes.string.isRequired,
  filterReports: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(
  UserComplaintsContainer
);
