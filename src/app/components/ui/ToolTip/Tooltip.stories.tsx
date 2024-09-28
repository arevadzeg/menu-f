import React from 'react';

import type { StoryFn, Meta } from '@storybook/react';
import type { TooltipProps } from './Tooltip';
import { Tooltip } from './Tooltip';

// eslint-disable-next-line import/no-default-export
export default {
  name: 'Tooltip',
  component: Tooltip,
  decorators: [
    (Story) => (
      <div style={{ width: 400, height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    chromatic: { delay: 1000, pauseAnimationAtEnd: true },
  },
} as Meta;

const Template: StoryFn<React.ComponentProps<typeof Tooltip>> = (args) => <Tooltip {...args} />;

const defaultProps: TooltipProps = {
  children: <span>hello</span>,
  state: { isDefaultOpen: true },
  contentProps: {
    align: 'center',
  },
  content: <span>tooltip content</span>,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultProps,
  contentProps: {
    side: 'right',
  },
};

export const Top = Template.bind({});
Top.args = {
  ...defaultProps,
  contentProps: {
    side: 'top',
  },
};

export const Left = Template.bind({});
Left.args = {
  ...defaultProps,
  contentProps: {
    side: 'left',
  },
};

export const Bottom = Template.bind({});
Bottom.args = {
  ...defaultProps,
  contentProps: {
    side: 'bottom',
  },
};
