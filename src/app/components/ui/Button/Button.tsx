"use client"; // Add this line

import classNames from "classnames";
import {
  useRef,
  type ComponentType,
  useEffect,
  useState,
  forwardRef,
} from "react";
import { omit } from "lodash";
import type { TooltipProps } from "../ToolTip/Tooltip";
import { Tooltip } from "../ToolTip/Tooltip";

// import utility from "../../scss/utility.module.scss";
import scss from "./Button.module.scss";
// import { IconExtended } from '../IconExtended/IconExtended';
import type { CSSProperties, SVGProps } from "react";

import type React from "react";
import { mergeRefs } from "./mergeRef";

export interface IconExtendedProps extends SVGProps<SVGSVGElement> {
  icon?: ComponentType<SVGProps<SVGSVGElement>> | null;
  size?: number;
}

export const IconExtended = ({
  icon: Icon,
  size,
  ...restProps
}: IconExtendedProps) => {
  if (!Icon) return null;

  return (
    <Icon
      aria-hidden="true"
      {...restProps}
      {...(size ? { width: size, height: size } : {})}
      className={classNames(scss.iconExtendedRoot, restProps?.className)}
      style={
        {
          ...(size ? { "--icon-size": `${size}px` } : {}),
          ...restProps?.style,
        } as CSSProperties
      }
    />
  );
};

export const enum DropdownType {
  single = "single",
  multi = "multi",
}

export type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export const buttonVariant = {
  primary: "primary",
  secondary: "secondary",
  tertiary: "tertiary",
  bordered: "bordered",
  transparent: "transparent",
  destructive: "destructive",
} as const;

export type ButtonVariant = (typeof buttonVariant)[keyof typeof buttonVariant];

export const buttonSize = {
  large: "large",
  medium: "medium",
  small: "small",
  xSmall: "xSmall",
  tiny: "tiny",
} as const;

export type ButtonSize = (typeof buttonSize)[keyof typeof buttonSize];

const DEFAULT_ICON_SIZE = 20;

interface IconPropsWithPLacement extends IconProps {
  /**
   * Icon placement
   */
  placement?: "left" | "right";
}

export interface ButtonCommonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * Button test id
   */
  testId?: string;
  /**
   * Button variant
   */
  variant?: ButtonVariant;
  /**
   * Button size
   */
  size?: ButtonSize;
  /**
   * Button state
   */
  state?: {
    /**
     * If true button will be hovered (useful only for testing)
     */
    forceIsHovered?: boolean;
    /**
     * If true button will be focused (useful for controlled focus)
     */
    forceIsFocused?: boolean;
    /**
     * If true button will be focused (useful only for testing)
     */
    forceIsFocusedStyle?: boolean;
    /**
     * If true button will be focused (useful only for testing)
     */
    forceIsPressed?: boolean;
    /**
     * If true button will be disabled
     */
    isDisabled?: boolean;
    /**
     * If true button will have 'loading' state
     */
    isLoading?: boolean;
  };
  /**
   * Icon component
   */
  icon?: ComponentType<IconPropsWithPLacement>;
  /**
   * Props for icon component
   */
  iconProps?: IconPropsWithPLacement;
  /**
   * Props for tooltip
   */
  tooltipProps?: TooltipProps;
  [key: `data-${string}`]: string | undefined;
}

interface BorderedButtonProps extends ButtonCommonProps {
  variant: "bordered";
  /**
   * If true button will be without shadow. This variant has a shadow by default
   */
  isShadowless?: boolean;
}

export type ButtonProps = ButtonCommonProps | BorderedButtonProps;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      testId,
      className,
      tooltipProps,
      variant = buttonVariant.primary,
      size = buttonSize.small,
      state: {
        forceIsHovered,
        forceIsFocused = false,
        forceIsFocusedStyle = false,
        forceIsPressed,
        isDisabled,
        isLoading,
      } = {},
      icon,
      iconProps,
      children,
      ...buttonProps
    },
    forwardedRef
  ) => {
    const [isFocused, setIsFocused] = useState<boolean>(forceIsFocused);

    const buttonRef = useRef<HTMLButtonElement>(null);
    const ref = mergeRefs<HTMLButtonElement>(buttonRef, forwardedRef);

    const IconComponent = isLoading ? <div>Loading...</div> : icon;

    const isShadowless =
      variant === buttonVariant.bordered &&
      (buttonProps as BorderedButtonProps).isShadowless;
    const isWithRightIcon = iconProps?.placement === "right";

    const Icon = (
      <IconExtended
        icon={IconComponent as any}
        size={DEFAULT_ICON_SIZE}
        {...iconProps}
        data-element="button-icon"
      />
    );

    useEffect(() => {
      const currentButton = buttonRef.current;

      if (!currentButton) return undefined;

      if (forceIsFocused) {
        currentButton.focus();
        setIsFocused(true);

        const handleBlur = () => {
          currentButton.blur();
          setIsFocused(false);
        };

        currentButton.addEventListener("blur", handleBlur);

        return () => {
          currentButton.removeEventListener("blur", handleBlur);
        };
      }

      return undefined;
    }, [forceIsFocused]);

    return (
      <Tooltip {...tooltipProps}>
        <button
          data-testid={testId}
          type="button"
          ref={ref}
          className={classNames(
            className,
            scss.buttonRoot,
            // utility.buttonReset,
            scss[variant],
            scss[size],
            !!children && scss.isRectangular,
            forceIsHovered && scss.isHovered,
            (forceIsFocusedStyle ?? isFocused) && scss.isFocused,
            forceIsPressed && scss.isPressed,
            isDisabled && scss.isDisabled,
            isLoading && scss.isLoading,
            isShadowless && scss.isShadowless
          )}
          disabled={isDisabled || isLoading}
          {...omit(buttonProps, ["isShadowless"])}
        >
          {/* {!isWithRightIcon && Icon} */}

          {!!children && (
            <span className={scss.content} data-element="button-content">
              {children}
            </span>
          )}

          {/* {isWithRightIcon && Icon} */}
        </button>
      </Tooltip>
    );
  }
);

Button.displayName = "Button";
