// eslint-disable-next-line import/no-extraneous-dependencies
import * as RadixTooltip from '@radix-ui/react-tooltip';
// eslint-disable-next-line import/no-extraneous-dependencies
import cx from 'classnames';

import type { PropsWithChildren } from 'react';
import { useCallback, useEffect, useState } from 'react';
import scss from './Tooltip.module.scss';

type TooltipContentProps = RadixTooltip.TooltipContentProps;

const DEFAULT_TOOLTIP_MARGIN = 5;

export interface TooltipProps extends PropsWithChildren {
  /**
   * className applied to the root element
   */
  className?: string;
  /**
   * className applied to the Arrow element
   */
  arrowClassName?: string;
  /**
   * Tooltip content
   */
  content?: React.ReactNode;

  /**
   * @description if true - tooltip will have an Arrow
   * @default true
   */
  isHasArrow?: boolean;
  /**
   * Tooltip content props
   */
  contentProps?: TooltipContentProps;
  /**
   * Tooltip placement
   */
  placement?: TooltipContentProps['side'];
  state?: {
    /**
     * @description if true - tooltip will not be shown
     * @default false
     */
    isDisabled?: boolean;
    /**
     * @description if true - tooltip will opened by default
     * @default false
     */
    isDefaultOpen?: boolean;
  };
  /**
   * Props to control the tooltip from the outside
   */
  controlProps?: Pick<
  RadixTooltip.TooltipProps,
  'open' | 'onOpenChange' | 'delayDuration'
  > & {
    /**
     * ❗️Be careful❗️
     * It prevents the tooltip popover from closing when you click outside (devtools etc.)
     */
    isPreventChange?: boolean;
  };
}

export function Tooltip({
  arrowClassName,
  children,
  content,
  className,
  isHasArrow = true,
  contentProps,
  state: { isDisabled = false, isDefaultOpen = false } = {},
  controlProps = {},
  placement,
}: TooltipProps) {
  const [isOpen, setIsOpen] = useState<boolean>(isDefaultOpen ?? false);

  const {
    open: isOpenProp,
    onOpenChange: onOpenChangeProp,
    delayDuration,
  } = controlProps;

  const onOpenChange: RadixTooltip.TooltipProps['onOpenChange'] = useCallback(
    (open: boolean) => {
      if (controlProps.isPreventChange) return;

      onOpenChangeProp?.(open);
      setIsOpen(open);
    },
    [controlProps.isPreventChange, onOpenChangeProp],
  );

  useEffect(() => {
    if (isOpenProp !== undefined) {
      setIsOpen(isOpenProp);
    }
  }, [isOpenProp]);

  if (!content) return <div>{children}</div>;

  return (
    <RadixTooltip.Provider
      delayDuration={delayDuration}
      skipDelayDuration={500}
    >
      <RadixTooltip.Root open={isOpen} onOpenChange={onOpenChange}>
        <RadixTooltip.Trigger asChild>
          <span
            data-element="tooltip-trigger"
            className={cx(scss.tooltipRoot, className)}
          >
            {children}
          </span>
        </RadixTooltip.Trigger>

        {!isDisabled && (
          <RadixTooltip.Content
            {...contentProps}
            style={{ zIndex: 100000 }}
            className={cx(scss.content, contentProps?.className)}
            side={placement ?? contentProps?.side}
            sideOffset={DEFAULT_TOOLTIP_MARGIN}
          >
            <span className={scss.tooltipContentContainer}>{content}</span>

            {isHasArrow && (
              <RadixTooltip.Arrow
                className={cx(scss.tooltipArrow, arrowClassName)}
                width={11}
                height={5}
              />
            )}
          </RadixTooltip.Content>
        )}
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}
