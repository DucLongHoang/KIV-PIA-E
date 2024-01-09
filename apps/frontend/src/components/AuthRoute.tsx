import { PropsWithChildren } from "react";
import { trpc } from "../utils/trpc";
import { useLocation, useNavigate } from "react-router-dom";

export const AuthRoute = ({ children, ...rest }: PropsWithChildren) => {
    const navigate = useNavigate()
    const location = useLocation()

    return <>{children}</>
}