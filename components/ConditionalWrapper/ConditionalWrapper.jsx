export const ConditionalWrapper = props => {
    const { condition, wrapperOne, wrapperTwo, children } = props;

    return condition ? wrapperOne(children) : wrapperTwo ? wrapperTwo(children) : children;
};
