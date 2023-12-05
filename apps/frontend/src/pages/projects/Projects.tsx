import { styled } from "@stitches/react"
import { Spacer } from "../../components/Spacer"
import Text from "../../components/Text"
import { AppLayout } from "../../components/layouts/appLayout/AppLayout"
import { theme } from "../../styles/stitches.config"
import { Flex } from "../../components/Flex"
import * as DropDown from "@radix-ui/react-dropdown-menu"
import { PropsWithChildren } from "react"
import { SContent, STrigger } from "../../components/dropdown/Dropdown.styled"

interface CardProps {
  variant?: "header" | "description" | "allocation"
}

const SWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
})

const SCard = styled("div", {
  display: "flex",
  flexDirection: "column",
  boxShadow: theme.shadows.default,
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
    type: {
      header: {
        height: theme.sizes.s10,
        backgroundColor: theme.colors.transparent,
        boxShadow: "none",
        paddingTop: theme.spaces.s0,
        paddingBottom: theme.spaces.s0,
        paddingLeft: theme.spaces.s10,
        paddingRight: theme.spaces.s10,
      },
      description: {
        height: theme.sizes.s10,
      },
      allocation: {
        height: theme.sizes.s50,
      },
    },
  },

  defaultVariants: {
    isActive: "true",
  },
})

const SAllocationCard = styled("div", {})

export const Card = (props: PropsWithChildren<CardProps>) => {
  const { variant, children } = props

  return <SCard type={variant}>{children}</SCard>
}

export const Projects = () => {
  const project = {
    id: 1,
    name: "Project Titan",
    description: "A top-secret project to develop new technology.",
    from: new Date("2023-01-01T00:00:00.000Z"),
    to: new Date("2023-12-31T23:59:59.000Z"),
    managerId: 1,
  }

  return (
    <AppLayout>
      <Spacer size={theme.spaces.s6} />

      <Project
        id={project.id}
        name={project.name}
        description={project.description}
        from={project.from}
        to={project.to}
        managerId={project.managerId}
      />
      <SAllocationCard />
    </AppLayout>
  )
}

interface ProjectProps {
  id: number
  name: string
  description: string
  from: Date
  to: Date | null
  managerId: number
}

const Project = (props: ProjectProps) => {
  const { id, name, description, from, to, managerId } = props

  return (
    <SWrapper>
      <Card variant="header">
        <Flex direction={"row"} align={"center"} justify={"between"}>
          <Flex direction={"row"} align={"baseline"} justify={"center"}>
            <Text type="headerH2">{name}</Text>
            <Spacer size={theme.spaces.s1} />
            <Text type="headerH3">(id: {id})</Text>
          </Flex>
          <DropDown.Root>
            <STrigger>
              <Text type="textsSmall">{name}</Text>
            </STrigger>
            <SContent>Content</SContent>
          </DropDown.Root>
        </Flex>
      </Card>

      <Spacer size={theme.spaces.s6} />

      <Text type="headerH3">Description</Text>
      <Card variant="description">
        <Text type="headerH3">{description}</Text>
      </Card>

      <Spacer size={theme.spaces.s10} />

      <Text type="headerH3">Allocations</Text>
      <Card variant="allocation">
        <SAllocationCard></SAllocationCard>
      </Card>
    </SWrapper>
  )
}
