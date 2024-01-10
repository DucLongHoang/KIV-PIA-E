import { Link } from "react-router-dom"
import { Spacer } from "../components/Spacer"
import Text from "../components/Text"
import { AppLayout } from "../components/layouts/appLayout/AppLayout"
import { styled, theme } from "../styles/stitches.config"
import { formatDate } from "../utils/date"
import { LINKS } from "../constants/Links"
import { trpc } from "../utils/trpc"
import HomePlaceholder from "../components/placeholder/HomePlaceholder"

export const SGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: `repeat(auto-fill, minmax(${theme.spaces.s80}, 1fr))`,
  columnGap: theme.sizes.s6,
  rowGap: theme.sizes.s6,
})

export const SCard = styled("div", {
  display: "flex",
  flexDirection: "column",
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
  const projectsQuery = trpc.projects.getAll.useQuery()
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

  const projects = data

  return (
    <>
      <Text type="headerH1">Projects</Text>
      <Spacer size={theme.spaces.s5} />
      <SGrid>
        {projects.map((project) => {
          const { id, name, from, to } = project

          return (
            <Link to={LINKS.project(id)} key={id}>
              <SCard>
                <Text type="headerH1">{name}</Text>
                <Text type="headerH3">
                  {formatDate(from)} - {to ? formatDate(to) : "until done"}
                </Text>
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
    <AppLayout>
      <Spacer size={theme.spaces.s5} />
      <HomeContent />
    </AppLayout>
  )
}
