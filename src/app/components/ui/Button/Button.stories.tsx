import type { Meta, StoryObj } from "@storybook/react";
import type { ButtonProps, ButtonVariant } from "./Button";
import { Button } from "./Button";

const meta = {
  title: "Button",
  component: Button,
} as Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

const getCommonProps = (variant: ButtonVariant): Partial<ButtonProps> => ({
  children: "Button CTA",
  variant,
  onClick: () => alert("Button clicked"),
});

const rowData: Pick<ButtonProps, "state">[] = [
  {
    state: {},
  },
  {
    state: {
      forceIsHovered: true,
    },
  },
  {
    state: {
      forceIsFocusedStyle: true,
    },
  },
  {
    state: {
      forceIsPressed: true,
    },
  },
  {
    state: {
      isDisabled: true,
    },
  },
  {
    state: {
      isLoading: true,
    },
  },
];

const getColumnData = (variant: ButtonVariant): ButtonProps[] => [
  {
    ...getCommonProps(variant),
    size: "large",
  },
  {
    ...getCommonProps(variant),
    size: "medium",
  },
  {
    ...getCommonProps(variant),
    size: "small",
  },
  {
    ...getCommonProps(variant),
    size: "xSmall",
  },
  {
    ...getCommonProps(variant),
    size: "tiny",
  },
];

const states = [
  "Default",
  "Hovered",
  "Focused",
  "Pressed",
  "Disabled",
  "Loading",
];

const ButtonComponents = ({ variant }: { variant: ButtonVariant }) => (
  <div
    style={{
      display: "grid",
      gap: 32,
      gridTemplateColumns: "auto auto auto",
      width: "fit-content",
      padding: 16,
    }}
  >
    {rowData.map((stateProps, index) => (
      // eslint-disable-next-line react/jsx-key
      <div
        style={{
          display: "grid",
          gap: 16,
          background: "#fcfcfc",
          padding: 16,
          borderRadius: 8,
        }}
      >
        <h2>{states[index]}</h2>
        {getColumnData(variant).map(({ children, icon, size, ...props }) => (
          <div key={size} style={{ display: "flex", gap: 16 }}>
            <Button size={size} {...props} {...stateProps}>
              {children}
            </Button>
            <Button size={size} icon={icon} {...props} {...stateProps}>
              {children}
            </Button>
            <Button
              size={size}
              icon={icon}
              iconProps={{ placement: "right" }}
              {...props}
              {...stateProps}
            >
              {children}
            </Button>
            <Button size={size} icon={icon} {...props} {...stateProps} />
          </div>
        ))}
      </div>
    ))}
  </div>
);

export const Primary = {
  render: () => <ButtonComponents variant="primary" />,
} satisfies Story;

export const Secondary = {
  render: () => <ButtonComponents variant="secondary" />,
} satisfies Story;

export const Tertiary = {
  render: () => <ButtonComponents variant="tertiary" />,
} satisfies Story;

export const Bordered = {
  render: () => <ButtonComponents variant="bordered" />,
} satisfies Story;

export const Transparent = {
  render: () => <ButtonComponents variant="transparent" />,
} satisfies Story;

export const Destructive = {
  render: () => <ButtonComponents variant="destructive" />,
} satisfies Story;
