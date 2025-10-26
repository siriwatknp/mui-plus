---
name: using-base-ui-with-material-ui
description: Guide on integrating Base UI components from `@base-ui-components/react` with Material UI `@mui/material`.
---

**Announce on start**: You must announce "Using Base UI with Material UI skill" when this skill is invoked.

Always have enough context from the [Base UI documentation](https://base-ui.com/llms.txt) to build the component requested by the user.

## Base UI as the foundation

Render Base UI components as a foundation for the UI and then pass `render` prop using **proper** Material UI components.

For example, a Navigation Menu, should use `Link` from Material UI as the render element for `NavigationMenu.Link`.:

```tsx
import { NavigationMenu } from "@base-ui-components/react/navigation-menu";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

function MenuLink({
  icon,
  title,
  description,
  ...props
}: NavigationMenu.Link.Props & {
  icon?: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <NavigationMenu.Link
      href="#"
      {...props}
      render={
        <Link
          underline="none"
          sx={{
            display: "flex",
            gap: 1,
            p: 1.5,
            borderRadius: 0.5,
            cursor: "pointer",
            transition: "background-color 0.2s",
            "@media (hover: hover)": {
              "&:hover": {
                bgcolor: "action.hover",
              },
            },
          }}
        />
      }
    >
      <Box sx={{ color: "primary.main", display: "flex", mt: 0.25 }}>
        {icon}
      </Box>
      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.25 }}>
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", lineHeight: 1.4 }}
        >
          {description}
        </Typography>
      </Box>
    </NavigationMenu.Link>
  );
}
```

For full example, see [nav-menu-01.tsx](registry/blocks/nav-menu-01/nav-menu-01.tsx)

Another example, using `Button` from Material UI as the render element for Base UI `Trigger` component:

```tsx
import { Menu } from "@base-ui-components/react/menu";
import Button from "@mui/material/Button";

<Menu.Trigger render={<Button />}>File</Menu.Trigger>;
```

## Styling

To style Base UI components, use `<Box />` as a render element and pass `sx` prop to it.
Always keep in mind that the sx values should be minimum since Material UI components already have default styling.

```tsx
import { NavigationMenu } from "@base-ui-components/react/navigation-menu";
import Box from "@mui/material/Box";

<NavigationMenu.List
  render={
    <Box
      component="ul"
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 2,
        listStyle: "none",
        "& .MuiButton-root[data-popup-open]": {
          bgcolor: "action.selected",
        },
      }}
    />
  }
></NavigationMenu.List>;
```

## Reduce duplication

If the same styles are used multiple times for the same Base UI components, create wrapper components to reduce duplication.

```tsx
import { NavigationMenu } from "@base-ui-components/react/navigation-menu";

function Content(props: BoxProps) {
  return (
    <Box
      sx={{
        padding: 1,
        width: "calc(100vw - 40px)",
        height: "100%",
        "@media (min-width: 500px)": {
          width: "max-content",
          minWidth: "400px",
        },
      }}
      {...props}
    />
  );
}

<NavigationMenu.List>
  <NavigationMenu.Item>
    <NavigationMenu.Content render={<Content />}></NavigationMenu.Content>
  </NavigationMenu.Item>
  <NavigationMenu.Item>
    <NavigationMenu.Content render={<Content />}></NavigationMenu.Content>
  </NavigationMenu.Item>
  <NavigationMenu.Item>
    <NavigationMenu.Content render={<Content />}></NavigationMenu.Content>
  </NavigationMenu.Item>
</NavigationMenu.List>;
```
