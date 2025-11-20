'use strict';

var require$$0 = require('react');

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
    const timeoutId = require$$0.useRef(null);
    return require$$0.useCallback((...args) => {
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
    const lastExecuted = require$$0.useRef(0);
    const timeoutId = require$$0.useRef(null);
    return require$$0.useCallback((...args) => {
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

const InputField = ({ name, type = "text", label, value, options = [], multiple = false, required = false, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
validation, error, touched = false, onChange, onBlur, className = "", style, placeholder, disabled = false, readOnly = false, autoFocus = false, autoComplete, min, max, step, pattern, rows = 4, accept, debounce = 300, throttle = 300, validationStrategy = "debounce", ...props }) => {
    const debouncedValidation = useDebounce((name, value) => {
        onChange(name, value, true);
    }, debounce);
    const throttledValidation = useThrottle((name, value) => {
        onChange(name, value, true);
    }, throttle);
    const handleChange = (event) => {
        let newValue;
        switch (type) {
            case "checkbox":
                newValue = event.target.checked;
                break;
            case "file":
                newValue = event.target.files;
                break;
            case "number":
                newValue = event.target.value === "" ? "" : Number(event.target.value);
                break;
            case "select":
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
        if (type !== "checkbox" && type !== "radio" && type !== "file") {
            switch (validationStrategy) {
                case "debounce":
                    debouncedValidation(name, newValue);
                    break;
                case "throttle":
                    throttledValidation(name, newValue);
                    break;
                case "immediate":
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
        const baseClass = "formyx-input";
        const stateClass = error && touched ? "formyx-input-error" : "";
        return `${baseClass} ${stateClass} ${className}`.trim();
    };
    const renderInput = () => {
        const commonProps = {
            name,
            value: type === "checkbox" ? undefined : value,
            checked: type === "checkbox" ? Boolean(value) : undefined,
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
            case "textarea":
                return (jsxRuntimeExports.jsx("textarea", { ...commonProps, value: value, rows: rows }));
            case "select":
                return (jsxRuntimeExports.jsxs("select", { ...commonProps, value: value, multiple: multiple, children: [jsxRuntimeExports.jsx("option", { value: "", children: "Select an option" }), options.map((option, index) => (jsxRuntimeExports.jsx("option", { value: option.value, children: option.label }, index)))] }));
            case "checkbox":
                return (jsxRuntimeExports.jsx("input", { ...commonProps, type: "checkbox", checked: Boolean(value) }));
            case "radio":
                return (jsxRuntimeExports.jsx("div", { className: "formyx-radio-group", children: options.map((option, index) => (jsxRuntimeExports.jsxs("label", { className: "formyx-radio-label", children: [jsxRuntimeExports.jsx("input", { type: "radio", name: name, value: option.value, checked: value === option.value, onChange: handleChange, onBlur: handleBlur, className: getInputClassName(), required: required, disabled: disabled }), jsxRuntimeExports.jsx("span", { children: option.label })] }, index))) }));
            case "file":
                return (jsxRuntimeExports.jsx("input", { ...commonProps, type: "file", multiple: multiple, value: undefined, accept: accept }));
            default:
                return (jsxRuntimeExports.jsx("input", { ...commonProps, type: type, value: value }));
        }
    };
    return (jsxRuntimeExports.jsxs("div", { className: `formyx-field formyx-field-${type}`, children: [label && (jsxRuntimeExports.jsxs("label", { htmlFor: name, className: "formyx-label", children: [label, required && jsxRuntimeExports.jsx("span", { className: "formyx-required", children: "*" })] })), renderInput(), error && touched && jsxRuntimeExports.jsx("div", { className: "formyx-error-message", children: error })] }));
};

const Form = () => {
    const [formData, setFormData] = require$$0.useState({
        username: "",
        email: "",
        password: "",
        age: "",
        bio: "",
        country: "",
        subscribe: false,
        gender: "",
        avatar: null,
        search: "",
        priceRange: 50,
        rating: 3,
    });
    const [touched, setTouched] = require$$0.useState({});
    const [errors, setErrors] = require$$0.useState({});
    // Remove unused variables
    // const [searchResults, setSearchResults] = useState<string[]>([]);
    // const [priceHistory, setPriceHistory] = useState<number[]>([]);
    // Email validation function - move to top to avoid use-before-declaration
    const validateEmailField = require$$0.useCallback((email) => {
        let error = "";
        if (!email) {
            error = "Email is required";
        }
        else if (!/\S+@\S+\.\S+/.test(email)) {
            error = "Email format is invalid (example: user@example.com)";
        }
        setErrors((prev) => ({
            ...prev,
            email: error,
        }));
    }, []);
    // Debounced email validation
    const debouncedEmailValidation = useDebounce((email) => {
        validateEmailField(email);
    }, 500);
    // Throttled search API calls
    const throttledSearch = useThrottle((query) => {
        // Remove console.log
        // console.log("Searching for:", query);
        if (query.length > 2) ;
    }, 300);
    // Throttled price range tracking (for analytics/slider events)
    const throttledPriceTracking = useThrottle((price) => {
        // Implement analytics tracking here, e.g. send to analytics service.
    }, 200);
    // Debounced bio validation (for character count/quality check)
    const debouncedBioValidation = useDebounce((bio) => {
        if (bio.length > 0) {
            let error = "";
            if (bio.length < 10) {
                error = "Bio should be at least 10 characters";
            }
            else if (bio.length > 500) {
                error = "Bio should be less than 500 characters";
            }
            setErrors((prev) => ({ ...prev, bio: error }));
        }
    }, 400);
    // Throttled username availability check
    const throttledUsernameCheck = useThrottle((username) => {
        // Simulate username availability API call - remove console.log
        // console.log("Checking username availability:", username);
        const takenUsernames = ["admin", "user", "test"];
        if (takenUsernames.includes(username.toLowerCase())) {
            setErrors((prev) => ({
                ...prev,
                username: "Username is already taken",
            }));
        }
    }, 800);
    const handleChange = (name, value, shouldValidate = true) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Apply different strategies based on input type
        switch (name) {
            case "email":
                if (typeof value === "string") {
                    // Immediate UI update for empty field
                    if (shouldValidate) {
                        let immediateError = "";
                        if (!value) {
                            immediateError = "Email is required";
                        }
                        setErrors((prev) => ({ ...prev, email: immediateError }));
                    }
                    // Debounced detailed validation
                    if (value) {
                        debouncedEmailValidation(value);
                    }
                    else {
                        setErrors((prev) => ({ ...prev, email: "" }));
                    }
                }
                break;
            case "search":
                if (typeof value === "string") {
                    // Throttled search execution
                    throttledSearch(value);
                }
                break;
            case "priceRange":
                if (typeof value === "number") {
                    // Throttled price tracking for analytics
                    throttledPriceTracking(value);
                }
                break;
            case "bio":
                if (typeof value === "string") {
                    // Debounced bio validation
                    debouncedBioValidation(value);
                }
                break;
            case "username":
                // Throttled username availability check (simulated)
                if (typeof value === "string" && value.length > 2) {
                    throttledUsernameCheck(value);
                }
                break;
            default:
                if (shouldValidate) {
                    validateField(name, value);
                }
                break;
        }
    };
    const handleBlur = (name, isTouched = true) => {
        if (isTouched) {
            setTouched((prev) => ({
                ...prev,
                [name]: true,
            }));
            // Final validation on blur
            if (name === "email") {
                validateEmailField(formData.email);
            }
            else {
                validateField(name, formData[name]);
            }
        }
    };
    const validateField = (name, value) => {
        let error = "";
        switch (name) {
            case "username":
                if (!value) {
                    error = "Username is required";
                }
                else if (value.length < 3) {
                    error = "Username must be at least 3 characters";
                }
                break;
            case "password":
                if (!value) {
                    error = "Password is required";
                }
                else if (value.length < 6) {
                    error = "Password must be at least 6 characters";
                }
                break;
            case "age":
                if (value && (Number(value) < 18 || Number(value) > 100)) {
                    error = "Age must be between 18 and 100";
                }
                break;
            case "country":
                if (!value) {
                    error = "Please select a country";
                }
                break;
            case "rating":
                if (!value) {
                    error = "Please select a rating";
                }
                break;
        }
        setErrors((prev) => ({
            ...prev,
            [name]: error,
        }));
    };
    // Debounced form submission
    const debouncedSubmit = useDebounce((data) => {
        // Remove console.log
        // console.log("Form submitted:", data);
        // Final validation before submission
        validateEmailField(data.email);
        const hasErrors = Object.values(errors).some((error) => error);
        if (!hasErrors) {
            alert("Form submitted successfully!");
        }
    }, 300);
    const handleSubmit = (e) => {
        e.preventDefault();
        // Mark all fields as touched on submit
        const allTouched = Object.keys(formData).reduce((acc, key) => {
            acc[key] = true;
            return acc;
        }, {});
        setTouched(allTouched);
        // Validate all fields before submission
        Object.keys(formData).forEach((key) => {
            if (key === "email") {
                validateEmailField(formData.email);
            }
            else {
                validateField(key, formData[key]);
            }
        });
        debouncedSubmit(formData);
    };
    const countryOptions = [
        { label: "United States", value: "us" },
        { label: "Canada", value: "ca" },
        { label: "United Kingdom", value: "uk" },
        { label: "Australia", value: "au" },
    ];
    const genderOptions = [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Other", value: "other" },
    ];
    const ratingOptions = [
        { label: "⭐", value: "1" },
        { label: "⭐⭐", value: "2" },
        { label: "⭐⭐⭐", value: "3" },
        { label: "⭐⭐⭐⭐", value: "4" },
        { label: "⭐⭐⭐⭐⭐", value: "5" },
    ];
    return (jsxRuntimeExports.jsxs("div", { className: "formyx-form", children: [jsxRuntimeExports.jsx("h2", { children: "Formyx Demo Form" }), jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [jsxRuntimeExports.jsx(InputField, { name: "username", type: "text", label: "Username", value: formData.username, onChange: handleChange, onBlur: handleBlur, error: errors.username, touched: touched.username, required: true, placeholder: "Choose a username", throttle: 800, validationStrategy: "throttle" }), jsxRuntimeExports.jsx(InputField, { name: "email", type: "email", label: "Email Address", value: formData.email, onChange: handleChange, onBlur: handleBlur, error: errors.email, touched: touched.email, required: true, placeholder: "your.email@example.com", debounce: 500, validationStrategy: "debounce" }), jsxRuntimeExports.jsx(InputField, { name: "password", type: "password", label: "Password", value: formData.password, onChange: handleChange, onBlur: handleBlur, error: errors.password, touched: touched.password, required: true, placeholder: "Enter your password", validationStrategy: "immediate" }), jsxRuntimeExports.jsx(InputField, { name: "search", type: "text", label: "Search Products", value: formData.search, onChange: handleChange, onBlur: handleBlur, placeholder: "Type to search...", throttle: 300, validationStrategy: "throttle" }), jsxRuntimeExports.jsx(InputField, { name: "age", type: "number", label: "Age", value: formData.age, onChange: handleChange, onBlur: handleBlur, error: errors.age, touched: touched.age, placeholder: "Enter your age", min: "18", max: "100" }), jsxRuntimeExports.jsx(InputField, { name: "bio", type: "textarea", label: "Bio", value: formData.bio, onChange: handleChange, onBlur: handleBlur, error: errors.bio, touched: touched.bio, placeholder: "Tell us about yourself...", rows: 3, debounce: 400, validationStrategy: "debounce" }), jsxRuntimeExports.jsx(InputField, { name: "rating", type: "radio", label: "How would you rate our service?", value: formData.rating, onChange: handleChange, onBlur: handleBlur, error: errors.rating, touched: touched.rating, options: ratingOptions, throttle: 500, validationStrategy: "throttle" }), jsxRuntimeExports.jsx(InputField, { name: "country", type: "select", label: "Country", value: formData.country, onChange: handleChange, onBlur: handleBlur, error: errors.country, touched: touched.country, options: countryOptions, required: true }), jsxRuntimeExports.jsx(InputField, { name: "gender", type: "radio", label: "Gender", value: formData.gender, onChange: handleChange, onBlur: handleBlur, options: genderOptions }), jsxRuntimeExports.jsx(InputField, { name: "subscribe", type: "checkbox", label: "Subscribe to newsletter", value: formData.subscribe, onChange: handleChange, onBlur: handleBlur }), jsxRuntimeExports.jsx(InputField, { name: "avatar", type: "file", label: "Profile Picture", value: formData.avatar, onChange: handleChange, onBlur: handleBlur, accept: "image/*" }), jsxRuntimeExports.jsx("button", { type: "submit", className: "formyx-submit-button", children: "Submit Form" })] })] }));
};

const Formyx = () => {
    return (jsxRuntimeExports.jsxs("div", { className: "formyx-form", children: ["Formyx Library", jsxRuntimeExports.jsx(Form, {})] }));
};

exports.Form = Form;
exports.Formyx = Formyx;
exports.InputField = InputField;
exports.useDebounce = useDebounce;
exports.useThrottle = useThrottle;
//# sourceMappingURL=index.js.map
