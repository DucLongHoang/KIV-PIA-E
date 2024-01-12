import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Flex } from "../../components/Flex"
import { Spacer } from "../../components/Spacer"
import { FormInput } from "../../components/form/FormInput"
import { SForm } from "../../components/form/FormInput.styled"
import { toasts } from "../../components/toast/toasts"
import { theme } from "../../styles/stitches.config"
import { ProjectUpdateFormValues, useProjectUpdateFormSchema } from "../../utils/formSchemas"
import { trpc } from "../../utils/trpc"
import { Button } from "../../components/button/Button"

export interface Props {
  projectId: number
  description: string | null
}

export const ProjectDescriptionEdit = ({ projectId, description }: Props) => {
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
      await updateMutation.mutateAsync({ projectId, updateData: { description } })
      toasts.success("Project description updated")
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    } catch (error) {
      toasts.error("Something went wrong")
    }
  }

  return (
    <SForm onSubmit={form.handleSubmit(onSubmit)}>
      <FormInput
        css={{ boxShadow: "none" }}
        error={form.formState.errors.description?.message}
        children={<input type="text" placeholder={description ?? undefined} {...form.register("description")} />}
      />

      <Spacer size={theme.spaces.s4} />

      <Flex direction={"row"} justify={"center"} align={"center"}>
        <Button isSubmitting={form.formState.isSubmitting} variant="secondary">
          Change
        </Button>
      </Flex>
    </SForm>
  )
}
