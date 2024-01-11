import { Link } from "react-router-dom"
import { Spacer } from "../components/Spacer"
import Text from "../components/Text"
import { AppLayout } from "../components/layouts/appLayout/AppLayout"
import { styled, theme } from "../styles/stitches.config"
import { formatDate } from "../utils/date"
import { LINKS } from "../constants/Links"
import { trpc } from "../utils/trpc"
import HomePlaceholder from "../components/placeholder/HomePlaceholder"
import { Flex } from "../components/Flex"

export const SGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: `repeat(auto-fill, minmax(${theme.spaces.s80}, 1fr))`,
  columnGap: theme.sizes.s6,
  rowGap: theme.sizes.s6,
})

export const SCard = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  boxShadow: theme.shadows.default,
  height: theme.spaces.s48,
  padding: theme.spaces.s10,

  variants: {
    isActive: {
      true: {
        backgroundColor: theme.colors.white,
      },
      false: {
        backgroundColor: theme.colors.gray,
      },
    },
  },

  defaultVariants: {
    isActive: "true",
  },
})
const HomeContent = () => {
  const projectsQuery = trpc.projects.getByUserId.useQuery()
  const { data, isLoading, error } = projectsQuery

  if (!data || isLoading || error) {
    return (
      <>
        <Text type="headerH1">Projects</Text>
        <Spacer size={theme.spaces.s5} />
        <HomePlaceholder />
      </>
    )
  }

  return (
    <>
      <Text type="headerH1">Projects</Text>
      <Spacer size={theme.spaces.s5} />
      <SGrid>
        {data.map((projectInfo) => {
          const { id, name, from, to, department, manager } = projectInfo

          return (
            <Link to={LINKS.project(id)} key={id}>
              <SCard>
                <Flex direction={"column"}>
                  <Text type="headerH1">{name}</Text>
                  <Text type="headerH3">
                    {formatDate(from)} - {to ? formatDate(to) : "until done"}
                  </Text>
                </Flex>
                <Flex direction={"column"}>
                  <Text type="textsLarge">Dept: {department.name}</Text>
                  <Text type="textsLarge">Mngr: {manager.fullName}</Text>
                </Flex>
              </SCard>
            </Link>
          )
        })}
      </SGrid>
    </>
  )
}

export const Home = () => {
  return (
    <AppLayout showTopMenu showCreateLink>
      <Spacer size={theme.spaces.s5} />
      <HomeContent />
    </AppLayout>
  )
}
