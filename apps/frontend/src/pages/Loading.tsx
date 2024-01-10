import { BounceLoader } from "react-spinners"
import { theme } from "../styles/stitches.config"
import { Flex } from "../components/Flex"

export const Loading = () => {
  return (
    <Flex
      justify={"center"}
      align={"center"}
      style={{ width: "100vw", height: "100vh", background: theme.colors.background.value }}
    >
      <BounceLoader size={theme.sizes.s40.value} color={theme.colors.primary.value} />
    </Flex>
  )
}
