import { useState } from "react"
import Text from "../../components/Text"
import { Button } from "../../components/button/Button"
import { Edit } from "../../styles/images"
import { theme } from "../../styles/stitches.config"
import { trpc } from "../../utils/trpc"
import { Card, SCardHeader } from "./ProjectPage.styled"
import { Flex } from "../../components/Flex"
import { FormInput } from "../../components/form/FormInput"
import { ProjectUpdateFormValues, useProjectUpdateFormSchema } from "../../utils/formSchemas"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toasts } from "../../components/toast/toasts"
import { Spacer } from "../../components/Spacer"

export interface Props {
  canEdit: boolean
  description: string | null
}

export const ProjectDescriptionSection = ({ canEdit, description }: Props) => {
  const [editMode, setEditMode] = useState(false)

  const updateMutation = trpc.projects.updateProject.useMutation()

  const { schema } = useProjectUpdateFormSchema()
  const form = useForm<ProjectUpdateFormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  })

  async function onSubmit(formValues: ProjectUpdateFormValues) {
    const { description } = formValues
    if (!description) return
    try {
      await updateMutation.mutateAsync({ projectId: 1, updateData: { description } })
      setEditMode(false)
      toasts.success("Project description updated")
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    } catch (error) {
      toasts.error("Something went wrong")
    }
  }

  return (
    <>
      <SCardHeader>
        <Text type="headerH3">Description</Text>
        {!editMode && canEdit && (
          <Button
            variant="iconButton"
            style={{ height: theme.sizes.s6.value, backgroundColor: theme.colors.background.value }}
            children={<Edit height={theme.sizes.s4.value} />}
            onClick={() => {
              console.log("edit")
              setEditMode(!editMode)
            }}
          />
        )}
      </SCardHeader>
      <Card variant="description">
        {editMode ? (
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormInput
              css={{ boxShadow: "none" }}
              error={form.formState.errors.description?.message}
              children={<input type="text" placeholder={description ?? undefined} {...form.register("description")} />}
            />

            <Spacer size={theme.spaces.s4} />

            <Flex direction={"row"} justify={"center"} align={"center"}>
              <Button
                isSubmitting={form.formState.isSubmitting}
                variant="secondary"
                style={{ backgroundColor: theme.colors.good.value }}
              >
                Change
              </Button>

              <Spacer size={theme.spaces.s4} />

              <Button
                variant="secondary"
                style={{ backgroundColor: theme.colors.bad.value }}
                onClick={() => {
                  setEditMode(false)
                }}
              >
                Cancel
              </Button>
            </Flex>
          </form>
        ) : (
          <Text type="textsLarge">{description}</Text>
        )}
      </Card>
    </>
  )
}
