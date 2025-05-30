import type { Preview } from '@storybook/react';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import React from 'react'; // Ensure React is imported

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => {
      // Use React.createElement to wrap Story with Theme
      return React.createElement(Theme, null, React.createElement(Story));
    },
  ],
};

export default preview;
