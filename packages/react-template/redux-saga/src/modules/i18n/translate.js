import React from 'react';
import counterpart from 'counterpart';
import PropTypes from 'prop-types';

const translate = (
    context,
    content,
    {
        interpolation
    } = {}) => counterpart(`${context}.${content}`, interpolation);

const createRenderTranslate = (
    {
        context,
        content,
        interpolation
    }) => props => (
    <span {...props}>
        {
            translate(
                context,
                content,
                {
                    interpolation
                })
        }
    </span>
);

const Translate = (
    {
        context,
        content,
        interpolation,
        renderTranslate,
        ...rest
    }) => {
    renderTranslate = renderTranslate || createRenderTranslate({
        context,
        content,
        interpolation
    });

    return renderTranslate(rest);
};

Translate.propTypes = {
    context: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    interpolation: PropTypes.object,
    renderTranslate: PropTypes.func
};

const registerTranslations = (language, translations) => counterpart.registerTranslations(language, translations);

const setLocale = locale => counterpart.setLocale(locale);

export {
    Translate,
    translate,
    registerTranslations,
    setLocale
};
