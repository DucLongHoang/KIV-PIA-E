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
import { DatePicker } from "../../components/datepicker/DatePicker"
import { useState } from "react"

export interface Props {
  projectId: number
  projectName: string
  from: Date
  to?: Date | null
}

export const ProjectInfoEdit = ({ projectId, projectName, from: _from, to: _to }: Props) => {
  const today = new Date()
  const updateMutation = trpc.projects.updateProject.useMutation()

  const [from, setFrom] = useState<Date>(_from)
  const [to, setTo] = useState<Date | null | undefined>(_to)

  const { schema } = useProjectUpdateFormSchema()
  const form = useForm<ProjectUpdateFormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  })

  const handleFromDateChange = (date: Date) => {
    setFrom(date)
    form.setValue("from", date)
  }

  const handleToDateChange = (date: Date) => {
    setTo(date)
    form.setValue("to", date)
  }

  async function onSubmit(formValues: ProjectUpdateFormValues) {
    const { name, from, to } = formValues

    if (!name || !from) return

    try {
      await updateMutation.mutateAsync({ projectId, updateData: { name, from, to } })
      toasts.success("Project info updated")
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
        label={"Project title"}
        css={{ boxShadow: "none" }}
        error={form.formState.errors.name?.message}
        children={<input type="text" placeholder={projectName} defaultValue={projectName} {...form.register("name")} />}
      />

      <Spacer size={theme.spaces.s4} />

      <DatePicker
        label={"From"}
        selected={from}
        onChange={handleFromDateChange}
        minDate={today}
        error={form.formState.errors.from?.message}
        formRegisterProps={form.register("from")}
      />

      <Spacer size={theme.spaces.s4} />

      <DatePicker
        label={"To (optional)"}
        selected={to}
        onChange={handleToDateChange}
        minDate={from ?? today}
        formRegisterProps={form.register("to")}
      />

      <Spacer size={theme.spaces.s8} />

      <Flex direction={"row"} justify={"center"} align={"center"}>
        <Button isSubmitting={form.formState.isSubmitting} variant="secondary">
          Change
        </Button>
      </Flex>
    </SForm>
  )
}
