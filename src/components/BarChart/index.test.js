import React from 'react';
import { shallow } from 'enzyme';
import BarChart from './index';

describe('BarChart', () => {
  let wrapper, mockFCCData;
  beforeEach(() => {
    mockFCCData = [
      {
        "advertiser_business_phone_number": "347-395-0381",
        "caller_id_number": "347-395-0381",
        "city": "Hartland",
        "id": "1511830",
        "issue": "Unwanted Calls",
        "issue_date": "2017-02-17T00:00:00.000",
        "issue_type": "Phone",
        "location_1": {
          "type": "Point",
          "coordinates": [
            -69.511515,
            44.876728
          ]
        },
        "location_1_city": "ME",
        "location_1_zip": "04943",
        "method": "Wireless (cell phone/other mobile device)",
        "state": "ME",
        "ticket_created": "2017-03-17T22:30:50.000",
        "type_of_call_or_messge": "Abandoned Calls",
        "zip": "04943"
      }
    ];
    wrapper = shallow(<BarChart fccData={mockFCCData} />);
  });

  it('should match a snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});