import * as React from 'react';
import { shallow } from 'enzyme';
import PaymentsPage from './PaymentsPage';

describe('PaymentsPage', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<PaymentsPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
