import React from 'react';
import Enzyme,{shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16'
import App from './App';

Enzyme.configure({adapter: new EnzymeAdapter()});

/** @function setup
 * @returns {shallowWrapper}
 */

const setup = () => shallow(<App />);

const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test='${val}']`);

test('renders without crashing', () => {
  
});
