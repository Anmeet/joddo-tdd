import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr, storeFactory } from '../test/testUtils';
import Input, { UnconnectedInput } from './Input';


const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<Input store={store} />)
    .dive()
    .dive();
  console.log(wrapper.debug());
  return wrapper;
};
setup();
describe('render', () => {
  let wrapper;
  beforeEach(() => {
    const initialState = { success: false };
    wrapper = setup(initialState);
  });
  describe('word has not been guessed', () => {
    test('renders component without error', () => {
      const component = findByTestAttr(wrapper, 'component-input');
      expect(component.length).toBe(1);
    });

    test('renders input box', () => {
      const inputBox = findByTestAttr(wrapper, 'input-box');
      expect(inputBox.length).toBe(1);
    });

    test('renders submit button', () => {
      const submitButton = findByTestAttr(wrapper, 'submit-button');
      expect(submitButton.length).toBe(1);
    });
  });
});

describe('word has been guessed', () => {
  let wrapper;
  beforeEach(() => {
    const initialState = { success: true };
    wrapper = setup(initialState);
  });
  test('renders component without error', () => {
    const component = findByTestAttr(wrapper, 'component-input');
    expect(component.length).toBe(1);
  });

  test('doesnot render input box', () => {
    const inputBox = findByTestAttr(wrapper, 'input-box');
    expect(inputBox.length).toBe(0);
  });

  test('doesnot render submit button', () => {
    const submitButton = findByTestAttr(wrapper, 'submit-button');
    expect(submitButton.length).toBe(0);
  });
});

describe('redux props', () => {
  test('has success piece of state as pros', () => {
    const success = true;
    const wrapper = setup({ success });
    const successProp = wrapper.instance().props.success;
    expect(successProp).toBe(success);
  });

  test('`guessWord` action creator is a function prop', () => {
    const wrapper = setup();
    const guessWordProp = wrapper.instance().props.guessWord;
    expect(guessWordProp).toBeInstanceOf(Function);
  });
});

describe('`guessWord` action creator call', () => {
  let guessWordMock;
  let wrapper;
  const guessedWord = 'train';
  beforeEach(() => {
    //set up mock for `guessWord`
    guessWordMock = jest.fn();
    const props = {
      guessWord: guessWordMock,
    };
//setup input,with geussWordMock as aprop
    wrapper = shallow(<UnconnectedInput {...props} />);

    // add value to input box
      wrapper.setState({currentGuess: guessedWord});

    //simulate clicked
    const submitButton = findByTestAttr(wrapper, 'submit-button');
    submitButton.simulate('click',{preventDefault(){}});
  });

  test('calls `guessWord` when button is clicked', () => {
    //check to see if mock ran

    const guessWordCallCount = guessWordMock.mock.calls.length;
    expect(guessWordCallCount).toBe(1);
  });

  test('calls `guessWord with input value as argument`', () => {
      const guessWordArg = guessWordMock.mock.calls[0][0]
      expect(guessWordArg).toBe(guessedWord);
  })
});
