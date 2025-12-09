import React, { forwardRef } from "react";
import "./Checkbox.scss";

export interface CheckboxProps {
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  theme?: "blue" | "purple";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  className?: string;
  label?: string;
  error?: boolean;
  errorMessage?: string;
  indeterminate?: boolean;
}

const OXMCheckbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked = false,
      onChange,
      onFocus,
      onBlur,
      theme = "purple",
      size = "medium",
      disabled = false,
      required = false,
      name,
      id,
      className = "",
      label,
      error = false,
      errorMessage,
      indeterminate = false,
    },
    ref
  ) => {
    const classes = [
      "oxm-checkbox",
      `oxm-checkbox--${theme}`,
      `oxm-checkbox--${size}`,
      error ? "oxm-checkbox--error" : "",
      disabled ? "oxm-checkbox--disabled" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className="oxm-checkbox-wrapper">
        <label className={classes}>
          <input
            ref={ref}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            disabled={disabled}
            required={required}
            name={name}
            id={id}
            className="oxm-checkbox-input"
          />
          <span className="oxm-checkbox-custom">
            {checked && (
              <svg className="oxm-checkbox-icon" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
                />
              </svg>
            )}
            {indeterminate && !checked && (
              <svg className="oxm-checkbox-icon" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M19 13H5v-2h14v2z"
                />
              </svg>
            )}
          </span>
          {label && <span className="oxm-checkbox-label">{label}</span>}
        </label>
        {error && errorMessage && (
          <span className="oxm-checkbox-error-message">{errorMessage}</span>
        )}
      </div>
    );
  }
);

OXMCheckbox.displayName = "OXMCheckbox";

export default OXMCheckbox; 