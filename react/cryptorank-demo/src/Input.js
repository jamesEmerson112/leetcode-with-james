import React from "react";

// ========== forwardRef Demo ==========
// forwardRef allows a component to expose a DOM node to parent component
// Normally, refs don't pass through components - forwardRef solves this

// ========== useImperativeHandle Demo ==========
// useImperativeHandle customizes the instance value exposed to parent
// Instead of exposing the raw DOM node, you can expose custom methods

const Input = React.forwardRef(function Input(props, ref) {
    const { value, onChange, placeholder, className, ...rest } = props;

    // Internal ref for the actual input element
    const inputRef = React.useRef(null);

    // ========== useImperativeHandle ==========
    // Customize what the parent sees when using the ref
    // Parent calls: inputRef.current.focus() or inputRef.current.clear()
    React.useImperativeHandle(ref, () => ({
        // Expose focus method
        focus: () => {
            console.log("useImperativeHandle: focus() called");
            inputRef.current?.focus();
        },
        // Expose blur method
        blur: () => {
            console.log("useImperativeHandle: blur() called");
            inputRef.current?.blur();
        },
        // Expose custom method to select all text
        selectAll: () => {
            console.log("useImperativeHandle: selectAll() called");
            inputRef.current?.select();
        },
        // Expose getter for current value
        getValue: () => {
            return inputRef.current?.value;
        },
        // Expose the raw DOM node if needed
        getInputElement: () => inputRef.current,
    }), []); // Empty deps = methods never change

    return (
        <input
            ref={inputRef}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={className}
            {...rest}
        />
    );
});

// ========== Usage Example ==========
/*
function ParentComponent() {
    const inputRef = React.useRef(null);

    const handleFocusClick = () => {
        // Call the custom focus method
        inputRef.current.focus();
    };

    const handleSelectAll = () => {
        // Call the custom selectAll method
        inputRef.current.selectAll();
    };

    return (
        <div>
            <Input
                ref={inputRef}
                value={value}
                onChange={handleChange}
                placeholder="Enter amount"
            />
            <button onClick={handleFocusClick}>Focus Input</button>
            <button onClick={handleSelectAll}>Select All</button>
        </div>
    );
}
*/

export default Input;
