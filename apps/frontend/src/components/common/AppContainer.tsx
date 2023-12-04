import { styled, theme } from "../../styles/stitches.config";

export const AppContainer = styled("div", {
	background: theme.colors.background,
	minHeight: "100vh",
	"@lg": {
		paddingLeft: "calc(100vw - 100%)",
	},
});
