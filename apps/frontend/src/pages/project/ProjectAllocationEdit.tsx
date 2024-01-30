import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Flex } from "../../components/Flex"
import { Spacer } from "../../components/Spacer"
import { FormInput } from "../../components/form/FormInput"
import { SForm } from "../../components/form/FormInput.styled"
import { toasts } from "../../components/toast/toasts"
import { theme } from "../../styles/stitches.config"
import { AllocationUpdateFormValues, useAllocationUpdateFormSchema } from "../../utils/formSchemas"
import { trpc } from "../../utils/trpc"
import { Button } from "../../components/button/Button"
import { DatePicker } from "../../components/datepicker/DatePicker"
import Text from "../../components/Text"
import { Dropdown } from "../../components/dropdown/Dropdown"
import { useState } from "react"
import { Loading } from "../Loading"
import { Allocation, AllocationState, User } from "src/types"

export interface Props {
  projectId: number
  projectName: string
  worker: User
  allocation: Allocation
}

export const ProjectionAllocationEdit = ({ projectId, projectName, worker, allocation }: Props) => {
  const allocationQuery = trpc.allocations.getAllocationScopeSumByUserId.useQuery({ userId: worker.id })

  const { data: allocationScopeSum, isLoading } = allocationQuery

  const updateMutation = trpc.allocations.updateAllocation.useMutation()
  const { description, from, to, scope, state } = allocation

  const [selectedState, setSelectedState] = useState<AllocationState>(state)
  const [selectedFrom, setSelectedFrom] = useState<Date>(from)
  const [selectedTo, setSelectedTo] = useState<Date | null>(to)

  const allocationStates = Object.values(AllocationState)

  const { schema } = useAllocationUpdateFormSchema()
  const form = useForm<AllocationUpdateFormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  })

  if (isLoading) {
    return <Loading />
  }

  const handleAllocationStateChange = (value: string) => {
    const state = value as AllocationState
    setSelectedState(state)
    form.setValue("allocationState", state)
  }

  const handleFromDateChange = (date: Date) => {
    setSelectedFrom(date)
    form.setValue("from", date)
  }

  const handleToDateChange = (date: Date) => {
    setSelectedTo(date)
    form.setValue("to", date)
  }

  async function onSubmit(formValues: AllocationUpdateFormValues) {
    const { description, scope, allocationState, from, to } = formValues

    try {
      await updateMutation.mutateAsync({
        workerId: worker.id,
        projectId: projectId,
        updateData: {
          description,
          scope: scope?.toString(),
          from,
          to,
          allocationState,
        },
      })
      toasts.success("Allocation info updated")
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    } catch (error) {
      toasts.error("Something went wrong")
    }
  }

  return (
    <SForm onSubmit={form.handleSubmit(onSubmit)}>
      <Flex direction={"column"} justify={"center"} align={"center"}>
        <Text type="headerH1">Edit allocation</Text>

        <Spacer size={theme.spaces.s4} />

        <Text type="headerH2Neutral">Project: {projectName}</Text>

        <Spacer size={theme.spaces.s4} />

        <Text type="headerH3Neutral">Worker: {worker.fullName}</Text>

        <Spacer size={theme.spaces.s4} />

        <Text type="headerH4">Current total allocation: {allocationScopeSum ?? 0}</Text>
      </Flex>

      <Spacer size={theme.spaces.s8} />

      <FormInput
        label={"Description"}
        css={{ boxShadow: "none" }}
        error={form.formState.errors.description?.message}
        children={
          <input
            type="text"
            placeholder={description ?? undefined}
            defaultValue={description ?? undefined}
            {...form.register("description")}
          />
        }
      />

      <Spacer size={theme.spaces.s4} />

      <FormInput
        label={"Scope"}
        css={{ boxShadow: "none" }}
        error={form.formState.errors.scope?.message}
        children={
          <input
            type="number"
            step={0.1}
            min={0}
            max={1 - (allocationScopeSum ?? 0) + scope}
            placeholder={scope.toString()}
            defaultValue={scope.toString()}
            {...form.register("scope")}
          />
        }
      />

      <Spacer size={theme.spaces.s4} />

      <Dropdown
        options={allocationStates}
        label={"Allocation state"}
        selectedOption={selectedState}
        setSelectedOption={handleAllocationStateChange}
        formRegisterProps={form.register("allocationState")}
      />

      <Spacer size={theme.spaces.s4} />

      <DatePicker
        label={"From"}
        selected={selectedFrom}
        onChange={handleFromDateChange}
        error={form.formState.errors.from?.message}
        formRegisterProps={form.register("from")}
      />

      <Spacer size={theme.spaces.s4} />

      <DatePicker
        label={"To"}
        selected={selectedTo}
        onChange={handleToDateChange}
        minDate={from}
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
