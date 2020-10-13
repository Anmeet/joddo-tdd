import checkPropTypes from 'check-prop-types';
/** Return node(s) with the given data-test attribute.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper
 * @param {String} val - value of data-test attribute for search
 * @returns {shallowWrapper}
 */

 
export const findByTestAttr = (wrapper, val) => {
   return wrapper.find(`[data-test="${val}"]`);
}

export const checkProps = (component, conformingProps) => {
    const propError = checkPropTypes(
        component.propTypes,
        conformingProps,
        'prop',
        component.name);
        expect(propError).toBeUndefined();
    
}