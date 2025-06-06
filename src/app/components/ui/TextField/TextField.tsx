import { TextField as RadixTextField } from '@radix-ui/themes';
import React, { useState, forwardRef } from 'react';
import './TextField.scss';

interface TextFieldProps {
  isCollapsable?: boolean;
  placeholder?: string;
  value?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  size?: '1' | '2' | '3';
  variant?: 'classic' | 'surface' | 'soft';
  radius?: 'none' | 'small' | 'medium' | 'large' | 'full';
  color?: string;
  icon?: JSX.Element;
  className?: string;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      isCollapsable = false,
      placeholder = 'Enter text...',
      value,
      onChange,
      size = '2',
      variant = 'surface',
      radius = 'medium',
      icon,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      color = '',
      ...rest
    },
    ref,
  ) => {
    const [collapsed, setCollapsed] = useState(isCollapsable);

    const handleCollapseClick = () => {
      if (isCollapsable) {
        setCollapsed(!collapsed);
      }
    };

    return (
      <div className="text-field">
        {collapsed && isCollapsable ? (
          <button onClick={handleCollapseClick} type="button">Expand Input</button>
        ) : (
          <RadixTextField.Root
            size={size}
            variant={variant}
            radius={radius}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            ref={ref} // Forwarding the ref properly here
            style={{
              width: collapsed ? 33 : '100%',
              maxWidth: collapsed ? 33 : 'auto',
              overflow: 'hidden',
              transition: 'max-width 300ms ease',
            }}
            {...rest}
          >
            {icon && (
              <RadixTextField.Slot
                onClick={() => setCollapsed((prev) => !prev)}
              >
                {icon}
              </RadixTextField.Slot>
            )}
          </RadixTextField.Root>
        )}
      </div>
    );
  },
);

TextField.displayName = 'TextField';

export default TextField;
