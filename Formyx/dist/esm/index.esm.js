import require$$0, { useRef, useCallback, useState } from 'react';

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production = {};

/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_production;

function requireReactJsxRuntime_production () {
	if (hasRequiredReactJsxRuntime_production) return reactJsxRuntime_production;
	hasRequiredReactJsxRuntime_production = 1;
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
	  REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
	function jsxProd(type, config, maybeKey) {
	  var key = null;
	  void 0 !== maybeKey && (key = "" + maybeKey);
	  void 0 !== config.key && (key = "" + config.key);
	  if ("key" in config) {
	    maybeKey = {};
	    for (var propName in config)
	      "key" !== propName && (maybeKey[propName] = config[propName]);
	  } else maybeKey = config;
	  config = maybeKey.ref;
	  return {
	    $$typeof: REACT_ELEMENT_TYPE,
	    type: type,
	    key: key,
	    ref: void 0 !== config ? config : null,
	    props: maybeKey
	  };
	}
	reactJsxRuntime_production.Fragment = REACT_FRAGMENT_TYPE;
	reactJsxRuntime_production.jsx = jsxProd;
	reactJsxRuntime_production.jsxs = jsxProd;
	return reactJsxRuntime_production;
}

var reactJsxRuntime_development = {};

/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_development;

function requireReactJsxRuntime_development () {
	if (hasRequiredReactJsxRuntime_development) return reactJsxRuntime_development;
	hasRequiredReactJsxRuntime_development = 1;
	"production" !== process.env.NODE_ENV &&
	  (function () {
	    function getComponentNameFromType(type) {
	      if (null == type) return null;
	      if ("function" === typeof type)
	        return type.$$typeof === REACT_CLIENT_REFERENCE
	          ? null
	          : type.displayName || type.name || null;
	      if ("string" === typeof type) return type;
	      switch (type) {
	        case REACT_FRAGMENT_TYPE:
	          return "Fragment";
	        case REACT_PROFILER_TYPE:
	          return "Profiler";
	        case REACT_STRICT_MODE_TYPE:
	          return "StrictMode";
	        case REACT_SUSPENSE_TYPE:
	          return "Suspense";
	        case REACT_SUSPENSE_LIST_TYPE:
	          return "SuspenseList";
	        case REACT_ACTIVITY_TYPE:
	          return "Activity";
	      }
	      if ("object" === typeof type)
	        switch (
	          ("number" === typeof type.tag &&
	            console.error(
	              "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
	            ),
	          type.$$typeof)
	        ) {
	          case REACT_PORTAL_TYPE:
	            return "Portal";
	          case REACT_CONTEXT_TYPE:
	            return type.displayName || "Context";
	          case REACT_CONSUMER_TYPE:
	            return (type._context.displayName || "Context") + ".Consumer";
	          case REACT_FORWARD_REF_TYPE:
	            var innerType = type.render;
	            type = type.displayName;
	            type ||
	              ((type = innerType.displayName || innerType.name || ""),
	              (type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef"));
	            return type;
	          case REACT_MEMO_TYPE:
	            return (
	              (innerType = type.displayName || null),
	              null !== innerType
	                ? innerType
	                : getComponentNameFromType(type.type) || "Memo"
	            );
	          case REACT_LAZY_TYPE:
	            innerType = type._payload;
	            type = type._init;
	            try {
	              return getComponentNameFromType(type(innerType));
	            } catch (x) {}
	        }
	      return null;
	    }
	    function testStringCoercion(value) {
	      return "" + value;
	    }
	    function checkKeyStringCoercion(value) {
	      try {
	        testStringCoercion(value);
	        var JSCompiler_inline_result = !1;
	      } catch (e) {
	        JSCompiler_inline_result = true;
	      }
	      if (JSCompiler_inline_result) {
	        JSCompiler_inline_result = console;
	        var JSCompiler_temp_const = JSCompiler_inline_result.error;
	        var JSCompiler_inline_result$jscomp$0 =
	          ("function" === typeof Symbol &&
	            Symbol.toStringTag &&
	            value[Symbol.toStringTag]) ||
	          value.constructor.name ||
	          "Object";
	        JSCompiler_temp_const.call(
	          JSCompiler_inline_result,
	          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
	          JSCompiler_inline_result$jscomp$0
	        );
	        return testStringCoercion(value);
	      }
	    }
	    function getTaskName(type) {
	      if (type === REACT_FRAGMENT_TYPE) return "<>";
	      if (
	        "object" === typeof type &&
	        null !== type &&
	        type.$$typeof === REACT_LAZY_TYPE
	      )
	        return "<...>";
	      try {
	        var name = getComponentNameFromType(type);
	        return name ? "<" + name + ">" : "<...>";
	      } catch (x) {
	        return "<...>";
	      }
	    }
	    function getOwner() {
	      var dispatcher = ReactSharedInternals.A;
	      return null === dispatcher ? null : dispatcher.getOwner();
	    }
	    function UnknownOwner() {
	      return Error("react-stack-top-frame");
	    }
	    function hasValidKey(config) {
	      if (hasOwnProperty.call(config, "key")) {
	        var getter = Object.getOwnPropertyDescriptor(config, "key").get;
	        if (getter && getter.isReactWarning) return false;
	      }
	      return void 0 !== config.key;
	    }
	    function defineKeyPropWarningGetter(props, displayName) {
	      function warnAboutAccessingKey() {
	        specialPropKeyWarningShown ||
	          ((specialPropKeyWarningShown = true),
	          console.error(
	            "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
	            displayName
	          ));
	      }
	      warnAboutAccessingKey.isReactWarning = true;
	      Object.defineProperty(props, "key", {
	        get: warnAboutAccessingKey,
	        configurable: true
	      });
	    }
	    function elementRefGetterWithDeprecationWarning() {
	      var componentName = getComponentNameFromType(this.type);
	      didWarnAboutElementRef[componentName] ||
	        ((didWarnAboutElementRef[componentName] = true),
	        console.error(
	          "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
	        ));
	      componentName = this.props.ref;
	      return void 0 !== componentName ? componentName : null;
	    }
	    function ReactElement(type, key, props, owner, debugStack, debugTask) {
	      var refProp = props.ref;
	      type = {
	        $$typeof: REACT_ELEMENT_TYPE,
	        type: type,
	        key: key,
	        props: props,
	        _owner: owner
	      };
	      null !== (void 0 !== refProp ? refProp : null)
	        ? Object.defineProperty(type, "ref", {
	            enumerable: false,
	            get: elementRefGetterWithDeprecationWarning
	          })
	        : Object.defineProperty(type, "ref", { enumerable: false, value: null });
	      type._store = {};
	      Object.defineProperty(type._store, "validated", {
	        configurable: false,
	        enumerable: false,
	        writable: true,
	        value: 0
	      });
	      Object.defineProperty(type, "_debugInfo", {
	        configurable: false,
	        enumerable: false,
	        writable: true,
	        value: null
	      });
	      Object.defineProperty(type, "_debugStack", {
	        configurable: false,
	        enumerable: false,
	        writable: true,
	        value: debugStack
	      });
	      Object.defineProperty(type, "_debugTask", {
	        configurable: false,
	        enumerable: false,
	        writable: true,
	        value: debugTask
	      });
	      Object.freeze && (Object.freeze(type.props), Object.freeze(type));
	      return type;
	    }
	    function jsxDEVImpl(
	      type,
	      config,
	      maybeKey,
	      isStaticChildren,
	      debugStack,
	      debugTask
	    ) {
	      var children = config.children;
	      if (void 0 !== children)
	        if (isStaticChildren)
	          if (isArrayImpl(children)) {
	            for (
	              isStaticChildren = 0;
	              isStaticChildren < children.length;
	              isStaticChildren++
	            )
	              validateChildKeys(children[isStaticChildren]);
	            Object.freeze && Object.freeze(children);
	          } else
	            console.error(
	              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
	            );
	        else validateChildKeys(children);
	      if (hasOwnProperty.call(config, "key")) {
	        children = getComponentNameFromType(type);
	        var keys = Object.keys(config).filter(function (k) {
	          return "key" !== k;
	        });
	        isStaticChildren =
	          0 < keys.length
	            ? "{key: someKey, " + keys.join(": ..., ") + ": ...}"
	            : "{key: someKey}";
	        didWarnAboutKeySpread[children + isStaticChildren] ||
	          ((keys =
	            0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}"),
	          console.error(
	            'A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />',
	            isStaticChildren,
	            children,
	            keys,
	            children
	          ),
	          (didWarnAboutKeySpread[children + isStaticChildren] = true));
	      }
	      children = null;
	      void 0 !== maybeKey &&
	        (checkKeyStringCoercion(maybeKey), (children = "" + maybeKey));
	      hasValidKey(config) &&
	        (checkKeyStringCoercion(config.key), (children = "" + config.key));
	      if ("key" in config) {
	        maybeKey = {};
	        for (var propName in config)
	          "key" !== propName && (maybeKey[propName] = config[propName]);
	      } else maybeKey = config;
	      children &&
	        defineKeyPropWarningGetter(
	          maybeKey,
	          "function" === typeof type
	            ? type.displayName || type.name || "Unknown"
	            : type
	        );
	      return ReactElement(
	        type,
	        children,
	        maybeKey,
	        getOwner(),
	        debugStack,
	        debugTask
	      );
	    }
	    function validateChildKeys(node) {
	      isValidElement(node)
	        ? node._store && (node._store.validated = 1)
	        : "object" === typeof node &&
	          null !== node &&
	          node.$$typeof === REACT_LAZY_TYPE &&
	          ("fulfilled" === node._payload.status
	            ? isValidElement(node._payload.value) &&
	              node._payload.value._store &&
	              (node._payload.value._store.validated = 1)
	            : node._store && (node._store.validated = 1));
	    }
	    function isValidElement(object) {
	      return (
	        "object" === typeof object &&
	        null !== object &&
	        object.$$typeof === REACT_ELEMENT_TYPE
	      );
	    }
	    var React = require$$0,
	      REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
	      REACT_PORTAL_TYPE = Symbol.for("react.portal"),
	      REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"),
	      REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"),
	      REACT_PROFILER_TYPE = Symbol.for("react.profiler"),
	      REACT_CONSUMER_TYPE = Symbol.for("react.consumer"),
	      REACT_CONTEXT_TYPE = Symbol.for("react.context"),
	      REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"),
	      REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"),
	      REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"),
	      REACT_MEMO_TYPE = Symbol.for("react.memo"),
	      REACT_LAZY_TYPE = Symbol.for("react.lazy"),
	      REACT_ACTIVITY_TYPE = Symbol.for("react.activity"),
	      REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"),
	      ReactSharedInternals =
	        React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
	      hasOwnProperty = Object.prototype.hasOwnProperty,
	      isArrayImpl = Array.isArray,
	      createTask = console.createTask
	        ? console.createTask
	        : function () {
	            return null;
	          };
	    React = {
	      react_stack_bottom_frame: function (callStackForError) {
	        return callStackForError();
	      }
	    };
	    var specialPropKeyWarningShown;
	    var didWarnAboutElementRef = {};
	    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(
	      React,
	      UnknownOwner
	    )();
	    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
	    var didWarnAboutKeySpread = {};
	    reactJsxRuntime_development.Fragment = REACT_FRAGMENT_TYPE;
	    reactJsxRuntime_development.jsx = function (type, config, maybeKey) {
	      var trackActualOwner =
	        1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
	      return jsxDEVImpl(
	        type,
	        config,
	        maybeKey,
	        false,
	        trackActualOwner
	          ? Error("react-stack-top-frame")
	          : unknownOwnerDebugStack,
	        trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
	      );
	    };
	    reactJsxRuntime_development.jsxs = function (type, config, maybeKey) {
	      var trackActualOwner =
	        1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
	      return jsxDEVImpl(
	        type,
	        config,
	        maybeKey,
	        true,
	        trackActualOwner
	          ? Error("react-stack-top-frame")
	          : unknownOwnerDebugStack,
	        trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
	      );
	    };
	  })();
	return reactJsxRuntime_development;
}

var hasRequiredJsxRuntime;

function requireJsxRuntime () {
	if (hasRequiredJsxRuntime) return jsxRuntime.exports;
	hasRequiredJsxRuntime = 1;

	if (process.env.NODE_ENV === 'production') {
	  jsxRuntime.exports = requireReactJsxRuntime_production();
	} else {
	  jsxRuntime.exports = requireReactJsxRuntime_development();
	}
	return jsxRuntime.exports;
}

var jsxRuntimeExports = requireJsxRuntime();

const useDebounce = (fn, delay = 1000) => {
    const timeoutId = useRef(null);
    return useCallback((...args) => {
        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
        }
        timeoutId.current = setTimeout(() => {
            fn(...args);
            timeoutId.current = null;
        }, delay);
    }, [fn, delay]);
};

const useThrottle = (fn, delay = 1000) => {
    const lastExecuted = useRef(0);
    const timeoutId = useRef(null);
    return useCallback((...args) => {
        const now = Date.now();
        const timeSinceLastExecution = now - lastExecuted.current;
        if (timeSinceLastExecution >= delay) {
            fn(...args);
            lastExecuted.current = now;
        }
        else {
            if (timeoutId.current) {
                clearTimeout(timeoutId.current);
            }
            timeoutId.current = setTimeout(() => {
                fn(...args);
                lastExecuted.current = Date.now();
                timeoutId.current = null;
            }, delay - timeSinceLastExecution);
        }
    }, [fn, delay]);
};

const InputField = ({ name, type = 'text', label, value, options = [], multiple = false, required = false, error, touched = false, onChange, onBlur, className = '', style, placeholder, disabled = false, readOnly = false, autoFocus = false, autoComplete, min, max, step, pattern, rows = 4, accept, debounce = 300, throttle = 300, validationStrategy = 'debounce', ...props }) => {
    const debouncedValidation = useDebounce((name, value) => {
        onChange(name, value, true);
    }, debounce);
    const throttledValidation = useThrottle((name, value) => {
        onChange(name, value, true);
    }, throttle);
    const handleChange = (event) => {
        let newValue;
        switch (type) {
            case 'checkbox':
                newValue = event.target.checked;
                break;
            case 'file':
                newValue = event.target.files;
                break;
            case 'number':
                newValue = event.target.value === '' ? '' : Number(event.target.value);
                break;
            case 'select':
                if (multiple) {
                    const selectedOptions = Array.from(event.target.selectedOptions);
                    newValue = selectedOptions.map((option) => option.value);
                }
                else {
                    newValue = event.target.value;
                }
                break;
            default:
                newValue = event.target.value;
        }
        onChange(name, newValue, false);
        if (type !== 'checkbox' && type !== 'radio' && type !== 'file') {
            switch (validationStrategy) {
                case 'debounce':
                    debouncedValidation(name, newValue);
                    break;
                case 'throttle':
                    throttledValidation(name, newValue);
                    break;
                case 'immediate':
                    onChange(name, newValue, true);
                    break;
            }
        }
        else {
            onChange(name, newValue, true);
        }
    };
    const handleBlur = () => {
        onBlur(name, true);
        onChange(name, value, true);
    };
    const getInputClassName = () => {
        const baseClass = 'formyx-input';
        const stateClass = error && touched ? 'formyx-input-error' : '';
        return `${baseClass} ${stateClass} ${className}`.trim();
    };
    const renderInput = () => {
        const commonProps = {
            name,
            value: type === 'checkbox' ? undefined : value,
            checked: type === 'checkbox' ? Boolean(value) : undefined,
            onChange: handleChange,
            onBlur: handleBlur,
            className: getInputClassName(),
            style,
            required,
            placeholder,
            disabled,
            readOnly,
            autoFocus,
            autoComplete,
            min,
            max,
            step,
            pattern,
            accept,
            ...props,
        };
        switch (type) {
            case 'textarea':
                return (jsxRuntimeExports.jsx("textarea", { ...commonProps, value: value, rows: rows }));
            case 'select':
                return (jsxRuntimeExports.jsxs("select", { ...commonProps, value: value, multiple: multiple, children: [jsxRuntimeExports.jsx("option", { value: "", children: "Select an option" }), options.map((option, index) => (jsxRuntimeExports.jsx("option", { value: option.value, children: option.label }, index)))] }));
            case 'checkbox':
                return (jsxRuntimeExports.jsx("input", { ...commonProps, type: "checkbox", checked: Boolean(value) }));
            case 'radio':
                return (jsxRuntimeExports.jsx("div", { className: "formyx-radio-group", children: options.map((option, index) => (jsxRuntimeExports.jsxs("label", { className: "formyx-radio-label", children: [jsxRuntimeExports.jsx("input", { type: "radio", name: name, value: option.value, checked: value === option.value, onChange: handleChange, onBlur: handleBlur, className: getInputClassName(), required: required, disabled: disabled }), jsxRuntimeExports.jsx("span", { children: option.label })] }, index))) }));
            case 'file':
                return (jsxRuntimeExports.jsx("input", { ...commonProps, type: "file", multiple: multiple, value: undefined, accept: accept }));
            default:
                return (jsxRuntimeExports.jsx("input", { ...commonProps, type: type, value: value }));
        }
    };
    return (jsxRuntimeExports.jsxs("div", { className: `formyx-field formyx-field-${type}`, children: [label && (jsxRuntimeExports.jsxs("label", { htmlFor: name, className: "formyx-label", children: [label, required && jsxRuntimeExports.jsx("span", { className: "formyx-required", children: "*" })] })), renderInput(), error && touched && jsxRuntimeExports.jsx("div", { className: "formyx-error-message", children: error })] }));
};

const emailValidator = (value) => {
    if (!value) {
        return { isValid: false, message: 'Email is required' };
    }
    const email = value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { isValid: false, message: 'Please enter a valid email address' };
    }
    const commonTypos = [
        /@gmai\.com$/,
        /@gmial\.com$/,
        /@yahhoo\.com$/,
        /@hotmai\.com$/,
        /@outloo\.com$/,
    ];
    for (const typo of commonTypos) {
        if (typo.test(email)) {
            return { isValid: false, message: 'Email domain might have a typo' };
        }
    }
    return { isValid: true, message: '' };
};
const emailValidationRule = {
    validate: emailValidator,
    required: true,
};

const passwordValidator = (value) => {
    if (!value) {
        return 'Password is required';
    }
    const password = value;
    if (password.length < 6) {
        return 'Password must be at least 6 characters';
    }
    if (password.length > 100) {
        return 'Password must be less than 100 characters';
    }
    return undefined;
};
const passwordValidationRule = {
    validate: passwordValidator,
    required: true,
};

const usernameValidator = (value) => {
    if (!value) {
        return 'Username is required';
    }
    const username = value;
    if (username.length < 3) {
        return 'Username must be at least 3 characters';
    }
    if (username.length > 20) {
        return 'Username must be less than 20 characters';
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        return 'Username can only contain letters, numbers, and underscores';
    }
    return undefined;
};
const usernameValidationRule = {
    validate: usernameValidator,
    required: true,
};

const requiredValidator = (value, formData, fieldName) => {
    if (value === undefined || value === null || value === '') {
        return `${fieldName || 'This field'} is required`;
    }
    if (typeof value === 'string' && value.trim() === '') {
        return `${fieldName || 'This field'} is required`;
    }
    if (Array.isArray(value) && value.length === 0) {
        return `${fieldName || 'This field'} is required`;
    }
    return undefined;
};
const createRequiredValidator = (customMessage) => {
    return (value, formData, fieldName) => {
        const result = requiredValidator(value, formData, fieldName);
        if (result && customMessage) {
            return customMessage;
        }
        return result;
    };
};

const phoneValidator = (value) => {
    if (!value) {
        return { isValid: false, message: 'Phone number is required' };
    }
    const phone = value;
    const phoneRegex = /^\+?[\d\s-()]{10,}$/;
    if (!phoneRegex.test(phone)) {
        return { isValid: false, message: 'Please enter a valid phone number' };
    }
    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length < 10) {
        return {
            isValid: false,
            message: 'Phone number must be at least 10 digits',
        };
    }
    return { isValid: true, message: '' };
};
const phoneValidationRule = {
    validate: phoneValidator,
    required: true,
    message: 'Please enter a valid phone number',
};
const urlValidator = (value) => {
    if (!value) {
        return { isValid: false, message: 'URL is required' };
    }
    const url = value;
    try {
        const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
        if (!urlRegex.test(url)) {
            return { isValid: false, message: 'Please enter a valid URL' };
        }
        const testUrl = url.startsWith('http') ? url : `https://${url}`;
        new URL(testUrl);
        return { isValid: true, message: '' };
    }
    catch {
        return { isValid: false, message: 'Please enter a valid URL' };
    }
};
const urlValidationRule = {
    validate: urlValidator,
    required: false,
    message: 'Please enter a valid URL',
};
const creditCardValidator = (value) => {
    if (!value) {
        return { isValid: false, message: 'Credit card number is required' };
    }
    const cardNumber = value.replace(/\s+/g, '');
    const cardRegex = /^\d{13,19}$/;
    if (!cardRegex.test(cardNumber)) {
        return {
            isValid: false,
            message: 'Please enter a valid credit card number',
        };
    }
    let sum = 0;
    let isEven = false;
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber.charAt(i), 10);
        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        sum += digit;
        isEven = !isEven;
    }
    if (sum % 10 !== 0) {
        return {
            isValid: false,
            message: 'Please enter a valid credit card number',
        };
    }
    return { isValid: true, message: '' };
};
const creditCardValidationRule = {
    validate: creditCardValidator,
    required: true,
    message: 'Please enter a valid credit card number',
};
const ageValidator = (minAge = 18) => {
    return (value) => {
        if (!value) {
            return { isValid: false, message: 'Age is required' };
        }
        const age = Number(value);
        if (isNaN(age)) {
            return { isValid: false, message: 'Please enter a valid age' };
        }
        if (age < minAge) {
            return {
                isValid: false,
                message: `You must be at least ${minAge} years old`,
            };
        }
        if (age > 120) {
            return { isValid: false, message: 'Please enter a valid age' };
        }
        return { isValid: true, message: '' };
    };
};
const createAgeValidationRule = (minAge = 18) => ({
    validate: ageValidator(minAge),
    required: true,
    message: `You must be at least ${minAge} years old`,
});

const handleValidation = async (validator, value, formData, fieldName) => {
    const result = validator(value, formData, fieldName);
    if (result instanceof Promise) {
        const awaitedResult = await result;
        return normalizeValidationResult(awaitedResult);
    }
    return normalizeValidationResult(result);
};
const normalizeValidationResult = (result) => {
    if (typeof result === 'string') {
        return { isValid: false, message: result };
    }
    if (typeof result === 'boolean') {
        return { isValid: result, message: result ? '' : 'Validation failed' };
    }
    if (result === undefined) {
        return { isValid: true, message: '' };
    }
    return result;
};

const Form = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        bio: '',
        avatar: null,
        search: '',
        phone: '',
        website: '',
        creditCard: '',
        age: '',
    });
    const [touched, setTouched] = useState({});
    const [errors, setErrors] = useState({});
    const throttledSearch = useThrottle((query) => {
        if (query.length > 2) {
            console.log('Searching for:', query);
        }
    }, 300);
    const debouncedBioValidation = useDebounce((bio) => {
        if (bio && bio.length > 500) {
            setErrors((prev) => ({
                ...prev,
                bio: 'Bio must be less than 500 characters',
            }));
        }
        else {
            setErrors((prev) => ({ ...prev, bio: '' }));
        }
    }, 400);
    const createValidatorWrapper = (validator) => {
        return async (value, formData) => {
            const result = await handleValidation(validator, value, formData);
            return result.isValid ? undefined : result.message;
        };
    };
    const fileValidator = async (value) => {
        if (!value) {
            return { isValid: true, message: '' };
        }
        if (value instanceof FileList) {
            const file = value[0];
            if (file) {
                if (!file.type.startsWith('image/')) {
                    return { isValid: false, message: 'Please upload an image file' };
                }
                if (file.size > 2 * 1024 * 1024) {
                    return { isValid: false, message: 'File size must be less than 2MB' };
                }
            }
        }
        return { isValid: true, message: '' };
    };
    const handleChange = (name, value, shouldValidate = true) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        switch (name) {
            case 'search':
                if (typeof value === 'string') {
                    throttledSearch(value);
                }
                break;
            case 'bio':
                if (typeof value === 'string') {
                    debouncedBioValidation(value);
                }
                break;
            case 'avatar':
                if (shouldValidate) {
                    validateField(name, value);
                }
                break;
            default:
                if (shouldValidate) {
                    validateField(name, value);
                }
                break;
        }
    };
    const handleBlur = (name) => {
        setTouched((prev) => ({
            ...prev,
            [name]: true,
        }));
        validateField(name, formData[name]);
    };
    const validateField = async (name, value) => {
        let error = '';
        try {
            switch (name) {
                case 'username':
                    if (value) {
                        const result = await handleValidation(usernameValidationRule.validate, value, formData, name);
                        if (!result.isValid) {
                            error = result.message;
                        }
                    }
                    else {
                        const requiredResult = await handleValidation(requiredValidator, value, formData, 'Username');
                        if (!requiredResult.isValid) {
                            error = requiredResult.message;
                        }
                    }
                    break;
                case 'email':
                    if (value) {
                        const result = await handleValidation(emailValidationRule.validate, value, formData, name);
                        if (!result.isValid) {
                            error = result.message;
                        }
                    }
                    else {
                        const requiredResult = await handleValidation(requiredValidator, value, formData, 'Email');
                        if (!requiredResult.isValid) {
                            error = requiredResult.message;
                        }
                    }
                    break;
                case 'password':
                    if (value) {
                        const result = await handleValidation(passwordValidationRule.validate, value, formData, name);
                        if (!result.isValid) {
                            error = result.message;
                        }
                    }
                    else {
                        const requiredResult = await handleValidation(requiredValidator, value, formData, 'Password');
                        if (!requiredResult.isValid) {
                            error = requiredResult.message;
                        }
                    }
                    break;
                case 'phone':
                    if (value) {
                        const result = await handleValidation(phoneValidationRule.validate, value, formData, name);
                        if (!result.isValid) {
                            error = result.message;
                        }
                    }
                    break;
                case 'website':
                    if (value) {
                        const result = await handleValidation(urlValidationRule.validate, value, formData, name);
                        if (!result.isValid) {
                            error = result.message;
                        }
                    }
                    break;
                case 'creditCard':
                    if (value) {
                        const result = await handleValidation(creditCardValidationRule.validate, value, formData, name);
                        if (!result.isValid) {
                            error = result.message;
                        }
                    }
                    else {
                        const requiredResult = await handleValidation(requiredValidator, value, formData, 'Credit card');
                        if (!requiredResult.isValid) {
                            error = requiredResult.message;
                        }
                    }
                    break;
                case 'age':
                    if (value) {
                        const ageValidator = createAgeValidationRule(18).validate;
                        const result = await handleValidation(ageValidator, value, formData, name);
                        if (!result.isValid) {
                            error = result.message;
                        }
                    }
                    else {
                        const requiredResult = await handleValidation(requiredValidator, value, formData, 'Age');
                        if (!requiredResult.isValid) {
                            error = requiredResult.message;
                        }
                    }
                    break;
                case 'avatar': {
                    const fileResult = await fileValidator(value);
                    if (typeof fileResult === 'object' && !fileResult.isValid) {
                        error = fileResult.message;
                    }
                    break;
                }
                default:
                    break;
            }
        }
        catch (err) {
            console.error(err);
            error = 'Validation failed';
        }
        setErrors((prev) => ({
            ...prev,
            [name]: error,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const allTouched = Object.keys(formData).reduce((acc, key) => {
            acc[key] = true;
            return acc;
        }, {});
        setTouched(allTouched);
        const validationPromises = Object.keys(formData).map(async (key) => {
            await validateField(key, formData[key]);
        });
        await Promise.all(validationPromises);
        const hasErrors = Object.values(errors).some((error) => error);
        if (!hasErrors) {
            alert('Form submitted successfully!');
        }
        else {
            alert('Please fix the errors before submitting.');
        }
    };
    return (jsxRuntimeExports.jsxs("div", { className: "formyx-form", children: [jsxRuntimeExports.jsx("h2", { children: "Formyx Demo - Modular Validators & Performance Hooks" }), jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [jsxRuntimeExports.jsx(InputField, { name: "username", type: "text", label: "Username", value: formData.username, onChange: handleChange, onBlur: handleBlur, error: errors.username, touched: touched.username, validation: {
                            validate: createValidatorWrapper(usernameValidationRule.validate),
                            required: true,
                        }, placeholder: "Choose a username", throttle: 800, validationStrategy: "throttle" }), jsxRuntimeExports.jsx(InputField, { name: "email", type: "email", label: "Email Address", value: formData.email, onChange: handleChange, onBlur: handleBlur, error: errors.email, touched: touched.email, validation: {
                            validate: createValidatorWrapper(emailValidationRule.validate),
                            required: true,
                        }, placeholder: "your.email@example.com", debounce: 500, validationStrategy: "debounce" }), jsxRuntimeExports.jsx(InputField, { name: "password", type: "password", label: "Password", value: formData.password, onChange: handleChange, onBlur: handleBlur, error: errors.password, touched: touched.password, validation: {
                            validate: createValidatorWrapper(passwordValidationRule.validate),
                            required: true,
                        }, placeholder: "Enter your password", validationStrategy: "immediate" }), jsxRuntimeExports.jsx(InputField, { name: "phone", type: "tel", label: "Phone Number", value: formData.phone, onChange: handleChange, onBlur: handleBlur, error: errors.phone, touched: touched.phone, validation: {
                            validate: createValidatorWrapper(phoneValidationRule.validate),
                            required: false,
                        }, placeholder: "+1 (555) 123-4567", debounce: 400, validationStrategy: "debounce" }), jsxRuntimeExports.jsx(InputField, { name: "website", type: "url", label: "Website", value: formData.website, onChange: handleChange, onBlur: handleBlur, error: errors.website, touched: touched.website, validation: {
                            validate: createValidatorWrapper(urlValidationRule.validate),
                            required: false,
                        }, placeholder: "https://example.com", debounce: 500, validationStrategy: "debounce" }), jsxRuntimeExports.jsx(InputField, { name: "creditCard", type: "text", label: "Credit Card", value: formData.creditCard, onChange: handleChange, onBlur: handleBlur, error: errors.creditCard, touched: touched.creditCard, validation: {
                            validate: createValidatorWrapper(creditCardValidationRule.validate),
                            required: true,
                        }, placeholder: "1234 5678 9012 3456", throttle: 600, validationStrategy: "throttle" }), jsxRuntimeExports.jsx(InputField, { name: "age", type: "number", label: "Age", value: formData.age, onChange: handleChange, onBlur: handleBlur, error: errors.age, touched: touched.age, validation: {
                            validate: createValidatorWrapper(createAgeValidationRule(18).validate),
                            required: true,
                        }, placeholder: "Enter your age", validationStrategy: "immediate" }), jsxRuntimeExports.jsx(InputField, { name: "search", type: "text", label: "Product Search", value: formData.search, onChange: handleChange, onBlur: handleBlur, error: errors.search, touched: touched.search, placeholder: "Type to search products...", throttle: 300, validationStrategy: "throttle" }), jsxRuntimeExports.jsx(InputField, { name: "bio", type: "textarea", label: "Bio", value: formData.bio, onChange: handleChange, onBlur: handleBlur, error: errors.bio, touched: touched.bio, placeholder: "Tell us about yourself...", rows: 3, debounce: 400, validationStrategy: "debounce" }), jsxRuntimeExports.jsx(InputField, { name: "avatar", type: "file", label: "Profile Picture", value: formData.avatar, onChange: handleChange, onBlur: handleBlur, error: errors.avatar, touched: touched.avatar, validation: { validate: createValidatorWrapper(fileValidator) }, accept: "image/*" }), jsxRuntimeExports.jsx("button", { type: "submit", className: "formyx-submit-button", children: "Submit Form" })] })] }));
};

const Formyx = () => {
    return (jsxRuntimeExports.jsxs("div", { className: "formyx-form", children: ["Formyx Library", jsxRuntimeExports.jsx(Form, {})] }));
};

export { Form, Formyx, InputField, ageValidator, createAgeValidationRule, createRequiredValidator, creditCardValidationRule, creditCardValidator, emailValidationRule, emailValidator, handleValidation, passwordValidationRule, passwordValidator, phoneValidationRule, phoneValidator, requiredValidator, urlValidationRule, urlValidator, useDebounce, useThrottle, usernameValidationRule, usernameValidator };
//# sourceMappingURL=index.esm.js.map
